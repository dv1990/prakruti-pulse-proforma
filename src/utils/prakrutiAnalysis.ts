import { Response, DoshaScore, PrakrutiResult, DoshaType } from '@/types/prakruti';

export const calculateDoshaScores = (responses: Response[]): DoshaScore => {
  const scores = { vata: 0, pitta: 0, kapha: 0 };
  
  responses.forEach(response => {
    scores[response.selectedOption.dosha] += response.selectedOption.points;
  });

  return scores;
};

export const determinePrakruti = (scores: DoshaScore): PrakrutiResult => {
  const doshas = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryDosha = doshas[0][0] as DoshaType;
  const secondaryDosha = doshas[1][1] > 0 ? doshas[1][0] as DoshaType : undefined;
  
  // Determine constitution type
  const total = scores.vata + scores.pitta + scores.kapha;
  const primaryPercentage = (doshas[0][1] / total) * 100;
  
  let constitution: string;
  if (primaryPercentage > 60) {
    constitution = `${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)} Dominant`;
  } else if (secondaryDosha) {
    constitution = `${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}-${secondaryDosha.charAt(0).toUpperCase() + secondaryDosha.slice(1)} (Dual)`;
  } else {
    constitution = 'Balanced (Tridoshic)';
  }

  // Generate recommendations based on primary dosha
  const recommendations = getRecommendations(primaryDosha);

  return {
    scores,
    primaryDosha,
    secondaryDosha,
    constitution,
    recommendations
  };
};

const getRecommendations = (primaryDosha: DoshaType): string[] => {
  const recommendations = {
    vata: [
      'Maintain regular daily routines and meal times',
      'Prefer warm, cooked foods and avoid raw, cold foods',
      'Practice calming activities like gentle yoga and meditation',
      'Ensure adequate rest and avoid overstimulation',
      'Use warm oils for regular self-massage (abhyanga)',
      'Stay warm and avoid excessive cold and wind'
    ],
    pitta: [
      'Avoid excessive heat and direct sun exposure',
      'Prefer cooling foods and avoid spicy, acidic foods',
      'Practice moderate exercise and avoid overexertion',
      'Maintain work-life balance and avoid perfectionism',
      'Spend time in nature, especially near water',
      'Practice cooling pranayama and meditation'
    ],
    kapha: [
      'Engage in regular vigorous exercise and movement',
      'Prefer light, warm, spicy foods and reduce dairy/sweets',
      'Maintain active lifestyle and avoid excessive sleep',
      'Seek mental stimulation and new experiences',
      'Practice energizing breathing techniques',
      'Keep environment warm and dry'
    ]
  };

  return recommendations[primaryDosha];
};