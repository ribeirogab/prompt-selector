'use client';

import Image from 'next/image';
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
    <div className="relative container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mt-[10%] min-h-[80vh] gap-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src="/logo.jpg"
            alt="The Deep Universe Logo"
            width={120}
            height={120}
            className="rounded-full"
            priority
          />
          <h1 className="text-xl font-bold">@thedeepuniverse</h1>
          <p className="text-muted-foreground text-sm max-w-md lowercase">
            Generate spooky and mysterious video prompts for The Deep Universe
            channel. Each prompt is carefully crafted to create engaging and
            suspenseful content.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={getRandomPrompt}
            className="min-w-[200px] lowercase"
          >
            Get Random Prompt
          </Button>

          <Button variant="ghost" size="sm" asChild className="lowercase">
            <Link href="/prompts">View All Prompts</Link>
          </Button>
        </div>

        <div className="w-full mt-8">
          {selectedPrompt && (
            <PromptCard
              className="h-[300px] max-h-[300px] overflow-auto"
              prompt={selectedPrompt}
              showCopyButton={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
