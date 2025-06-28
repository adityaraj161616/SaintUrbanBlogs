
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, BookOpen, Globe, Award, Heart, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      heroTl.from(".about-hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(".about-hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .from(".about-hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

      // Values section animations
      gsap.from(".value-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Timeline animations
      gsap.from(".timeline-item", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Parallax background shapes
      gsap.utils.toArray('.floating-shape').forEach((shape: any, i) => {
        gsap.to(shape, {
          y: -100 + (i * 20),
          rotation: 360,
          duration: 20 + (i * 5),
          repeat: -1,
          ease: "none"
        });
      });

      // Stats counter animation
      const statNumbers = document.querySelectorAll('.stat-counter');
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        
        ScrollTrigger.create({
          trigger: stat,
          start: "top 80%",
          onEnter: () => {
            gsap.from({ val: 0 }, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                const current = Math.round(this.targets()[0].val);
                if (target >= 1000) {
                  stat.textContent = `${(current / 1000).toFixed(1)}K+`;
                } else {
                  stat.textContent = `${current}+`;
                }
              }
            });
          }
        });
      });

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} id="about" className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-shape absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl"></div>
        <div className="floating-shape absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-lg"></div>
        <div className="floating-shape absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
        <div className="floating-shape absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"></div>
      </div>

      {/* Hero Section */}
      <div ref={heroSectionRef} className="relative py-32 px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h1 className="about-hero-title text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[-0.04em] text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              About Us
            </h1>
            <p className="about-hero-subtitle text-2xl md:text-3xl font-light text-slate-600 mb-8 tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              Crafting Stories That Matter
            </p>
            <div className="about-hero-description max-w-4xl mx-auto">
              <p className="text-xl font-light text-slate-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Saint Urbain Journal isn't just a platform—it's a movement. We believe in the transformative power of storytelling, 
                where every word has the potential to inspire, educate, and connect hearts across the globe.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                To democratize storytelling by providing a platform where voices from all walks of life can share their experiences, 
                insights, and creativity with a global audience. We're building bridges between cultures, generations, and perspectives 
                through the universal language of well-crafted narratives.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Passion-Driven</h3>
                  <p className="text-slate-600">Every story matters, every voice counts</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="stat-counter text-4xl font-bold text-blue-600" data-target="50000">0</div>
                  <p className="text-slate-600 font-medium">Active Writers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div ref={valuesRef} className="py-24 px-8 lg:px-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen size={32} />,
                title: "Quality Content",
                description: "We champion well-researched, thoughtfully written content that adds value to our readers' lives.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Users size={32} />,
                title: "Community First",
                description: "Our platform thrives on the diverse perspectives and experiences of our global community.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Globe size={32} />,
                title: "Global Reach",
                description: "Breaking down barriers to connect storytellers and readers from every corner of the world.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Award size={32} />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from platform design to content curation.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: <Zap size={32} />,
                title: "Innovation",
                description: "Constantly evolving our platform with cutting-edge features to enhance the writing experience.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Heart size={32} />,
                title: "Authenticity",
                description: "We celebrate authentic voices and encourage writers to share their genuine perspectives.",
                color: "from-pink-500 to-rose-500"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="value-card group"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-slate-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div ref={timelineRef} className="py-24 px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Journey
            </h2>
            <p className="text-xl text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Milestones that shaped our story
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                year: "2019",
                title: "The Beginning",
                description: "Started as a small blog with a vision to democratize storytelling and give voice to unheard stories."
              },
              {
                year: "2020",
                title: "Community Growth",
                description: "Reached our first 1,000 writers and launched our collaborative writing features during the global shift to digital."
              },
              {
                year: "2022",
                title: "Global Expansion",
                description: "Expanded to serve writers in 50+ countries with multi-language support and cultural content initiatives."
              },
              {
                year: "2024",
                title: "Innovation Era",
                description: "Launched AI-powered writing tools, advanced analytics, and our revolutionary community mentorship program."
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className="timeline-item flex items-start space-x-8"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {milestone.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 px-8 lg:px-12 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join Our Story
            </h2>
            <p className="text-xl mb-12 leading-relaxed opacity-90" style={{ fontFamily: "'Inter', sans-serif" }}>
              Be part of a community that believes in the power of words to change the world. 
              Your story is waiting to be told, and we're here to help you tell it.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                className="bg-white text-slate-900 px-12 py-4 rounded-full font-medium text-lg hover:bg-slate-100 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Writing Today
              </motion.button>
              <motion.button 
                className="border-2 border-white/50 text-white px-12 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Stories
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
