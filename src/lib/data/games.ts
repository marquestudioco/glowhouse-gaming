export type GamePlatform = 'ps5' | 'switch' | 'vr' | 'party' | 'family';

export interface Game {
  id: string;
  name: string;
  platform: GamePlatform[];
  ageRating: string;
}

export const GAMES: Game[] = [
  { id: 'mario-kart',    name: 'Mario Kart 8',       platform: ['switch', 'party', 'family'], ageRating: 'E' },
  { id: 'just-dance',    name: 'Just Dance',          platform: ['switch', 'party', 'family'], ageRating: 'E10' },
  { id: 'minecraft',     name: 'Minecraft',           platform: ['switch', 'family'],          ageRating: 'E10' },
  { id: 'fortnite',      name: 'Fortnite',            platform: ['ps5', 'party'],              ageRating: 'T' },
  { id: 'fifa',          name: 'EA Sports FC',        platform: ['ps5', 'party'],              ageRating: 'E' },
  { id: 'beat-saber',    name: 'Beat Saber',          platform: ['vr', 'party'],               ageRating: 'T' },
  { id: 'superhot',      name: 'Superhot VR',         platform: ['vr'],                        ageRating: 'M' },
  { id: 'gorilla-tag',   name: 'Gorilla Tag',         platform: ['vr', 'party'],               ageRating: 'E' },
  { id: 'spider-man',    name: 'Spider-Man 2',        platform: ['ps5'],                       ageRating: 'T' },
  { id: 'rocket-league', name: 'Rocket League',       platform: ['ps5', 'party'],              ageRating: 'E' },
  { id: 'smash-bros',    name: 'Super Smash Bros.',   platform: ['switch', 'party', 'family'], ageRating: 'E10' },
  { id: 'among-us',      name: 'Among Us',            platform: ['switch', 'party', 'family'], ageRating: 'E10' },
  { id: 'borderlands',   name: 'Borderlands 3',       platform: ['ps5'],                       ageRating: 'M' },
  { id: 'gta5',          name: 'GTA Online',          platform: ['ps5'],                       ageRating: 'M' },
  { id: 'nba2k',         name: 'NBA 2K',              platform: ['ps5', 'party'],              ageRating: 'E' },
  { id: 'vr-sports',     name: 'Sports Scramble VR',  platform: ['vr', 'party', 'family'],     ageRating: 'E' },
];

export const PLATFORM_LABELS: Record<GamePlatform, string> = {
  ps5:    'PS5',
  switch: 'Switch',
  vr:     'VR',
  party:  'Party',
  family: 'Family',
};
