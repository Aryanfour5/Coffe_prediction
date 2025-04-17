import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb } from 'lucide-react';

interface Props {
  recommendations?: string[];
  summary?: string;
}

export const AIAssistant: React.FC<Props> = ({ recommendations = [], summary }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      className="w-80 bg-white dark:bg-gray-800 h-full border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Assistant
        </h3>
      </div>

      {summary && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Try these prompts
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
              >
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};