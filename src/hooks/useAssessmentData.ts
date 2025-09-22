import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { calculateDoshaScores } from '@/utils/prakrutiAnalysis';

export const useAssessmentData = () => {
  const { profile } = useAuth();

  const saveAssessment = async (
    patientData: { name: string; age: number; mobileNumber: string },
    responses: Record<string, string>
  ) => {
    if (!profile?.id) {
      throw new Error('No authenticated practitioner found');
    }

    try {
      // First, create or find patient
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('id')
        .eq('practitioner_id', profile.id)
        .eq('name', patientData.name)
        .eq('mobile_number', patientData.mobileNumber)
        .single();

      let patientId: string;

      if (existingPatient) {
        patientId = existingPatient.id;
      } else {
        const { data: newPatient, error: patientError } = await supabase
          .from('patients')
          .insert({
            practitioner_id: profile.id,
            name: patientData.name,
            age: patientData.age,
            mobile_number: patientData.mobileNumber
          })
          .select('id')
          .single();

        if (patientError) throw patientError;
        patientId = newPatient.id;
      }

      // Calculate scores - convert responses to correct format
      const responseArray = Object.entries(responses).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption: { 
          dosha: selectedOption as 'vata' | 'pitta' | 'kapha',
          points: 1,
          text: selectedOption
        }
      }));
      
      const scores = calculateDoshaScores(responseArray);
      const primaryDosha = Object.entries(scores).reduce((a, b) => 
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
      )[0];

      // Save assessment
      const { data: assessment, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          practitioner_id: profile.id,
          patient_id: patientId,
          responses,
          vata_score: scores.vata,
          pitta_score: scores.pitta,
          kapha_score: scores.kapha,
          primary_dosha: primaryDosha
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      return { assessment, patientId };
    } catch (error) {
      console.error('Error saving assessment:', error);
      throw error;
    }
  };

  return { saveAssessment };
};