import { Question } from '../types/prakruti';

export const prakrutiQuestions: Question[] = [
  {
    id: 1,
    question: "What is your natural body build?",
    category: "Physical Constitution",
    options: [
      { text: "Thin, light frame with prominent joints", dosha: "vata", points: 3 },
      { text: "Medium build with good muscle definition", dosha: "pitta", points: 3 },
      { text: "Large, heavy frame with broad shoulders", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 2,
    question: "How is your skin texture naturally?",
    category: "Physical Constitution",
    options: [
      { text: "Dry, rough, and tends to crack easily", dosha: "vata", points: 3 },
      { text: "Warm, oily, and prone to inflammation", dosha: "pitta", points: 3 },
      { text: "Thick, smooth, and naturally moisturized", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 3,
    question: "Describe your hair quality:",
    category: "Physical Constitution",
    options: [
      { text: "Dry, brittle, and frizzy", dosha: "vata", points: 3 },
      { text: "Fine, soft, and prone to early graying", dosha: "pitta", points: 3 },
      { text: "Thick, oily, and lustrous", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 4,
    question: "What is your appetite like?",
    category: "Digestive Patterns",
    options: [
      { text: "Variable - sometimes very hungry, sometimes no appetite", dosha: "vata", points: 3 },
      { text: "Strong and regular - get uncomfortable when hungry", dosha: "pitta", points: 3 },
      { text: "Steady but can easily skip meals without discomfort", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 5,
    question: "How is your digestion?",
    category: "Digestive Patterns",
    options: [
      { text: "Irregular - bloating, gas, and constipation", dosha: "vata", points: 3 },
      { text: "Quick and strong - feel heat after eating", dosha: "pitta", points: 3 },
      { text: "Slow and steady - feel heavy after meals", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 6,
    question: "What is your thirst pattern?",
    category: "Digestive Patterns",
    options: [
      { text: "Variable thirst - sometimes forget to drink", dosha: "vata", points: 3 },
      { text: "Intense thirst - crave cold drinks", dosha: "pitta", points: 3 },
      { text: "Low thirst - prefer warm drinks", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 7,
    question: "How is your sleep pattern?",
    category: "Mental & Emotional",
    options: [
      { text: "Light, restless, and easily disturbed", dosha: "vata", points: 3 },
      { text: "Moderate but sound - wake up refreshed", dosha: "pitta", points: 3 },
      { text: "Deep and long - love to sleep in", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 8,
    question: "How do you handle stress?",
    category: "Mental & Emotional",
    options: [
      { text: "Become anxious and worry excessively", dosha: "vata", points: 3 },
      { text: "Get irritated and angry quickly", dosha: "pitta", points: 3 },
      { text: "Withdraw and become quiet or sad", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 9,
    question: "What describes your energy levels?",
    category: "Mental & Emotional",
    options: [
      { text: "Bursts of energy followed by fatigue", dosha: "vata", points: 3 },
      { text: "Consistent high energy throughout the day", dosha: "pitta", points: 3 },
      { text: "Steady, sustained energy but slow to start", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 10,
    question: "How do you learn and retain information?",
    category: "Mental & Emotional",
    options: [
      { text: "Learn quickly but forget easily", dosha: "vata", points: 3 },
      { text: "Learn at moderate pace with good comprehension", dosha: "pitta", points: 3 },
      { text: "Learn slowly but remember for a long time", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 11,
    question: "What is your speaking pattern?",
    category: "Mental & Emotional",
    options: [
      { text: "Talk fast, jump between topics", dosha: "vata", points: 3 },
      { text: "Speak clearly with conviction", dosha: "pitta", points: 3 },
      { text: "Speak slowly and thoughtfully", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 12,
    question: "How do you react to cold weather?",
    category: "Environmental Response",
    options: [
      { text: "Dislike cold - feel stiff and uncomfortable", dosha: "vata", points: 3 },
      { text: "Tolerate cold well - actually prefer it", dosha: "pitta", points: 3 },
      { text: "Don't mind cold but feel sluggish", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 13,
    question: "How do you react to hot weather?",
    category: "Environmental Response",
    options: [
      { text: "Tolerate heat reasonably well", dosha: "vata", points: 3 },
      { text: "Become uncomfortable and irritable in heat", dosha: "pitta", points: 3 },
      { text: "Handle heat well but become lethargic", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 14,
    question: "What is your natural tendency toward physical activity?",
    category: "Lifestyle Patterns",
    options: [
      { text: "Enjoy varied activities but tire quickly", dosha: "vata", points: 3 },
      { text: "Like competitive sports and vigorous exercise", dosha: "pitta", points: 3 },
      { text: "Prefer gentle, steady exercise", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 15,
    question: "How do you handle routine?",
    category: "Lifestyle Patterns",
    options: [
      { text: "Dislike routine - prefer variety and change", dosha: "vata", points: 3 },
      { text: "Like organized routine but can adapt", dosha: "pitta", points: 3 },
      { text: "Love routine and resist change", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 16,
    question: "What is your natural body weight tendency?",
    category: "Physical Constitution",
    options: [
      { text: "Tend to be underweight - hard to gain", dosha: "vata", points: 3 },
      { text: "Maintain moderate weight easily", dosha: "pitta", points: 3 },
      { text: "Tend to gain weight easily", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 17,
    question: "How is your memory pattern?",
    category: "Mental & Emotional",
    options: [
      { text: "Good short-term, poor long-term memory", dosha: "vata", points: 3 },
      { text: "Sharp, clear memory with good recall", dosha: "pitta", points: 3 },
      { text: "Slow to remember but very retentive", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 18,
    question: "What describes your decision-making style?",
    category: "Mental & Emotional",
    options: [
      { text: "Quick decisions but often change mind", dosha: "vata", points: 3 },
      { text: "Decisive and stick to decisions", dosha: "pitta", points: 3 },
      { text: "Take time to decide but rarely change", dosha: "kapha", points: 3 }
    ]
  }
];