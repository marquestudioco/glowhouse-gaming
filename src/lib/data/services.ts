export type ServiceId =
  | 'gaming-lounge'
  | 'vr-rental'
  | 'outdoor-movies'
  | 'party-van'
  | 'silent-disco'
  | 'after-school';

export interface ServicePhoto {
  src: string;
  alt: string;
}

export interface Service {
  id: ServiceId;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  accentColor: string;
  heroImage: string;
  maxGuests: number;
  duration: string;
  indoor: boolean;
  mobileService: boolean;
  priceFrom?: string;
  gallery?: ServicePhoto[];
  youtubeId?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'gaming-lounge',
    name: 'Premium Gaming Lounge',
    tagline: 'The main event.',
    description:
      'Glow-in-the-dark gaming lounge with 4+ screens, multiple consoles, and a live competition stage. A dedicated gaming specialist hosts your entire event — just show up and glow.',
    highlights: ['4+ screens', 'PS5 & Xbox', 'VR headsets', 'Gaming host included', 'LED party lighting', 'Up to 20 guests'],
    accentColor: 'var(--neon-cyan)',
    heroImage: '/gallery/gaming-controller.png',
    maxGuests: 20,
    duration: '2 hours',
    indoor: true,
    mobileService: false,
    priceFrom: '$400',
    gallery: [
      { src: '/gallery/gaming-controller.png', alt: 'Neon gaming lounge — pure controller energy' },
      { src: '/lounge/photo-1.jpg',            alt: 'Glowhouse Gaming team with LED headphones at a party' },
      { src: '/lounge/photo-2.jpg',            alt: 'Full room of guests gaming in the neon-lit Glowhouse lounge' },
      { src: '/gallery/photo-11.jpg',          alt: 'Guests celebrating at a Glowhouse Gaming party' },
      { src: '/lounge/photo-4.jpg',            alt: 'Glowhouse host on the decks — purple neon gaming lounge' },
      { src: '/gallery/photo-18.jpg',          alt: 'Gaming host on mic with LED headphones in neon-lit lounge' },
      { src: '/lounge/photo-6.jpg',            alt: 'Fun group gaming session at Glowhouse' },
      { src: '/lounge/photo-7.jpg',            alt: 'Lounge birthday party with colorful lights' },
    ],
  },
  {
    id: 'vr-rental',
    name: 'Console & VR Rental',
    tagline: 'We bring the fun to you.',
    description:
      'We deliver PS5, Nintendo Switch, and Oculus VR headsets to your home or event space — setup included, pickup handled. Rent one system or a full multi-screen setup.',
    highlights: ['PS5 & Xbox', 'Nintendo Switch', 'Oculus VR headsets', 'Delivery & setup', 'Pickup included', 'Full game library'],
    accentColor: 'var(--neon-cyan)',
    heroImage: '/gallery/photo-19.jpg',
    maxGuests: 12,
    duration: 'Flexible',
    indoor: true,
    mobileService: true,
    priceFrom: '$25/day',
    youtubeId: 'M3LhMBqgcsM',
    gallery: [
      { src: '/vr/vr-hero.png',        alt: 'Fully immersed in VR — neon lights, total escape' },
      { src: '/gallery/photo-19.jpg',  alt: 'Guest using VR headset at a Glowhouse Gaming event' },
      { src: '/gallery/photo-20.jpg',  alt: 'Multiple guests experiencing VR headsets simultaneously' },
    ],
  },
  {
    id: 'outdoor-movies',
    name: 'Outdoor Movie Nights',
    tagline: 'Under the stars.',
    description:
      '4K projector, 120" or 200" inflatable screen, and premium wireless speakers delivered to your backyard, school, or community space. Add gaming, inflatable seating, and a popcorn machine.',
    highlights: ['4K projector', '120" or 200" screen', 'Premium speakers', 'Inflatable seating', 'Popcorn machine add-on', 'Gaming add-on'],
    accentColor: 'var(--neon-magenta)',
    heroImage: '/gallery/photo-24.jpg',
    maxGuests: 50,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
    priceFrom: '$250',
    youtubeId: 'H8n4DJb82Cg',
    gallery: [
      { src: '/gallery/photo-24.jpg', alt: 'Outdoor event setup with DJ tent, screen, and seating' },
      { src: '/gallery/photo-27.jpg', alt: 'Outdoor backyard movie and gaming night with inflatable seating' },
      { src: '/gallery/photo-28.jpg', alt: 'Outdoor backyard party setup with multiple screens and bean bags' },
      { src: '/lounge/photo-9.jpg',   alt: 'Outdoor backyard entertainment setup with screens and bean bag seating' },
    ],
  },
  {
    id: 'party-van',
    name: 'Party Van',
    tagline: 'The party parks at your door.',
    description:
      'A fully-loaded mobile entertainment van drives right to you. Multiple screens, gaming consoles, and an LED light show built in. Add a live DJ and turn any driveway into a venue.',
    highlights: ['Mobile venue', '2–4 screens', 'PS5 & Xbox', 'LED light show', 'Live DJ add-on', 'Within 10 miles'],
    accentColor: 'var(--neon-violet)',
    heroImage: '/van/promo-sunset.png',
    maxGuests: 10,
    duration: '2–4 hours',
    indoor: true,
    mobileService: true,
    priceFrom: '$100',
    gallery: [
      { src: '/van/promo-sunset.png',  alt: 'Glowhouse Gaming party van at a sunset birthday event in the park' },
      { src: '/van/promo-day.png',     alt: 'Glowhouse Gaming party van parked and ready with bean bag gaming setup' },
      { src: '/gallery/photo-25.jpg',  alt: 'The real Glowhouse Gaming party van lit up at an outdoor night event' },
      { src: '/gallery/photo-16.jpg',  alt: 'Glowhouse Gaming host on mic energizing the crowd' },
    ],
  },
  {
    id: 'silent-disco',
    name: 'Silent Disco',
    tagline: 'Dance to your own beat.',
    description:
      'Wireless LED headphones with 3 music channels, 12-hour battery life, and a 1,500ft signal range. 25 to 299+ headsets available — everyone dances, nobody disturbs the neighbors.',
    highlights: ['25–299+ headsets', '3 audio channels', 'LED glow headphones', '12-hr battery', '1,500ft range', 'Sanitized & fully charged'],
    accentColor: 'var(--neon-magenta)',
    heroImage: '/gallery/photo-12.jpg',
    maxGuests: 299,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
    priceFrom: 'Custom quote',
    gallery: [
      { src: '/gallery/gaming-headphones.png', alt: 'Feel every beat — neon headphones, pure energy' },
      { src: '/silent-disco/photo-3.jpg',      alt: 'Girl wearing Glow Squad silent disco headphones outdoors' },
      { src: '/gallery/photo-13.jpg',          alt: 'Party guests in LED headphones at a silent disco event' },
      { src: '/gallery/photo-12.jpg',          alt: 'Glow Squad LED headphones glowing red and blue in the dark' },
      { src: '/silent-disco/photo-1.jpg',      alt: 'Two guests at the silent disco DJ setup' },
      { src: '/gallery/photo-15.jpg',          alt: 'Professional DJ mixer with purple neon lighting' },
      { src: '/silent-disco/photo-4.jpg',      alt: 'Everyone dancing at a Glowhouse silent disco' },
      { src: '/silent-disco/photo-5.jpg',      alt: 'Silent disco birthday party with LED headphones' },
      { src: '/silent-disco/photo-6.jpg',      alt: 'Group enjoying the silent disco experience' },
    ],
  },
  {
    id: 'after-school',
    name: 'After School Club',
    tagline: 'The best part of their day.',
    description:
      'Mon–Fri, 3pm–7pm. Homework must be completed before gaming — then they play. School pickup available. Daily snacks provided, plus pizza every Friday. Monthly membership.',
    highlights: ['Mon–Fri, 3–7pm', 'School pickup', 'Homework first', 'Daily snacks', 'Friday pizza', 'All skill levels'],
    accentColor: 'var(--neon-violet)',
    heroImage: '/gallery/photo-10.jpg',
    maxGuests: 20,
    duration: '4 hrs/day',
    indoor: true,
    mobileService: false,
    priceFrom: 'Monthly tuition',
    gallery: [
      { src: '/gallery/photo-14.jpg', alt: 'Glowhouse Gaming lounge setup — the space your kids will love' },
      { src: '/lounge/photo-4.jpg',   alt: 'Glowhouse Gaming host running the session — neon lounge vibes' },
      { src: '/gallery/photo-10.jpg', alt: 'Glowhouse Gaming team with LED headphones, ready to host' },
      { src: '/gallery/photo-26.jpg', alt: 'Multi-screen gaming setup for after-school play sessions' },
    ],
  },
];

export const SERVICE_AREA_CITIES = [
  'Santa Clarita', 'Valencia', 'Newhall', 'Stevenson Ranch', 'Canyon Country', 'Saugus', 'Castaic',
];
