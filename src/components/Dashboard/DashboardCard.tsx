import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export const DashboardCard: React.FC<Props> = ({ title, description, icon, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(link)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};