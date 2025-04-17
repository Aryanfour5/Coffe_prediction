import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Navbar } from '../components/Layout/Navbar';
import { DashboardCard } from '../components/Dashboard/DashboardCard';
import { BarChart, Brain } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Welcome back, {user?.name}!
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <DashboardCard
              title="PowerBI Dashboard"
              description="View detailed coffee production analytics and insights"
              icon={<BarChart className="h-8 w-8" />}
              link="/powerbi"
            />
            <DashboardCard
              title="ML Prediction Model"
              description="Predict coffee production using our machine learning model"
              icon={<Brain className="h-8 w-8" />}
              link="/ml-model"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};