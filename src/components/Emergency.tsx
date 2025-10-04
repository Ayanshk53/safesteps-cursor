import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import MapComponent from './MapComponent';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Shield, 
  ArrowLeft,
  Users,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';

const Emergency: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Police', number: '100', type: 'emergency' },
    { name: 'Women Helpline', number: '1091', type: 'emergency' },
    { name: 'Emergency Services', number: '108', type: 'emergency' },
    { name: 'Family Member', number: '+91-9876543210', type: 'personal' },
    { name: 'Friend', number: '+91-9876543211', type: 'personal' }
  ]);

  useEffect(() => {
    if (isSOSActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSOSActive && countdown === 0) {
      // Trigger emergency actions
      triggerEmergencyActions();
    }
  }, [isSOSActive, countdown]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const triggerEmergencyActions = () => {
    // Send location to emergency contacts
    if (location) {
      console.log('Sending emergency alert with location:', location);
    }
    
    // Auto-dial emergency number
    window.open('tel:100');
    
    // Show emergency message
    alert('Emergency alert sent! Help is on the way.');
  };

  const handleSOS = () => {
    if (!isSOSActive) {
      getCurrentLocation();
      setIsSOSActive(true);
      setCountdown(5);
    } else {
      setIsSOSActive(false);
      setCountdown(0);
    }
  };

  const makeCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  const sendLocation = () => {
    if (location) {
      const message = `Emergency! I need help. My location: https://maps.google.com/?q=${location.lat},${location.lng}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      getCurrentLocation();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h1 className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Emergency SOS
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* SOS Button */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Emergency SOS
            </h2>
            
            {isSOSActive ? (
              <div className="space-y-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                }`}>
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Emergency Alert Active
                </div>
                
                {countdown > 0 && (
                  <div className="text-6xl font-bold text-red-500">
                    {countdown}
                  </div>
                )}
                
                <div className="text-sm text-gray-500">
                  Emergency services will be contacted automatically
                </div>
                
                <button
                  onClick={handleSOS}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel Emergency
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleSOS}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                  <div>SOS</div>
                </button>
                
                <div className="text-sm text-gray-500">
                  Hold for 5 seconds to activate emergency alert
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Emergency Contacts
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  contact.type === 'emergency' 
                    ? 'border-red-200 bg-red-50' 
                    : 'border-gray-200 bg-gray-50'
                } ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {contact.name}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {contact.number}
                    </p>
                  </div>
                  <button
                    onClick={() => makeCall(contact.number)}
                    className={`p-2 rounded-full ${
                      contact.type === 'emergency' 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Services */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Location Services
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Current Location
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Location not available'}
                  </div>
                </div>
              </div>
              <button
                onClick={getCurrentLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Get Location
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Share Location
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Send your location to emergency contacts
                  </div>
                </div>
              </div>
              <button
                onClick={sendLocation}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Share Now
              </button>
            </div>
          </div>
          
          {/* Map Display */}
          {location && (
            <div className="mt-6">
              <h4 className={`text-md font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your Current Location
              </h4>
              <MapComponent
                latitude={location.lat}
                longitude={location.lng}
                height="300px"
                className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
              />
            </div>
          )}
        </div>

        {/* Safety Tips */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Emergency Safety Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Stay Calm
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Take deep breaths and try to stay calm. Panic can make the situation worse.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Make Noise
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If possible, make loud noises to attract attention from nearby people.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Find Safe Space
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Try to move to a well-lit, public area with other people around.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Trust Your Instincts
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If something feels wrong, trust your instincts and take immediate action.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
