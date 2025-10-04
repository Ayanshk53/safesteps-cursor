import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Play,
  Pause,
  Square,
  CheckCircle,
  AlertTriangle,
  Phone,
  Users
} from 'lucide-react';

interface Journey {
  id: string;
  startLocation: string;
  endLocation: string;
  startTime: Date;
  estimatedDuration: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  currentLocation?: { lat: number; lng: number };
}

const JourneyTracker: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [currentJourney, setCurrentJourney] = useState<Journey | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [newJourney, setNewJourney] = useState({
    startLocation: '',
    endLocation: '',
    estimatedDuration: 30
  });
  const [showNewJourney, setShowNewJourney] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Load saved journeys from localStorage
    const savedJourneys = localStorage.getItem('journeys');
    if (savedJourneys) {
      setJourneys(JSON.parse(savedJourneys));
    }
  }, []);

  useEffect(() => {
    if (isTracking && currentJourney) {
      const interval = setInterval(() => {
        getCurrentLocation();
      }, 30000); // Update location every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isTracking, currentJourney]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          
          if (currentJourney) {
            const updatedJourney = {
              ...currentJourney,
              currentLocation: newLocation
            };
            setCurrentJourney(updatedJourney);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const startNewJourney = () => {
    if (!newJourney.startLocation || !newJourney.endLocation) {
      alert('Please fill in both start and end locations');
      return;
    }

    const journey: Journey = {
      id: Date.now().toString(),
      startLocation: newJourney.startLocation,
      endLocation: newJourney.endLocation,
      startTime: new Date(),
      estimatedDuration: newJourney.estimatedDuration,
      status: 'active'
    };

    setCurrentJourney(journey);
    setIsTracking(true);
    setShowNewJourney(false);
    setNewJourney({ startLocation: '', endLocation: '', estimatedDuration: 30 });
    
    // Save to localStorage
    const updatedJourneys = [...journeys, journey];
    setJourneys(updatedJourneys);
    localStorage.setItem('journeys', JSON.stringify(updatedJourneys));
    
    getCurrentLocation();
  };

  const stopJourney = () => {
    if (currentJourney) {
      const updatedJourney = { ...currentJourney, status: 'completed' as const };
      const updatedJourneys = journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      );
      
      setJourneys(updatedJourneys);
      setCurrentJourney(null);
      setIsTracking(false);
      localStorage.setItem('journeys', JSON.stringify(updatedJourneys));
    }
  };

  const cancelJourney = () => {
    if (currentJourney) {
      const updatedJourney = { ...currentJourney, status: 'cancelled' as const };
      const updatedJourneys = journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      );
      
      setJourneys(updatedJourneys);
      setCurrentJourney(null);
      setIsTracking(false);
      localStorage.setItem('journeys', JSON.stringify(updatedJourneys));
    }
  };

  const sendLocationToContacts = () => {
    if (location) {
      const message = `I'm currently at: https://maps.google.com/?q=${location.lat},${location.lng}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const callEmergency = () => {
    window.open('tel:100');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
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
              <Navigation className="h-8 w-8 text-blue-500" />
              <h1 className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Journey Tracker
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Current Journey Status */}
        {currentJourney && (
          <div className={`px-4 py-6 sm:px-0 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Current Journey
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
              }`}>
                {isTracking ? 'Active' : 'Paused'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  From
                </div>
                <div className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentJourney.startLocation}
                </div>
              </div>
              <div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  To
                </div>
                <div className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentJourney.endLocation}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Started at {formatTime(currentJourney.startTime)}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={sendLocationToContacts}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Share Location
                </button>
                <button
                  onClick={callEmergency}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button
                onClick={stopJourney}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Journey
              </button>
              <button
                onClick={cancelJourney}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
              >
                <Square className="h-4 w-4 mr-2" />
                Cancel Journey
              </button>
            </div>
          </div>
        )}

        {/* New Journey Form */}
        {!currentJourney && (
          <div className={`px-4 py-6 sm:px-0 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Plan New Journey
              </h2>
              <button
                onClick={() => setShowNewJourney(!showNewJourney)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                {showNewJourney ? 'Cancel' : 'New Journey'}
              </button>
            </div>
            
            {showNewJourney && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Start Location
                  </label>
                  <input
                    type="text"
                    value={newJourney.startLocation}
                    onChange={(e) => setNewJourney({...newJourney, startLocation: e.target.value})}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter starting point"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Destination
                  </label>
                  <input
                    type="text"
                    value={newJourney.endLocation}
                    onChange={(e) => setNewJourney({...newJourney, endLocation: e.target.value})}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter destination"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Estimated Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newJourney.estimatedDuration}
                    onChange={(e) => setNewJourney({...newJourney, estimatedDuration: parseInt(e.target.value)})}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    min="1"
                    max="300"
                  />
                </div>
                
                <button
                  onClick={startNewJourney}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Start Journey
                </button>
              </div>
            )}
          </div>
        )}

        {/* Journey History */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Journey History
          </h3>
          
          {journeys.length === 0 ? (
            <div className={`text-center py-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No journeys recorded yet
            </div>
          ) : (
            <div className="space-y-4">
              {journeys.map((journey) => (
                <div
                  key={journey.id}
                  className={`p-4 rounded-lg border ${
                    isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {journey.startLocation} → {journey.endLocation}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {formatTime(journey.startTime)}
                        </span>
                        <span className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {journey.estimatedDuration} min
                        </span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getStatusColor(journey.status)
                    } text-white`}>
                      {journey.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JourneyTracker;
