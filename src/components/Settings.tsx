import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Bell,
  Moon,
  Sun,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit,
  Check
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const Settings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(
    user?.emergencyContacts || []
  );
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [showAddContact, setShowAddContact] = useState(false);
  const [notifications, setNotifications] = useState({
    locationSharing: true,
    emergencyAlerts: true,
    journeyUpdates: true,
    safetyTips: true
  });

  const handleSave = () => {
    updateUser(userData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact
      };
      const updatedContacts = [...emergencyContacts, contact];
      setEmergencyContacts(updatedContacts);
      updateUser({ emergencyContacts: updatedContacts });
      setNewContact({ name: '', phone: '', relationship: '' });
      setShowAddContact(false);
    }
  };

  const removeEmergencyContact = (id: string) => {
    const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
    setEmergencyContacts(updatedContacts);
    updateUser({ emergencyContacts: updatedContacts });
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
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
              <SettingsIcon className="h-8 w-8 text-purple-500" />
              <h1 className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile Settings */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Profile Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Phone Number
              </label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50`}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Emergency Contacts
            </h2>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </button>
          </div>
          
          {showAddContact && (
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            } mb-4`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g., Family, Friend"
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={addEmergencyContact}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Add Contact
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {contact.name}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {contact.phone} • {contact.relationship}
                    </div>
                  </div>
                  <button
                    onClick={() => removeEmergencyContact(contact.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {emergencyContacts.length === 0 && (
              <div className={`text-center py-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No emergency contacts added yet
              </div>
            )}
          </div>
        </div>

        {/* App Settings */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            App Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-gray-400 mr-3" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-400 mr-3" />
                )}
                <div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Dark Mode
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Toggle dark/light theme
                  </div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Notification Settings
          </h2>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => updateNotificationSetting(key, !value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Account Actions
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
