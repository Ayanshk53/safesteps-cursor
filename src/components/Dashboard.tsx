import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Settings, 
  BookOpen, 
  Navigation,
  AlertTriangle,
  Users,
  Bell,
  Menu,
  X
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quickActions = [
    {
      title: 'Emergency SOS',
      description: 'Quick emergency alert',
      icon: AlertTriangle,
      link: '/emergency',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'Journey Tracker',
      description: 'Track your journey safely',
      icon: Navigation,
      link: '/journey',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Safety Tips',
      description: 'Read safety articles',
      icon: BookOpen,
      link: '/blogs',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Settings',
      description: 'Manage your account',
      icon: Settings,
      link: '/settings',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const emergencyNumbers = [
    { name: 'Police', number: '100', color: 'bg-blue-500' },
    { name: 'Women Helpline', number: '1091', color: 'bg-pink-500' },
    { name: 'Emergency', number: '108', color: 'bg-red-500' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-pink-500" />
              <h1 className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Women Safety
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome back, {user?.name}!
              </h2>
              <p className={`mt-1 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Stay safe and connected with our safety features
              </p>
            </div>
            <div className="hidden sm:block">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Safe & Connected
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Emergency Numbers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {emergencyNumbers.map((contact, index) => (
              <button
                key={index}
                onClick={() => window.open(`tel:${contact.number}`)}
                className={`${contact.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <Phone className="h-6 w-6 mb-2" />
                <div className="font-semibold">{contact.name}</div>
                <div className="text-sm opacity-90">{contact.number}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white p-6 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <action.icon className="h-8 w-8 mb-3" />
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm opacity-90 mt-1">{action.description}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Safety Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Share Your Location
              </h4>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Always share your live location with trusted contacts when traveling alone.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Trust Your Instincts
              </h4>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If something feels wrong, trust your instincts and take action immediately.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`fixed top-0 right-0 h-full w-64 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Menu
                </h3>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="space-y-2">
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/emergency"
                  className={`block px-3 py-2 rounded-md ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Emergency
                </Link>
                <Link
                  to="/journey"
                  className={`block px-3 py-2 rounded-md ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Journey Tracker
                </Link>
                <Link
                  to="/blogs"
                  className={`block px-3 py-2 rounded-md ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Safety Tips
                </Link>
                <Link
                  to="/settings"
                  className={`block px-3 py-2 rounded-md ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                  }`}
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
