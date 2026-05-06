export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: 5;
  source: 'yelp' | 'facebook' | 'google';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Mom of birthday kid (age 12)',
    text: 'My son\'s birthday was absolutely amazing. The staff was so friendly and helped keep all the kids engaged the entire time. The setup was incredible — the kids didn\'t want to leave!',
    rating: 5,
    source: 'yelp',
  },
  {
    id: '2',
    name: 'Jennifer R.',
    role: 'Mom, daughter\'s 16th birthday',
    text: 'The owners and staff were so friendly and accommodating. Spacious, clean, and the whole venue just looks incredible. My daughter and all her friends had the best time.',
    rating: 5,
    source: 'yelp',
  },
  {
    id: '3',
    name: 'Marcus T.',
    role: 'Corporate event organizer',
    text: 'We used the silent disco for our team holiday event and it was a massive hit. Easy to book, the team arrived on time, and everyone was talking about it for weeks.',
    rating: 5,
    source: 'facebook',
  },
  {
    id: '4',
    name: 'Daniela K.',
    role: 'Mom of birthday kid (age 9)',
    text: 'The birthday host made the whole experience special. My daughter kept saying it was the best birthday she ever had. Highly recommend for any parent looking for something unique.',
    rating: 5,
    source: 'facebook',
  },
  {
    id: '5',
    name: 'Kevin L.',
    role: 'Dad, twin birthday party',
    text: 'Booked the VIP package for my twins\' birthday — 20 kids and everything ran perfectly. The staff was patient, helpful, and clearly loves what they do.',
    rating: 5,
    source: 'yelp',
  },
  {
    id: '6',
    name: 'Priya S.',
    role: 'Booked outdoor movie night',
    text: 'Had Glowhouse set up their outdoor movie screen for a backyard graduation party. Setup was fast, quality was amazing, and the whole experience was stress-free.',
    rating: 5,
    source: 'google',
  },
];
