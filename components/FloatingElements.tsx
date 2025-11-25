import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  // Generate random positions for floating elements
  const elements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    scale: 0.5 + Math.random() * 0.5,
    type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'circle'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-blue-200/40"
          initial={{ 
            left: `${el.x}%`, 
            top: -50, 
            opacity: 0 
          }}
          animate={{
            top: '110%',
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          style={{ scale: el.scale }}
        >
          {el.type === 'heart' ? (
            <Heart fill="currentColor" size={24} className="text-pink-200" />
          ) : el.type === 'sparkle' ? (
            <Sparkles size={20} className="text-amber-200" />
          ) : (
            <div className="w-3 h-3 rounded-full bg-white/60 blur-[1px]" />
          )}
        </motion.div>
      ))}
    </div>
  );
};