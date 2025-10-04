# Women Safety App 🛡️

A comprehensive React-based web application designed to enhance women's safety through modern technology and user-friendly features.

## 🌟 Features

### 🔐 Authentication System
- **Secure Signup & Login**: Complete user registration and authentication system
- **User Profile Management**: Personal information and emergency contact management
- **Session Management**: Persistent login sessions with localStorage

### 🚨 Emergency Features
- **SOS Button**: One-click emergency alert with 5-second countdown
- **Emergency Contacts**: Quick access to police (100), women helpline (1091), and personal contacts
- **Auto-dial Functionality**: Direct calling to emergency numbers
- **Location Sharing**: Automatic location sharing with emergency contacts

### 🗺️ Location & Journey Tracking
- **Real-time Location**: GPS-based current location tracking
- **Journey Planning**: Plan and track safe journeys from start to destination
- **Live Location Sharing**: Share real-time location with trusted contacts
- **OpenStreetMap Integration**: Interactive maps for location visualization

### 📱 User Interface
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Accessibility**: High contrast mode and reduced motion support

### 📚 Safety Resources
- **Safety Articles**: Curated collection of women's safety tips and articles
- **Self-Defense Tips**: Essential self-defense techniques and advice
- **Travel Safety**: Comprehensive travel safety guidelines
- **Digital Safety**: Online privacy and security tips

### ⚙️ Settings & Customization
- **Profile Management**: Update personal information and preferences
- **Emergency Contacts**: Add and manage emergency contacts
- **Notification Settings**: Customize app notifications
- **Theme Preferences**: Dark/light mode toggle

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd women-safety-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: OpenStreetMap integration
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📱 App Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Emergency.tsx    # Emergency SOS features
│   ├── JourneyTracker.tsx # Journey tracking
│   ├── Settings.tsx  # User settings
│   ├── SafetyBlogs.tsx # Safety articles
│   ├── Login.tsx       # Authentication
│   └── Signup.tsx      # User registration
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme management
└── App.tsx             # Main app component
```

## 🔧 Key Components

### Dashboard
- Quick access to all safety features
- Emergency number shortcuts
- Safety tips and status indicators
- Navigation to all app sections

### Emergency SOS
- One-click emergency activation
- 5-second countdown timer
- Automatic location sharing
- Direct calling to emergency services

### Journey Tracker
- Plan safe journeys
- Real-time location tracking
- Share location with contacts
- Journey history and status

### Safety Blogs
- Curated safety articles
- Search and filter functionality
- Categories: self-defense, travel safety, digital safety
- External article links

## 🌐 API Integration

### OpenStreetMap
- Interactive maps for location display
- GPS coordinate visualization
- Location sharing capabilities

### Emergency Services
- Direct calling to police (100)
- Women helpline (1091)
- Emergency services (108)

## 🎨 Design Features

### Color Scheme
- **Primary**: Pink (#ec4899) - Safety and empowerment
- **Success**: Green (#10b981) - Safe status
- **Warning**: Orange (#f59e0b) - Caution
- **Danger**: Red (#ef4444) - Emergency

### Typography
- **Font**: Inter - Modern, readable typeface
- **Responsive**: Scales across all device sizes

### Animations
- Smooth transitions and hover effects
- Loading states and feedback
- Accessibility-compliant animations

## 📱 Mobile Features

- **Touch-friendly**: Large buttons and touch targets
- **Responsive**: Works on phones, tablets, and desktops
- **Offline-ready**: Core features work without internet
- **Fast loading**: Optimized for mobile networks

## 🔒 Privacy & Security

- **Local Storage**: User data stored locally
- **No Tracking**: No user tracking or analytics
- **Secure**: HTTPS-ready for production
- **Privacy-first**: Minimal data collection

## 🚀 Deployment

### Environment Variables
```env
REACT_APP_API_URL=your_api_url
REACT_APP_MAP_API_KEY=your_map_api_key
```

### Build Commands
```bash
# Development
npm start

# Production build
npm run build

# Test
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Push notifications
- [ ] Voice commands
- [ ] AI-powered safety tips
- [ ] Community features
- [ ] Offline mode improvements
- [ ] Multi-language support

## 🙏 Acknowledgments

- OpenStreetMap for map services
- Lucide for beautiful icons
- React community for excellent tools
- Women's safety organizations for inspiration

---

**Stay Safe, Stay Strong! 💪**

*This app is designed to empower women with technology for their safety and security.*