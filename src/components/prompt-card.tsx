import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface PromptCardProps {
  prompt: string;
  showCopyButton?: boolean;
}

export function PromptCard({ prompt, showCopyButton = true }: PromptCardProps) {
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
    <Card className="w-full">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{prompt}</p>
      </CardContent>
      {showCopyButton && (
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            Copy
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
