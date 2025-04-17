import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Layout/Navbar';

export const PowerBIDashboard: React.FC = () => {
  // Replace with your actual PowerBI embed URL
  const embedUrl = "https://app.powerbi.com/reportEmbed?reportId=your-report-id";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <iframe
              title="Coffee Production Dashboard"
              width="100%"
              height="800"
              src={embedUrl}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};