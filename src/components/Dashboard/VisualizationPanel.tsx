import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart } from 'lucide-react';
import { VisualizationData } from '../../types';

interface Props {
  data?: VisualizationData;
  isLoading: boolean;
}

export const VisualizationPanel: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-96 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </motion.div>
    );
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-96 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {Math.random() > 0.5 ? (
              <LineChart className="h-16 w-16 text-gray-400" />
            ) : (
              <BarChart className="h-16 w-16 text-gray-400" />
            )}
          </div>
          <p className="text-gray-500 dark:text-gray-400">No data to display</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try entering a different prompt</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <iframe
        src={data.url}
        className="w-full h-full border-0"
        title="Power BI Visualization"
      />
    </motion.div>
  );
};