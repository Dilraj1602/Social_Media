import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Search, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Instagram className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-white">Influencer Analytics</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search influencers..."
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/analytics" className="text-gray-300 hover:text-white transition-colors">
              Analytics
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;