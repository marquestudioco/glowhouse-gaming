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
  gallery?: ServicePhoto[];
  youtubeId?: string;
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
    gallery: [
      { src: '/lounge/photo-1.jpg',  alt: 'Glowhouse Gaming team with LED headphones at party' },
      { src: '/lounge/photo-2.jpg',  alt: 'Kids gaming in neon-lit lounge' },
      { src: '/lounge/photo-3.jpg',  alt: 'Birthday party setup inside the gaming lounge' },
      { src: '/lounge/photo-4.jpg',  alt: 'Guests enjoying the Glowhouse gaming lounge' },
      { src: '/lounge/photo-5.jpg',  alt: 'Console gaming party with neon lighting' },
      { src: '/lounge/photo-6.jpg',  alt: 'Fun group gaming session at Glowhouse' },
      { src: '/lounge/photo-7.jpg',  alt: 'Lounge birthday party with colorful lights' },
      { src: '/lounge/photo-8.jpg',  alt: 'Kids competing on gaming screens' },
      { src: '/lounge/photo-9.jpg',  alt: 'Neon gaming atmosphere at Glowhouse Gaming' },
      { src: '/lounge/photo-10.jpg', alt: 'Party guests having a blast at the lounge' },
    ],
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
    gallery: [
      { src: '/outdoor/photo-1.jpg', alt: 'Drive-In Movie Night event at Castaic Lake' },
      { src: '/outdoor/photo-2.jpg', alt: 'Outdoor movie screen setup under the night sky' },
      { src: '/outdoor/photo-3.jpg', alt: 'Families enjoying an outdoor movie night event' },
      { src: '/outdoor/photo-4.jpg', alt: 'Big screen projection at an outdoor event' },
      { src: '/outdoor/photo-5.jpg', alt: 'Glowhouse outdoor cinema experience' },
    ],
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
    gallery: [
      { src: '/silent-disco/photo-1.jpg', alt: 'Guests wearing silent disco LED headphones at party' },
      { src: '/silent-disco/photo-3.jpg', alt: 'Silent disco event with colorful headphone lights' },
      { src: '/silent-disco/photo-4.jpg', alt: 'Everyone dancing at a Glowhouse silent disco' },
      { src: '/silent-disco/photo-5.jpg', alt: 'Silent disco birthday party with LED wristbands' },
      { src: '/silent-disco/photo-6.jpg', alt: 'Group dancing in silent disco headphones' },
      { src: '/silent-disco/photo-7.jpg', alt: 'Silent disco crowd enjoying the event' },
      { src: '/silent-disco/photo-8.jpg', alt: 'Kids and adults at a Glowhouse silent disco' },
      { src: '/silent-disco/photo-9.jpg', alt: 'Silent disco party with neon headphone glow' },
    ],
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
