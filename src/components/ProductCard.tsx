
import React from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div 
      className="product-card group cursor-pointer"
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-8">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700" />
        
        {/* Overlay text on hover */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <span className="text-white text-lg font-light tracking-[0.2em] uppercase bg-black/30 px-8 py-3 backdrop-blur-sm">
            Découvrir
          </span>
        </motion.div>
      </div>
      
      <div className="space-y-3 text-center">
        <h3 className="text-lg font-light text-black group-hover:text-gray-700 transition-colors duration-300 tracking-[0.1em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
          {product.name}
        </h3>
        <p className="text-gray-500 font-light text-base tracking-wide">
          {product.price}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
