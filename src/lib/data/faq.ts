export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'birthday' | 'mobile' | 'afterschool';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'deposit',
    question: 'Is a deposit required to book?',
    answer: 'Yes — a 50% deposit secures your date. The remaining balance is due on the day of your event. We accept all major credit cards.',
    category: 'booking',
  },
  {
    id: 'service-area',
    question: 'What areas do you serve for mobile services?',
    answer: 'We serve the entire Santa Clarita Valley including Valencia, Newhall, Stevenson Ranch, Canyon Country, Saugus, and Castaic. Contact us for locations outside this area.',
    category: 'mobile',
  },
  {
    id: 'age-range',
    question: 'What ages are the parties appropriate for?',
    answer: 'We host kids as young as 6 all the way through adults. We customize the game selection to the age group — let us know and we\'ll set up the perfect lineup.',
    category: 'birthday',
  },
  {
    id: 'whats-included',
    question: 'What\'s included with a birthday party package?',
    answer: 'All packages include game setup and breakdown, a curated playlist, LED party lighting, and dedicated staff. Premium and VIP packages include a birthday host who guides the party experience.',
    category: 'birthday',
  },
  {
    id: 'how-far-ahead',
    question: 'How far in advance should I book?',
    answer: 'Weekends book fast — we recommend 2–3 weeks minimum for birthday parties. For larger events, 4+ weeks is ideal.',
    category: 'booking',
  },
  {
    id: 'food',
    question: 'Can we bring food and cake?',
    answer: 'Absolutely! You\'re welcome to bring your own food, cake, and decorations. Some packages include a catering add-on — ask when booking.',
    category: 'birthday',
  },
  {
    id: 'after-school-enroll',
    question: 'How do I enroll in the After School Club?',
    answer: 'Visit ghgafterschoolclub.com for enrollment info, schedules, and pricing. Monthly memberships are available.',
    category: 'afterschool',
  },
  {
    id: 'cancellation',
    question: 'What is your cancellation policy?',
    answer: 'Cancellations 7+ days before the event receive a full deposit refund. Cancellations within 7 days are non-refundable but can be rescheduled once.',
    category: 'booking',
  },
];

export const FAQ_HOME_IDS = ['deposit', 'service-area', 'age-range', 'whats-included'];
