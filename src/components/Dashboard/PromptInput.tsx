import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt (e.g., 'Show temperature anomalies for India from 2000 to 2024')"
          className="w-full px-4 py-3 pr-12 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};