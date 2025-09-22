import { Question, QuestionOption } from '@/types/prakruti';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedOption: QuestionOption | null;
  onOptionSelect: (option: QuestionOption) => void;
}

const QuestionCard = ({ question, selectedOption, onOptionSelect }: QuestionCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft border-border/50">
      <CardHeader className="bg-gradient-sage rounded-t-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Question {question.id} • {question.category}
          </span>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "w-full p-4 h-auto text-left justify-start transition-all duration-300",
              "hover:shadow-soft hover:border-primary/30",
              selectedOption?.text === option.text && [
                "border-primary bg-primary/10",
                option.dosha === 'vata' && "border-dosha-vata bg-dosha-vata/10",
                option.dosha === 'pitta' && "border-dosha-pitta bg-dosha-pitta/10", 
                option.dosha === 'kapha' && "border-dosha-kapha bg-dosha-kapha/10"
              ]
            )}
            onClick={() => onOptionSelect(option)}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full border-2 transition-all",
                selectedOption?.text === option.text ? [
                  option.dosha === 'vata' && "bg-dosha-vata border-dosha-vata",
                  option.dosha === 'pitta' && "bg-dosha-pitta border-dosha-pitta",
                  option.dosha === 'kapha' && "bg-dosha-kapha border-dosha-kapha"
                ] : "border-muted-foreground"
              )} />
              <span className="text-foreground leading-relaxed">{option.text}</span>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;