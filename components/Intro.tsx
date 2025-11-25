
import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE_PHOTO_URL } from '../constants';
import { Calendar, Heart } from 'lucide-react';

export const Intro: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center pt-10 pb-6 px-4">
      
      {/* Photo Frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative p-3 bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl rotate-[-2deg] mb-8 max-w-md w-full"
      >
        <div className="absolute -top-4 -right-4 text-purple-300 z-20">
            <Heart fill="#d8b4fe" size={40} className="drop-shadow-md animate-bounce" />
        </div>
        
        {/* Ribbon effect CSS - Updated to Purple theme */}
        <div className="absolute top-0 left-0 w-full h-full border-2 border-purple-200 rounded-2xl pointer-events-none m-1"></div>

        <div className="overflow-hidden rounded-xl aspect-[4/3] bg-purple-50">
             {/* The image source is now pulled directly from constants.ts */}
             <img 
               src={"https://i.meee.com.tw/91GLGhj.jpg"} 
               alt="Happy Couple" 
               className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               onError={(e) => {
                 // Fallback if image fails to load
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop";
               }}
             />
        </div>
      </motion.div>

      {/* Text Content - Updated to Purple Gradient Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 text-purple-500 mb-2">
           <Calendar size={20} />
           <span className="font-script text-2xl font-bold">Save the Date</span>
        </div>

        <h1 className="font-script text-5xl md:text-6xl bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm mb-2 pb-2">
          2026.01.17
        </h1>

        <p className="font-handwriting text-2xl md:text-3xl text-purple-900/80 leading-relaxed max-w-md mx-auto font-medium">
          誠摯邀請您前來<br/>
          一起分享我們的喜悅
        </p>

        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mt-6 rounded-full"></div>
      </motion.div>
    </div>
  );
};
