import React, { useState } from "react";
import { Calendar, Info, MapPin, Phone } from "lucide-react";
import { toast } from "../store/toastStore";

export const ContactPage: React.FC = () => {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // FAQ Accordion states
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) {
      toast.error("Please provide your name, contact email, and booking parameters.");
      return;
    }

    setIsBooking(true);
    toast.info("Calibrating dome capacity...");

    setTimeout(() => {
      setIsBooking(false);
      toast.success(`Hearth seat reserved. We look forward to hosting you on ${date} at ${time}.`);
      // Reset form
      setName("");
      setEmail("");
      setGuests("2");
      setDate("");
      setTime("");
      setNote("");
    }, 2000);
  };

  const faqData = [
    {
      q: "Do you accommodate gluten-free or vegan diets?",
      a: "Yes. We offer an organic charcoal-infused gluten-free sourdough crust option for our pizzas. We also stock fresh vegan cashew cheese flown in weekly from specialized artisanal curd makers."
    },
    {
      q: "Can I host private editorial events or photoshoots?",
      a: "Absolutely. Our SoHo sanctuary operates at a premium design standard, built for brand launches, creative photoshoots, and elite private kitchen takeovers. Connect with us via director@moonlight.cafe."
    },
    {
      q: "Do you accept walk-in dining?",
      a: "We allocate exactly 50% of our daily wood-fired clay slots to walk-ins. However, since our prolonged dough fermentation caps us at 150 crusts daily, we highly recommend reserving ahead."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-20">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mt-6">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
          Establish Contact
        </span>
        <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-offwhite">
          Secure Your Seat
        </h1>
        <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans max-w-md">
          Request a dome table slot, book private kitchen showcases, or contact our creative directors.
        </p>
      </div>

      {/* Main Grid: Form + Address Coordinates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form Inquiry */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          <form onSubmit={handleBookingSubmit} className="glass-panel p-8 rounded-2xl border border-glass-border flex flex-col gap-6 shadow-xl bg-brand-charcoal/30">
            <div className="flex items-center gap-3 border-b border-glass-border pb-4">
              <Calendar className="w-5 h-5 text-brand-orange" />
              <h2 className="text-base font-bold uppercase tracking-widest text-offwhite font-display">
                Table Reservation Booking
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alessia Thorne"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="director@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full glass-input px-3 py-3 rounded-xl text-sm font-light cursor-pointer appearance-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="8">8+ Guests</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full glass-input px-3 py-3 rounded-xl text-sm font-light cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Select Time
                </label>
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full glass-input px-3 py-3 rounded-xl text-sm font-light cursor-pointer appearance-none"
                >
                  <option value="">Choose...</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                Special Requests or Dietary Coordinates
              </label>
              <textarea
                rows={3}
                placeholder="E.g., Requesting a table close to the volcanic oak wood fire, gluten-free crust inquiries, etc."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isBooking}
              className={`w-full py-4 rounded-full font-display text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-xl shadow-brand-beige/5 cursor-pointer flex items-center justify-center gap-2 ${
                isBooking
                  ? "bg-brand-beige/50 text-brand-matte cursor-not-allowed scale-[0.98]"
                  : "bg-brand-beige hover:bg-brand-beige-hover text-brand-matte hover:scale-[1.02]"
              }`}
            >
              {isBooking ? "Securing Table capacity..." : "Submit Hearth Request"}
            </button>

          </form>

        </div>

        {/* Right Column: Address Details & Map Visuals */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
          
          {/* Coordinates Details */}
          <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-5 bg-brand-charcoal/30">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display border-b border-glass-border pb-3">
              Cafe Coordinates
            </h3>

            <ul className="flex flex-col gap-4 text-xs font-light text-gray-subtle leading-relaxed">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-offwhite block mb-0.5">Physical Sanctuary:</span>
                  84 Neon Boulevard, SoHo, New York, NY 10012
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-offwhite block mb-0.5">Telephone Dispatch:</span>
                  +1 (212) 555-0199
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-offwhite block mb-0.5">Dispatch Channels:</span>
                  Table & general: table@moonlight.cafe <br />
                  Creative & events: press@moonlight.cafe
                </div>
              </li>
            </ul>
          </div>

          {/* Styled Abstract SoHo Map visual */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-glass-border shadow-2xl bg-brand-matte flex items-center justify-center p-6 group">
            {/* Matte map abstract grid lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-radial-gradient(circle, transparent 30%, #050505 100%)">
              {/* Fake grid map */}
              <div className="w-full h-full border-t border-b border-l border-r border-white/40 flex flex-wrap">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-1/6 h-1/4 border-r border-b border-white/20" />
                ))}
              </div>
            </div>

            {/* Pulsing Moonlight logo coordinates */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/15 border border-brand-orange/40 flex items-center justify-center animate-glow relative shadow-[0_0_30px_rgba(122,28,36,0.3)]">
                <span className="text-sm select-none">🌙</span>
                <span className="absolute -inset-2 rounded-full border border-dashed border-brand-orange/20 animate-spin-slow" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-beige font-display select-none">
                MOONLIGHT SOHO DOME
              </span>
            </div>
            
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg glass-panel border border-glass-border text-[9px] uppercase tracking-wider text-gray-subtle select-none">
              40.7241° N, 74.0018° W
            </div>
          </div>

        </div>

      </div>

      {/* Accordion FAQ section */}
      <section className="flex flex-col gap-8 border-t border-glass-border pt-16 mt-6">
        <div className="flex flex-col gap-2 max-w-md">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            Aesthetic FAQs
          </span>
          <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-offwhite">
            Table coordination guides
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-3xl">
          {faqData.map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-xl border border-glass-border overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setFaqOpen(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-sm font-bold font-display uppercase tracking-widest text-offwhite hover:text-brand-orange transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-brand-orange font-bold text-md leading-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-glass-border/30 text-xs font-light text-gray-subtle leading-relaxed font-sans animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
