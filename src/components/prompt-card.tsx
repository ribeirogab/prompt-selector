import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PromptCardProps {
  prompt: string;
  showCopyButton?: boolean;
  className?: string;
}

export function PromptCard({
  prompt,
  showCopyButton = true,
  className,
}: PromptCardProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success('Copied!', {
        description: 'Prompt copied to clipboard',
      });
    } catch {
      toast.error('Error', {
        description: 'Failed to copy prompt',
      });
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{prompt}</p>
      </CardContent>
      {showCopyButton && (
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            copy
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
