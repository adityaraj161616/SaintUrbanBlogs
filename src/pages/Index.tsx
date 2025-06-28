
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import BlogList from '../components/BlogList';
import About from '../components/About';
import Footer from '../components/Footer';
import ScrollAnimationProvider from '../components/ScrollAnimationProvider';
import { useToast } from '../hooks/use-toast';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Show welcome message for exactly 1 second when user logs in
  useEffect(() => {
    if (user && !hasShownWelcome) {
      setShowWelcome(true);
      setHasShownWelcome(true);
      
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, hasShownWelcome]);

  // Initialize page load state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade in animation for the container
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Animate sections on scroll
      const sections = gsap.utils.toArray(".animate-section");
      sections.forEach((section: any) => {
        gsap.fromTo(section,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: "tween" as const,
    duration: 0.5
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollAnimationProvider>
      <motion.div 
        ref={containerRef} 
        className="min-h-screen bg-white"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Navigation />
        <Hero />
        
        <div className="animate-section">
          <BlogList />
        </div>
        
        <div className="animate-section">
          <About />
        </div>
        
        {/* Welcome Message */}
        <AnimatePresence>
          {showWelcome && user && (
            <motion.div
              className="fixed top-8 right-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-4 shadow-2xl z-50 max-w-sm"
              initial={{ opacity: 0, scale: 0, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: 100 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">Welcome back!</p>
                  <p className="text-sm opacity-90">{user.email}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced Floating Create Button */}
        <AnimatePresence>
          {user && (
            <motion.div
              className="fixed bottom-8 right-8 z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: 1 
              }}
            >
              <motion.button
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Edit3 size={24} />
                </motion.div>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  Write New Article
                </motion.div>

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-black to-gray-800 animate-ping opacity-20"></div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </motion.div>
    </ScrollAnimationProvider>
  );
};

export default Index;
