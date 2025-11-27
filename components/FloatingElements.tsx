import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Base Color: Milk White #F7F5EF is handled in index.html body, 
          but we overlay watercolor textures here */}

      {/* Mist Blue Watercolor Blob - Top Left */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[70vw] h-[60vh] bg-[#D3E0EF] rounded-full blur-[80px] opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ice Blue/Lavender Watercolor Blob - Bottom Right */}
      <motion.div
        className="absolute -bottom-[10%] -right-[10%] w-[80vw] h-[60vh] bg-[#E6E6FA] rounded-full blur-[100px] opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Light Gold Accent Blob - Middle Center (Subtle) */}
      <motion.div
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-[#F3EAD3] rounded-full blur-[90px] opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, x: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Paper Texture Overlay (Optional subtle grain) */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             filter: 'contrast(120%) brightness(100%)'
           }}>
      </div>
    </div>
  );
};