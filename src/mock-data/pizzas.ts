export interface Pizza {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  spicyLevel: number; // 0 to 3
  isVeg: boolean;
  calories: number;
  preparationTime: string;
  story: string;
}

export const CATEGORIES = [
  "All Pizzas",
  "Signature Neapolitan",
  "Artisanal White (Bianca)",
  "Sweet & Flame",
  "Sides & Plates",
  "Beverages"
];

export const PIZZAS: Pizza[] = [
  {
    id: "cosmic-margherita",
    name: "Cosmic Margherita",
    tagline: "The blueprint of Neapolitan wood-fired mastery.",
    description: "San Marzano D.O.P. tomatoes, fresh fior di latte, hand-torn sweet basil, cold-pressed olive oil, volcanic sea salt.",
    price: 18.00,
    category: "Signature Neapolitan",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1200&auto=format&fit=crop",
    tags: ["Classic", "Best Seller", "Wood-Fired Heritage"],
    spicyLevel: 0,
    isVeg: true,
    calories: 820,
    preparationTime: "8 Mins",
    story: "Our dough is proofed for 48 hours in oak chests before meeting the 900°F volcanic clay oven. It's charred to leopard-spotted perfection in exactly 60 seconds."
  },
  {
    id: "truffle-eclipse",
    name: "Truffle Eclipse",
    tagline: "Earth, smoke, and pure liquid gold.",
    description: "Urbani black truffle cream, wild forest cremini mushrooms, fresh mozzarella, caramelized shallots, white truffle oil mist.",
    price: 24.00,
    category: "Signature Neapolitan",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=1200&auto=format&fit=crop",
    tags: ["Luxury Selection", "Trending", "Chef's Choice"],
    spicyLevel: 0,
    isVeg: true,
    calories: 980,
    preparationTime: "10 Mins",
    story: "A celebration of modern luxury dining. We combine earthy Umbrian truffles with dynamic charcoal wood smoke to create a decadent flavor landscape."
  },
  {
    id: "hot-honey-hellfire",
    name: "Hot Honey Hellfire",
    tagline: "Sweet heat, intense char, and absolute bliss.",
    description: "Spicy Calabrian salami, pepperoni, fresh fior di latte, hot chili honey infusion, fresh oregano, burrata crown.",
    price: 22.00,
    category: "Signature Neapolitan",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop",
    tags: ["Spicy", "Crowd Favorite", "Gen Z Hype"],
    spicyLevel: 2,
    isVeg: false,
    calories: 1040,
    preparationTime: "9 Mins",
    story: "Our tribute to the dynamic street food scene of Naples. The Calabrian chili paste sparks on the tongue, followed by the creamy, cooling luxury of premium burrata cheese."
  },
  {
    id: "fig-prosciutto-editorial",
    name: "Fig & Prosciutto Editorial",
    tagline: "An editorial statement of sweet and salty.",
    description: "Fresh black mission figs, Prosciutto di Parma, gorgonzola dolcina, wild baby arugula, aged Modenese balsamic glaze.",
    price: 23.00,
    category: "Signature Neapolitan",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    tags: ["Editorial Favorite", "Sweet & Salty", "Insta Worthy"],
    spicyLevel: 0,
    isVeg: false,
    calories: 910,
    preparationTime: "10 Mins",
    story: "Designed like a high-fashion cover story. This pizza brings together the sharp funk of Gorgonzola, sweet jammy figs, and dry-cured prosciutto in a delicate aesthetic layout."
  },
  {
    id: "pistachio-dreamscape",
    name: "Pistachio Dreamscape",
    tagline: "A masterclass in modern creamy nuttiness.",
    description: "Sicilian pistachio pesto base, fior di latte, mortadella slices, fresh burrata crown, organic lemon zest, crushed pistachios.",
    price: 25.00,
    category: "Artisanal White (Bianca)",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
    tags: ["White Base", "Luxury Selection", "Award Winner"],
    spicyLevel: 0,
    isVeg: false,
    calories: 1120,
    preparationTime: "11 Mins",
    story: "Awarded 'Most Artistic Pizza' by Rome's modern culinary guild. It uses no tomato sauce, relying instead on a rich pesto crafted from volcanic Bronte pistachios."
  },
  {
    id: "garlic-greens",
    name: "Garlic & Greens",
    tagline: "Plant-forward, minimal, and immensely satisfying.",
    description: "Roasted garlic purée, baby spinach, charred broccolini, lemon-whipped ricotta, toasted pine nuts, organic chili flakes.",
    price: 19.00,
    category: "Artisanal White (Bianca)",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1200&auto=format&fit=crop",
    tags: ["Vegan Option", "Healthy Living", "White Base"],
    spicyLevel: 1,
    isVeg: true,
    calories: 780,
    preparationTime: "8 Mins",
    story: "Simple, green, and vibrant. Designed to show that farm-to-table ingredients can dominate in an ultra-minimal wood-fired structure."
  },
  {
    id: "spicy-peach-goat",
    name: "Spicy Peach & Goat Cheese",
    tagline: "Summer embers and sweet farm honey.",
    description: "Sweet caramelized peaches, organic goat cheese, fresh thyme, hot honey, prosciutto di Parma, shredded mozzarella.",
    price: 21.00,
    category: "Sweet & Flame",
    image: "https://images.unsplash.com/photo-1571066811602-71683a3f680d?q=80&w=1200&auto=format&fit=crop",
    tags: ["Summer Limited", "Sweet & Spicy"],
    spicyLevel: 1,
    isVeg: false,
    calories: 890,
    preparationTime: "9 Mins",
    story: "Inspired by late summer night beach parties. The stone-fruit sweetness of peaches is caramelized under live flames, creating sugar ripples that contrast beautifully with tangy goat cheese."
  },
  {
    id: "nutella-volcano",
    name: "Nutella Volcano",
    tagline: "A lava flows of liquid dark hazelnut cacao.",
    description: "Folded wood-fired Neapolitan dough stuffed with creamy Nutella, fresh strawberries, organic powdered sugar, toasted hazelnut dust.",
    price: 16.00,
    category: "Sweet & Flame",
    image: "https://images.unsplash.com/photo-1613564834644-a170d95366a1?q=80&w=1200&auto=format&fit=crop",
    tags: ["Dessert Pizza", "Gluten Heaven", "Insta Worthy"],
    spicyLevel: 0,
    isVeg: true,
    calories: 1200,
    preparationTime: "7 Mins",
    story: "A delightful collision of Neapolitan dough physics and premium chocolate. Baked until the crust blisters while the Nutella inside melts into a hot volcanic river."
  },
  {
    id: "truffle-parm-fries",
    name: "Wood-Fired Truffle Parm Fries",
    tagline: "Crisp, smoky, and absolutely layered.",
    description: "Double-cooked thick cut fries tossed in Umbrian white truffle oil, freshly grated aged Parmigiano Reggiano, and chopped rosemary.",
    price: 12.00,
    category: "Sides & Plates",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Aesthetic Side", "Crunchy"],
    spicyLevel: 0,
    isVeg: true,
    calories: 450,
    preparationTime: "5 Mins",
    story: "Our fries spend their final moments in the wood oven, absorbing the rich oak wood smoke before being dusted in hand-grated Parmigiano."
  },
  {
    id: "burrata-heirloom",
    name: "Burrata & Heirloom Plate",
    tagline: "Vibrant hues, absolute creaminess.",
    description: "Fresh Italian burrata cheese, rainbow heirloom tomatoes, basil pesto, pine nuts, and vintage aged balsamic drizzle.",
    price: 14.00,
    category: "Sides & Plates",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=1200&auto=format&fit=crop",
    tags: ["Fresh", "Keto Friendly"],
    spicyLevel: 0,
    isVeg: true,
    calories: 380,
    preparationTime: "4 Mins",
    story: "Clean, fresh, and minimal. We let the supreme quality of local hand-stretched burrata tell its own story on the plate."
  },
  {
    id: "smoked-orange-espresso",
    name: "Smoked Orange Espresso Tonic",
    tagline: "A cinematic caffeine elixir.",
    description: "Double shot of single-origin Ethiopian espresso, tonic water, smoked blood orange syrup, served over crystal ice blocks.",
    price: 8.50,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=1200&auto=format&fit=crop",
    tags: ["Signature Brew", "Trending"],
    spicyLevel: 0,
    isVeg: true,
    calories: 90,
    preparationTime: "3 Mins",
    story: "Our best-selling daytime beverage. We lightly smoke our blood orange syrup using wood chips in the pizza oven, creating an unforgettable bitter-sweet caffeine harmony."
  },
  {
    id: "charcoal-lemonade",
    name: "Activated Charcoal Lemonade",
    tagline: "Matte black elixir for the senses.",
    description: "Organic lemon juice, active coconut charcoal, organic agave, fresh mint sprigs, served black as the night.",
    price: 7.00,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1200&auto=format&fit=crop",
    tags: ["Matte Black", "Detox", "Insta Worthy"],
    spicyLevel: 0,
    isVeg: true,
    calories: 60,
    preparationTime: "2 Mins",
    story: "Visually striking and deeply refreshing. Designed to visually match our matte black cafe design while providing a clean, detoxifying citrus kick."
  }
];

