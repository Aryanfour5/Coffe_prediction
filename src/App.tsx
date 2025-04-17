import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { PowerBIDashboard } from './pages/PowerBIDashboard';
import { MLModel } from './pages/MLModel';
import { useAuthStore } from './store/authStore';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/powerbi"
          element={
            <PrivateRoute>
              <PowerBIDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ml-model"
          element={
            <PrivateRoute>
              <MLModel />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;