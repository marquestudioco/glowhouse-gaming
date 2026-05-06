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
    heroImage: '/gallery/photo-14.jpg',
    maxGuests: 20,
    duration: '2 hours',
    indoor: true,
    mobileService: false,
    priceFrom: '$400',
    gallery: [
      { src: '/lounge/photo-1.jpg',   alt: 'Glowhouse Gaming team with LED headphones at a party' },
      { src: '/lounge/photo-2.jpg',   alt: 'Kids gaming in the neon-lit Glowhouse lounge' },
      { src: '/gallery/photo-10.jpg', alt: 'Glowhouse team rocking branded LED headphones' },
      { src: '/gallery/photo-11.jpg', alt: 'Guests celebrating at a Glowhouse Gaming party' },
      { src: '/lounge/photo-3.jpg',   alt: 'Birthday party setup inside the gaming lounge' },
      { src: '/lounge/photo-4.jpg',   alt: 'Guests enjoying the Glowhouse gaming lounge' },
      { src: '/gallery/photo-18.jpg', alt: 'Gaming with headphones in neon-lit lounge' },
      { src: '/lounge/photo-5.jpg',   alt: 'Console gaming party with neon lighting' },
      { src: '/lounge/photo-6.jpg',   alt: 'Fun group gaming session at Glowhouse' },
      { src: '/lounge/photo-7.jpg',   alt: 'Lounge birthday party with colorful lights' },
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
    gallery: [
      { src: '/gallery/photo-19.jpg', alt: 'Guest using VR headset at a Glowhouse Gaming event' },
      { src: '/gallery/photo-20.jpg', alt: 'Group of guests experiencing VR headsets simultaneously' },
      { src: '/vr/kid-vr-neon.jpg',   alt: 'Kid fully immersed in a VR gaming experience' },
      { src: '/gallery/photo-26.jpg', alt: 'Multi-screen gaming setup delivered to a home garage' },
      { src: '/gallery/photo-27.jpg', alt: 'Outdoor backyard multi-screen gaming party setup' },
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
    heroImage: '/gallery/photo-27.jpg',
    maxGuests: 50,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
    priceFrom: '$250',
    gallery: [
      { src: '/gallery/photo-27.jpg', alt: 'Outdoor backyard gaming and movie event setup with screens' },
      { src: '/gallery/photo-28.jpg', alt: 'Outdoor backyard party with multiple gaming screens and seating' },
      { src: '/gallery/photo-24.jpg', alt: 'Outdoor event with screen and DJ setup under tent' },
      { src: '/gallery/photo-25.jpg', alt: 'Glowhouse Gaming outdoor night event setup' },
      { src: '/outdoor/photo-1.jpg',  alt: 'Drive-In Movie Night @ Castaic Lake event' },
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
    heroImage: '/gallery/photo-25.jpg',
    maxGuests: 10,
    duration: '2–4 hours',
    indoor: true,
    mobileService: true,
    priceFrom: '$100',
    gallery: [
      { src: '/gallery/photo-25.jpg', alt: 'Glowhouse Gaming party van at an outdoor night event' },
      { src: '/van/exterior.webp',    alt: 'Glowhouse Gaming party van exterior with mounted screen' },
      { src: '/van/interior-1.webp',  alt: 'Inside the Glowhouse party van — screens and consoles' },
      { src: '/van/interior-2.webp',  alt: 'Party van interior lighting and gaming setup' },
      { src: '/van/lighting.webp',    alt: 'Glowhouse party van LED lighting display at night' },
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
    youtubeId: 'kB4U67tiQLA',
    gallery: [
      { src: '/silent-disco/photo-3.jpg', alt: 'Girl wearing Glow Squad silent disco headphones outdoors' },
      { src: '/gallery/photo-13.jpg',     alt: 'Party guests in LED headphones at a silent disco event' },
      { src: '/gallery/photo-12.jpg',     alt: 'Glow Squad LED headphones glowing red and blue in the dark' },
      { src: '/silent-disco/photo-1.jpg', alt: 'Two guests at the silent disco DJ setup' },
      { src: '/gallery/photo-15.jpg',     alt: 'Professional DJ mixer with purple neon lighting' },
      { src: '/silent-disco/photo-4.jpg', alt: 'Everyone dancing at a Glowhouse silent disco' },
      { src: '/silent-disco/photo-5.jpg', alt: 'Silent disco birthday party with LED headphones' },
      { src: '/silent-disco/photo-6.jpg', alt: 'Group enjoying the silent disco experience' },
      { src: '/silent-disco/photo-7.jpg', alt: 'Silent disco crowd at a Glowhouse event' },
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
      { src: '/gallery/photo-14.jpg', alt: 'Glowhouse Gaming lounge and venue interior setup' },
      { src: '/lounge/kids-neon.jpg', alt: 'Kids gaming together in a neon-lit environment' },
      { src: '/gallery/photo-10.jpg', alt: 'Glowhouse Gaming team ready to host your session' },
      { src: '/gallery/photo-26.jpg', alt: 'Multi-screen gaming setup for structured play' },
    ],
  },
];

export const SERVICE_AREA_CITIES = [
  'Santa Clarita', 'Valencia', 'Newhall', 'Stevenson Ranch', 'Canyon Country', 'Saugus', 'Castaic',
];
