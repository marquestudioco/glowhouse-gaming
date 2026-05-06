export interface Package {
  id: string;
  tier: 'starter' | 'premium' | 'vip';
  name: string;
  tagline: string;
  priceFrom: string;
  includes: string[];
  highlight: boolean;
  accentColor: string;
}

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    tier: 'starter',
    name: 'Starter Glow',
    tagline: 'Perfect for smaller parties.',
    priceFrom: 'Starting at $199',
    includes: [
      '2-hour lounge session',
      'Up to 8 guests',
      '2 screens + consoles',
      'Custom playlist',
      'Standard LED lighting',
    ],
    highlight: false,
    accentColor: 'var(--neon-cyan)',
  },
  {
    id: 'premium',
    tier: 'premium',
    name: 'Premium Glow',
    tagline: 'The most popular choice.',
    priceFrom: 'Starting at $349',
    includes: [
      '2-hour lounge session',
      'Up to 16 guests',
      '4 screens + consoles',
      'VR headsets included',
      'Birthday host',
      'Custom playlist + DJ lighting',
      'Photo op setup',
    ],
    highlight: true,
    accentColor: 'var(--neon-magenta)',
  },
  {
    id: 'vip',
    tier: 'vip',
    name: 'VIP Glow',
    tagline: 'Pull out all the stops.',
    priceFrom: 'Starting at $549',
    includes: [
      '3-hour lounge session',
      'Up to 25 guests',
      'All screens + consoles + VR',
      'Dedicated birthday host',
      'Custom invite design',
      'Full DJ lighting experience',
      'Add-on mobile service available',
    ],
    highlight: false,
    accentColor: 'var(--neon-violet)',
  },
];
