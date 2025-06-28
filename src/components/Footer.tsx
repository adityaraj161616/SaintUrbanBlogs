
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Shop: ['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'],
    Company: ['About', 'Careers', 'Press', 'Sustainability'],
    Service: ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ'],
    Follow: ['Newsletter', 'Instagram', 'Twitter', 'Facebook']
  };

  return (
    <footer className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.h3 
              className="text-3xl font-light tracking-[0.3em] mb-8 uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Saint Urbain
            </motion.h3>
            <motion.p 
              className="text-gray-400 font-light leading-relaxed mb-10 max-w-md text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Elevating style through timeless design and exceptional craftsmanship. Join us in redefining contemporary fashion.
            </motion.p>
            
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[Instagram, Twitter, Facebook, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (categoryIndex + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="font-light mb-6 tracking-[0.1em] uppercase text-lg">{category}</h4>
              <ul className="space-y-4">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 font-light text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div 
          className="border-t border-gray-800 pt-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h4 className="font-light mb-4 tracking-[0.1em] uppercase text-lg">Stay Informed</h4>
              <p className="text-gray-400 font-light text-lg">Subscribe to receive our latest collections and exclusive offers</p>
            </div>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="bg-transparent border border-gray-800 px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-200 min-w-[300px]"
              />
              <motion.button 
                className="bg-white text-black px-8 py-4 font-light hover:bg-gray-200 transition-colors duration-200 tracking-[0.1em] uppercase"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-800 pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-gray-400 font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 Saint Urbain. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
