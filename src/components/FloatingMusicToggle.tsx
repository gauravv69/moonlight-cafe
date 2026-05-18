import React, { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export const FloatingMusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);
  const chordTimerRef = useRef<number | null>(null);
  const currentChordIndexRef = useRef(0);

  // Soft lush chord definitions (Hz frequencies)
  // Chord 0: Dmin9 (D3, F3, A3, C4, E4)
  // Chord 1: G9sus4 (G2, F3, C4, D4, A4)
  // Chord 2: Cmaj9 (C3, E3, G3, B3, D4)
  // Chord 3: Amin9 (A2, G3, C4, E4, B4)
  const chords = [
    [146.83, 174.61, 220.00, 261.63, 329.63], // Dmin9
    [98.00, 174.61, 261.63, 293.66, 440.00],  // G9sus4
    [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
    [110.00, 196.00, 261.63, 329.63, 493.88], // Amin9
  ];

  const stopSynthesizer = () => {
    if (chordTimerRef.current) {
      clearInterval(chordTimerRef.current);
      chordTimerRef.current = null;
    }
    
    // Smoothly fade out the master volume
    if (gainNodeRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.linearRampToValueAtTime(gainNodeRef.current.gain.value, now);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 1.2);
    }

    // Stop and clear oscillators after fade-out
    setTimeout(() => {
      activeOscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });
      activeOscillatorsRef.current = [];
    }, 1500);
  };

  const playChord = (frequencies: number[]) => {
    if (!audioCtxRef.current || !filterNodeRef.current || !gainNodeRef.current) return;

    const ctx = audioCtxRef.current;
    const filter = filterNodeRef.current;
    
    const now = ctx.currentTime;
    const fadeTime = 2.0; // Slow, luxurious swell
    const duration = 7.0; // Chord holds for 7 seconds

    // Stop previous oscillators with a quick fade
    const oldOscillators = [...activeOscillatorsRef.current];
    activeOscillatorsRef.current = [];

    // Fade out previous oscillators
    // We hook gain nodes to previous oscs to fade them
    // For simplicity, we just stop them since they have their own envelope, or we let them ring out
    oldOscillators.forEach((osc) => {
      try {
        osc.stop(now + 0.5);
      } catch (e) {}
    });

    // Modulate low-pass filter frequency for an analog "filter sweep" effect
    filter.frequency.cancelScheduledValues(now);
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.exponentialRampToValueAtTime(580, now + fadeTime);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration - 0.5);

    // Create new oscillators for the new chord notes
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      // Use Triangle for a warm flute-like base, Sine for pure sub, Saw for warmth
      osc.type = idx === 0 ? "sine" : "triangle"; 
      osc.frequency.setValueAtTime(freq, now);

      // Add slight detune for a luxurious chorus/analog vibe
      osc.detune.setValueAtTime(idx * 2 - 4, now);

      // Node Envelope
      oscGain.gain.setValueAtTime(0, now);
      // Deeper bass note, softer higher notes
      const targetVolume = idx === 0 ? 0.08 : 0.04;
      oscGain.gain.linearRampToValueAtTime(targetVolume, now + fadeTime);
      oscGain.gain.setValueAtTime(targetVolume, now + duration - 1.5);
      oscGain.gain.linearRampToValueAtTime(0, now + duration);

      osc.connect(oscGain);
      oscGain.connect(filter);
      
      osc.start(now);
      osc.stop(now + duration);
      activeOscillatorsRef.current.push(osc);
    });
  };

  const startSynthesizer = () => {
    // Initialize Web Audio
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    const ctx = audioCtxRef.current;
    
    // Resume context if suspended (browser security)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Set up master nodes
    if (!filterNodeRef.current) {
      filterNodeRef.current = ctx.createBiquadFilter();
      filterNodeRef.current.type = "lowpass";
      filterNodeRef.current.Q.setValueAtTime(2.0, ctx.currentTime);
    }

    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
      
      // Connect: Filter -> Gain -> Destination
      filterNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(ctx.destination);
    }

    const now = ctx.currentTime;
    gainNodeRef.current.gain.cancelScheduledValues(now);
    // Smoothly fade in master volume
    gainNodeRef.current.gain.linearRampToValueAtTime(0, now);
    gainNodeRef.current.gain.linearRampToValueAtTime(0.7, now + 1.5); // Very soft master volume

    // Play first chord immediately
    currentChordIndexRef.current = 0;
    playChord(chords[currentChordIndexRef.current]);

    // Set up loop for chord progression
    chordTimerRef.current = setInterval(() => {
      if (ctx.state === "suspended") ctx.resume();
      
      currentChordIndexRef.current = (currentChordIndexRef.current + 1) % chords.length;
      playChord(chords[currentChordIndexRef.current]);
    }, 6500) as unknown as number;
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopSynthesizer();
      setIsPlaying(false);
    } else {
      startSynthesizer();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (chordTimerRef.current) {
        clearInterval(chordTimerRef.current);
      }
      activeOscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 p-4 rounded-full glass-panel flex items-center justify-center gap-3 border shadow-2xl hover:scale-105 transition-all duration-300 group ${
        isPlaying ? "border-brand-orange/60 text-brand-orange shadow-[0_0_20px_rgba(232,92,44,0.25)]" : "border-glass-border text-gray-subtle hover:text-offwhite hover:border-offwhite/20"
      }`}
      aria-label="Toggle ambient soundtrack"
      title="Cinematic Lounge Soundtrack"
    >
      <div className="flex items-center gap-1.5">
        {/* Equalizer animation */}
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3.5 w-3.5 mr-1">
            <span className="w-[2px] bg-brand-orange animate-[pulse_1s_infinite_alternate]" style={{ height: '100%', animationDelay: '0.1s' }} />
            <span className="w-[2px] bg-brand-orange animate-[pulse_0.8s_infinite_alternate]" style={{ height: '60%', animationDelay: '0.4s' }} />
            <span className="w-[2px] bg-brand-orange animate-[pulse_1.2s_infinite_alternate]" style={{ height: '80%', animationDelay: '0.2s' }} />
            <span className="w-[2px] bg-brand-orange animate-[pulse_0.9s_infinite_alternate]" style={{ height: '40%', animationDelay: '0.5s' }} />
          </div>
        ) : (
          <Music className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300" />
        )}
        <span className="text-xs font-semibold tracking-wider uppercase font-display select-none hidden sm:inline">
          {isPlaying ? "Lounge Active" : "Ambient Lounge"}
        </span>
      </div>
      
      <div className="border-l border-white/10 pl-2">
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-brand-orange" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </div>
    </button>
  );
};
