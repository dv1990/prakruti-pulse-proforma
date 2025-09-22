import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progress
        </span>
        <span className="text-sm font-medium text-primary">
          {current} of {total}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-muted"
      />
    </div>
  );
};

export default ProgressBar;