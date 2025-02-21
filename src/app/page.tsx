'use client';

import { Button } from '@/components/ui/button';
import { PromptCard } from '@/components/prompt-card';
import { prompts } from '@/data/prompts.data';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const getRandomPrompt = async () => {
    const randomPrompt =
      prompts[Math.floor(Math.random() * prompts.length)].prompt;
    setSelectedPrompt(randomPrompt);

    try {
      await navigator.clipboard.writeText(randomPrompt);
      toast.success('Success!', {
        description: 'Prompt copied to clipboard',
      });
    } catch {
      toast.error('Error', {
        description: 'Failed to copy prompt',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center">
          The Deep Universe Prompt Selector
        </h1>

        <div className="flex gap-4">
          <Button size="lg" onClick={getRandomPrompt}>
            Get Random Prompt
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/prompts">View All Prompts</Link>
          </Button>
        </div>

        {selectedPrompt && (
          <div className="w-full">
            <PromptCard prompt={selectedPrompt} showCopyButton={false} />
          </div>
        )}
      </div>
    </div>
  );
}
