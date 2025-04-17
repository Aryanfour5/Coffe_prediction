import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Brain, LogOut, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);
  const { logout } = useAuthStore();
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-gray-900 dark:text-white">AI Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/assistant" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Brain className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={logout}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};