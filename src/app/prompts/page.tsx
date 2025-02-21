'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PromptCard } from '@/components/prompt-card';
import { prompts } from '@/data/prompts.data';

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">All Prompts</h1>
          <Button variant="outline" asChild>
            <Link href="/">Back Home</Link>
          </Button>
        </div>

        <Input
          type="search"
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <div className="grid gap-4">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt.prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
