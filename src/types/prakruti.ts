export type DoshaType = 'vata' | 'pitta' | 'kapha';

export interface QuestionOption {
  text: string;
  dosha: DoshaType;
  points: number;
}

export interface Question {
  id: number;
  question: string;
  category: string;
  options: QuestionOption[];
}

export interface Response {
  questionId: number;
  selectedOption: QuestionOption;
}

export interface DoshaScore {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface PrakrutiResult {
  scores: DoshaScore;
  primaryDosha: DoshaType;
  secondaryDosha?: DoshaType;
  constitution: string;
  recommendations: string[];
}