export const REVIEWS = [
  {
    id: "1",
    name: "Alessia Thorne",
    role: "Vogue Creative Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    text: "Moonlight Cafe is a total sensory masterpiece. The matte black tables, the amber glows, and the leopard-spotted Truffle Eclipse pizza make it feel more like a Paris fashion event than a pizza spot.",
    date: "May 2026"
  },
  {
    id: "2",
    name: "Kaelen Zhang",
    role: "Culinary Tech Critic",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    text: "As a pizza traditionalist who loves modern minimalism, I was ready to be skeptical. But their 48-hour slow-fermented dough has the perfect structural integrity and a rich wood-fire char that is absolutely flawless.",
    date: "April 2026"
  },
  {
    id: "3",
    name: "Sasha Dupont",
    role: "Aesthetic Influencer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    text: "The activated charcoal lemonade served next to a piping hot honey hellfire pizza is literally the most photogenic dinner on the planet. I've posted it three times, and my DMs are absolutely blowing up.",
    date: "May 2026"
  }
];

export const INSTAGRAM_POSTS = [
  { id: "p1", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop" },
  { id: "p2", url: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop" },
  { id: "p3", url: "https://images.unsplash.com/photo-1589187151032-573a91317c76?q=80&w=600&auto=format&fit=crop" },
  { id: "p4", url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop" },
  { id: "p5", url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=600&auto=format&fit=crop" },
  { id: "p6", url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop" }
];
