import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about') as HTMLElement;
    if (aboutSection) {
      const headerOffset = 80;
      const elementPosition = aboutSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => navigate('/')}
            className={`text-2xl font-light tracking-[0.3em] transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            SAINT URBAIN
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-light tracking-[0.2em] uppercase transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => navigate('/create')}
              className={`text-sm font-light tracking-[0.2em] uppercase transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Write
            </button>
            
            <button
              onClick={handleAboutClick}
              className={`text-sm font-light tracking-[0.2em] uppercase transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-black' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              About
            </button>

            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={16} />
                  <span className="text-sm font-medium">Account</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Signed in as</p>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={() => navigate('/auth')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={16} />
                <span>Join Us</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
