import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  BookOpen, 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  User,
  Shield,
  AlertTriangle,
  Heart,
  Eye,
  Search,
  Filter
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  source: string;
  sourceUrl: string;
  tags: string[];
}

const SafetyBlogs: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const categories = [
    'all',
    'self-defense',
    'travel-safety',
    'digital-safety',
    'emergency-preparedness',
    'mental-health',
    'legal-rights'
  ];

  useEffect(() => {
    // Mock blog data - in a real app, this would be fetched from an API
    const mockBlogs: BlogPost[] = [
      {
        id: '1',
        title: 'Essential Self-Defense Techniques Every Woman Should Know',
        excerpt: 'Learn basic self-defense moves that can help you protect yourself in dangerous situations.',
        content: 'Self-defense is not about being aggressive, but about being prepared and confident. Here are some essential techniques...',
        author: 'Sarah Johnson',
        publishDate: '2024-01-15',
        readTime: '5 min read',
        category: 'self-defense',
        imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500',
        source: 'Women Safety Network',
        sourceUrl: 'https://example.com/self-defense',
        tags: ['self-defense', 'safety', 'empowerment']
      },
      {
        id: '2',
        title: 'Travel Safety Tips for Solo Female Travelers',
        excerpt: 'Comprehensive guide to staying safe while traveling alone as a woman.',
        content: 'Traveling solo can be incredibly empowering, but it requires extra precautions...',
        author: 'Maria Rodriguez',
        publishDate: '2024-01-10',
        readTime: '8 min read',
        category: 'travel-safety',
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
        source: 'Safe Travel Guide',
        sourceUrl: 'https://example.com/travel-safety',
        tags: ['travel', 'safety', 'solo-travel']
      },
      {
        id: '3',
        title: 'Digital Safety: Protecting Yourself Online',
        excerpt: 'Learn how to protect your privacy and safety in the digital world.',
        content: 'In today\'s digital age, online safety is just as important as physical safety...',
        author: 'Dr. Lisa Chen',
        publishDate: '2024-01-05',
        readTime: '6 min read',
        category: 'digital-safety',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500',
        source: 'Cyber Safety Institute',
        sourceUrl: 'https://example.com/digital-safety',
        tags: ['digital-safety', 'privacy', 'cybersecurity']
      },
      {
        id: '4',
        title: 'Emergency Preparedness: What Every Woman Should Have',
        excerpt: 'Essential items and knowledge for emergency situations.',
        content: 'Being prepared for emergencies can make all the difference in a crisis...',
        author: 'Jennifer Smith',
        publishDate: '2024-01-01',
        readTime: '7 min read',
        category: 'emergency-preparedness',
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6b5?w=500',
        source: 'Emergency Preparedness Guide',
        sourceUrl: 'https://example.com/emergency-prep',
        tags: ['emergency', 'preparedness', 'safety-kit']
      },
      {
        id: '5',
        title: 'Mental Health and Safety: Building Resilience',
        excerpt: 'How mental health affects your safety and how to build resilience.',
        content: 'Mental health is a crucial component of personal safety...',
        author: 'Dr. Amanda Wilson',
        publishDate: '2023-12-28',
        readTime: '9 min read',
        category: 'mental-health',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
        source: 'Mental Health & Safety',
        sourceUrl: 'https://example.com/mental-health',
        tags: ['mental-health', 'resilience', 'wellbeing']
      },
      {
        id: '6',
        title: 'Know Your Rights: Legal Protection for Women',
        excerpt: 'Understanding your legal rights and protections as a woman.',
        content: 'Knowledge of your legal rights is a powerful tool for protection...',
        author: 'Attorney Rebecca Davis',
        publishDate: '2023-12-20',
        readTime: '10 min read',
        category: 'legal-rights',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500',
        source: 'Women\'s Legal Center',
        sourceUrl: 'https://example.com/legal-rights',
        tags: ['legal-rights', 'law', 'protection']
      }
    ];

    setBlogs(mockBlogs);
    setFilteredBlogs(mockBlogs);
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, blogs]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'self-defense': 'bg-red-500',
      'travel-safety': 'bg-blue-500',
      'digital-safety': 'bg-purple-500',
      'emergency-preparedness': 'bg-orange-500',
      'mental-health': 'bg-green-500',
      'legal-rights': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
              <BookOpen className="h-8 w-8 text-green-500" />
              <h1 className={`ml-2 text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Safety Tips & Articles
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className={`px-4 py-6 sm:px-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2 border ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer`}
              onClick={() => setSelectedBlog(blog)}
            >
              {blog.imageUrl && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(blog.category)}`}>
                    {getCategoryName(blog.category)}
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {blog.readTime}
                  </span>
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {blog.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {blog.author}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(blog.sourceUrl, '_blank');
                    }}
                    className="text-green-500 hover:text-green-600 flex items-center text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className={`text-center py-12 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No articles found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedBlog.title}
                </h2>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedBlog.author}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedBlog.readTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {new Date(selectedBlog.publishDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className={`prose max-w-none ${
                isDarkMode ? 'prose-invert' : ''
              }`}>
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedBlog.content}
                </p>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => window.open(selectedBlog.sourceUrl, '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyBlogs;
