import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Layout/Navbar';

export const PowerBIDashboard: React.FC = () => {
  // Replace with your actual PowerBI embed URL
  const embedUrl = "https://app.powerbi.com/reportEmbed?reportId=b208264d-ad72-4378-8c51-37868bfe0a06&autoAuth=true&ctid=23035d1f-133c-44b5-b2ad-b3aef17baaa1";

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#f9fafb' // Light background color
        //darkMode: { backgroundColor: '#1f2937' }, // Dark mode background
      }}
    >
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '24px' }} // Padding around the content
      >
        <div
          className="max-w-7xl mx-auto"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(56, 45, 117, 0.8), rgba(0, 27, 52, 0.8))',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
            }}
            className="hover:scale-105" // Tailwind class for hover effect
          >
            <iframe
              title="Power BI Dashboard"
              width="100%"
              height="800"
              src={embedUrl}
              frameBorder="0"
              allowFullScreen
              style={{
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', // Add shadow to the iframe
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
