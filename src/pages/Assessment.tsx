import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { prakrutiQuestions } from '@/data/questions';
import { Response, QuestionOption } from '@/types/prakruti';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAssessmentData } from '@/hooks/useAssessmentData';
import { PatientDetails } from '@/types/patient';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveAssessment } = useAssessmentData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);

  useEffect(() => {
    // Check if patient details are provided
    const storedPatientDetails = localStorage.getItem('patient-details');
    if (!storedPatientDetails) {
      navigate('/patient-info');
      return;
    }
    setPatientDetails(JSON.parse(storedPatientDetails));
  }, [navigate]);

  const handleOptionSelect = (option: QuestionOption) => {
    const questionId = prakrutiQuestions[currentQuestion].id;
    const newResponses = responses.filter(r => r.questionId !== questionId);
    newResponses.push({ questionId, selectedOption: option });
    setResponses(newResponses);
  };

  const getCurrentResponse = () => {
    const questionId = prakrutiQuestions[currentQuestion].id;
    return responses.find(r => r.questionId === questionId)?.selectedOption || null;
  };

  const canGoNext = () => {
    return getCurrentResponse() !== null;
  };

  const handleNext = async () => {
    if (currentQuestion < prakrutiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      if (!patientDetails) return;
      
      setIsSubmitting(true);
      
      try {
        // Convert responses to the format expected by the hook
        const responsesObj = responses.reduce((acc, response) => {
          acc[response.questionId] = response.selectedOption.dosha;
          return acc;
        }, {} as Record<string, string>);
        
        // If user is authenticated, save to database
        if (user) {
          await saveAssessment(patientDetails, responsesObj);
          toast.success("Assessment saved successfully!");
          navigate("/dashboard");
        } else {
          // If not authenticated, save to localStorage for anonymous users
          localStorage.setItem('prakruti-responses', JSON.stringify(responses));
          navigate('/results');
        }
      } catch (error) {
        toast.error("Failed to save assessment. Please try again.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Prakruti Assessment
          </h1>
          <p className="text-muted-foreground">
            Answer each question based on your natural tendencies throughout your life
          </p>
        </div>

        <ProgressBar 
          current={currentQuestion + 1} 
          total={prakrutiQuestions.length} 
        />

        <QuestionCard
          question={prakrutiQuestions[currentQuestion]}
          selectedOption={getCurrentResponse()}
          onOptionSelect={handleOptionSelect}
        />

        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canGoNext() || isSubmitting}
            className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90"
          >
            <span>
              {currentQuestion === prakrutiQuestions.length - 1 
                ? (isSubmitting ? 'Saving...' : 'Complete Assessment')
                : 'Next'
              }
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;