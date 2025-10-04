import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Emergency from './components/Emergency';
import JourneyTracker from './components/JourneyTracker';
import SafetyBlogs from './components/SafetyBlogs';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/emergency" 
                element={
                  <ProtectedRoute>
                    <Emergency />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/journey" 
                element={
                  <ProtectedRoute>
                    <JourneyTracker />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blogs" 
                element={
                  <ProtectedRoute>
                    <SafetyBlogs />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;