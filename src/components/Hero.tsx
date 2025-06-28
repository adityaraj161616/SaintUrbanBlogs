
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Title animation
      tl.fromTo(titleRef.current,
        { 
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Subtitle animation
      tl.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.6"
      );

      // CTA buttons animation
      tl.fromTo(".hero-cta",
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        },
        "-=0.4"
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionClass: string) => {
    const element = document.querySelector(`.${sectionClass}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section ref={heroRef} className="relative h-screen bg-white overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful writing space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-6xl mx-auto px-8">
          <h1 
            ref={titleRef}
            className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[0.9] tracking-[-0.03em] mb-8 opacity-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Saint Urbain Journal
          </h1>
          
          <div 
            ref={subtitleRef}
            className="hero-subtitle space-y-6 opacity-0"
          >
            <p className="text-xl md:text-2xl font-light tracking-[0.15em] uppercase">
              Where Stories Come Alive
            </p>
            <div className="w-24 h-px bg-white mx-auto opacity-60"></div>
            <p className="text-lg font-light max-w-2xl mx-auto leading-relaxed tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              Discover compelling stories, share your thoughts, and join a community of passionate writers and readers from around the world.
            </p>
          </div>

          <motion.div className="mt-16 space-x-6">
            <button 
              onClick={() => scrollToSection('animate-section')}
              className="hero-cta border border-white/30 bg-white/10 backdrop-blur-sm text-white px-12 py-4 font-light tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-500 uppercase opacity-0"
            >
              Explore Articles
            </button>
            <button 
              onClick={() => scrollToSection('animate-section')}
              className="hero-cta bg-transparent border border-white/50 text-white px-12 py-4 font-light tracking-[0.2em] text-sm hover:bg-white/20 transition-all duration-500 uppercase opacity-0"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-white/50 relative">
          <motion.div
            className="w-px h-8 bg-white absolute top-0"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="text-white/70 text-xs tracking-widest mt-4 uppercase">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
