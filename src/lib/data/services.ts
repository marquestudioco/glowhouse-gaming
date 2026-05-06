export type ServiceId =
  | 'gaming-lounge'
  | 'vr-rental'
  | 'outdoor-movies'
  | 'party-van'
  | 'silent-disco'
  | 'after-school';

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
}

export const SERVICES: Service[] = [
  {
    id: 'gaming-lounge',
    name: 'Premium Gaming Lounge',
    tagline: 'The main event.',
    description: 'Glow-in-the-dark gaming lounge with 4+ screens, multiple consoles, and a competition stage. The ultimate birthday party venue.',
    highlights: ['4+ screens', 'PS5 & Switch', 'VR headsets', 'Competition stage', 'LED party lighting', 'Up to 12 players'],
    accentColor: 'var(--neon-cyan)',
    heroImage: '/hero/scene-1.webp',
    maxGuests: 20,
    duration: '2 hours',
    indoor: true,
    mobileService: false,
  },
  {
    id: 'vr-rental',
    name: 'Console & VR Rental',
    tagline: 'We bring the fun to you.',
    description: 'We deliver PS5, Nintendo Switch, and VR headsets to your home or event space. Set up included — just play.',
    highlights: ['PS5', 'Nintendo Switch', 'VR headsets', 'Delivery & setup', 'Pickup included', 'All games provided'],
    accentColor: 'var(--neon-cyan)',
    heroImage: '/hero/scene-2.webp',
    maxGuests: 12,
    duration: 'Flexible',
    indoor: true,
    mobileService: true,
  },
  {
    id: 'outdoor-movies',
    name: 'Outdoor Movie Nights',
    tagline: 'Under the stars.',
    description: '12-foot projection screen, HD projector, and wireless speakers delivered to your backyard or event space.',
    highlights: ['12ft HD screen', 'HD projector', 'Wireless speakers', 'Movie library', 'Popcorn setup', 'Night sky vibes'],
    accentColor: 'var(--neon-magenta)',
    heroImage: '/hero/scene-3.webp',
    maxGuests: 50,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
  },
  {
    id: 'party-van',
    name: 'Party Van',
    tagline: 'The party parks at your door.',
    description: 'A fully-loaded mobile entertainment van that drives to you. Screens, consoles, lighting — all inside.',
    highlights: ['Mobile venue', 'Multiple screens', 'Console gaming', 'LED lighting', 'Comes to you', 'Rain or shine'],
    accentColor: 'var(--neon-violet)',
    heroImage: '/hero/scene-4.webp',
    maxGuests: 10,
    duration: '2–4 hours',
    indoor: true,
    mobileService: true,
  },
  {
    id: 'silent-disco',
    name: 'Silent Disco',
    tagline: 'Dance to your own beat.',
    description: 'Wireless headphones, 3 music channels, LED wristbands. Everyone dances, nobody disturbs the neighbors.',
    highlights: ['Wireless headphones', '3 music channels', 'LED wristbands', 'All genres', 'No noise ordinance issues', 'Up to 50 guests'],
    accentColor: 'var(--neon-magenta)',
    heroImage: '/hero/scene-5.webp',
    maxGuests: 50,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
  },
  {
    id: 'after-school',
    name: 'After School Club',
    tagline: 'The best part of their day.',
    description: 'Structured after-school gaming program. Safe, supervised, and seriously fun — Mon through Fri.',
    highlights: ['Mon–Fri program', 'Safe & supervised', 'Structured play', 'All skill levels', 'Homework time included', 'Monthly membership'],
    accentColor: 'var(--neon-violet)',
    heroImage: '/hero/scene-6.webp',
    maxGuests: 20,
    duration: 'Afternoons',
    indoor: true,
    mobileService: false,
  },
];

export const SERVICE_AREA_CITIES = [
  'Santa Clarita', 'Valencia', 'Newhall', 'Stevenson Ranch', 'Canyon Country', 'Saugus', 'Castaic',
];
