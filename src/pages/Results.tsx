import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Response, PrakrutiResult } from '@/types/prakruti';
import { calculateDoshaScores, determinePrakruti } from '@/utils/prakrutiAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Share2, Download, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<PrakrutiResult | null>(null);

  useEffect(() => {
    const storedResponses = localStorage.getItem('prakruti-responses');
    if (!storedResponses) {
      navigate('/');
      return;
    }

    const responses: Response[] = JSON.parse(storedResponses);
    const scores = calculateDoshaScores(responses);
    const prakrutiResult = determinePrakruti(scores);
    setResult(prakrutiResult);
  }, [navigate]);

  const handleShare = async () => {
    if (!result) return;
    
    const shareText = `My Ayurvedic Prakruti: ${result.constitution}\n\nVata: ${result.scores.vata}%\nPitta: ${result.scores.pitta}%\nKapha: ${result.scores.kapha}%\n\nDiscover your constitution at ${window.location.origin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Prakruti Assessment Results',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        toast({ title: "Results copied to clipboard!" });
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({ title: "Results copied to clipboard!" });
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'bg-dosha-vata';
      case 'pitta': return 'bg-dosha-pitta';
      case 'kapha': return 'bg-dosha-kapha';
      default: return 'bg-primary';
    }
  };

  const getDoshaDescription = (dosha: string) => {
    const descriptions = {
      vata: "Air & Space - Movement, creativity, and change. Governs circulation, breathing, and nervous system.",
      pitta: "Fire & Water - Transformation and metabolism. Governs digestion, body temperature, and intellect.",
      kapha: "Earth & Water - Structure and stability. Governs immunity, growth, and emotional stability."
    };
    return descriptions[dosha as keyof typeof descriptions];
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your prakruti...</p>
        </div>
      </div>
    );
  }

  const total = result.scores.vata + result.scores.pitta + result.scores.kapha;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your Prakruti Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            {result.constitution}
          </p>
        </div>

        {/* Dosha Scores */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader className="bg-gradient-sage">
            <CardTitle className="text-2xl">Dosha Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {Object.entries(result.scores).map(([dosha, score]) => {
                const percentage = Math.round((score / total) * 100);
                return (
                  <div key={dosha} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${getDoshaColor(dosha)}`} />
                        <span className="font-semibold text-lg capitalize">{dosha}</span>
                      </div>
                      <span className="text-lg font-bold">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      {getDoshaDescription(dosha)}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-8 shadow-soft">
          <CardHeader className="bg-gradient-secondary">
            <CardTitle className="text-2xl">Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              Based on your {result.primaryDosha} constitution, here are tailored lifestyle recommendations:
            </p>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/assessment')}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This assessment is for educational purposes only and should not replace professional medical advice. 
              Consult with a qualified Ayurvedic practitioner for personalized treatment recommendations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;