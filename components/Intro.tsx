import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE_PHOTO_URL } from '../constants';
import { UserRound } from 'lucide-react';

export const Intro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[600px] py-4">
      
      {/* Decorative Top Ornament (CSS only) */}
      <div className="w-24 h-px bg-[#A9B9D0] mb-2 relative">
         <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 border border-[#A9B9D0] rotate-45 bg-[#F7F5EF]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6 w-full"
      >
        <p className="font-script text-2xl text-[#A9B9D0]">Wedding Invitation</p>

        {/* Photo Area - Clean, rectangular, fine border */}
        <div className="relative mx-auto w-4/5 aspect-[3/4] p-2 border border-[#D3E0EF]">
           <div className="absolute inset-0 m-1 border border-[#A9B9D0] opacity-30 pointer-events-none"></div>
           <div className="w-full h-full overflow-hidden bg-[#F0F4F8]">
              <img 
                src={"https://i.meee.com.tw/91GLGhj.jpg"} 
                alt="Couple" 
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 grayscale-[20%]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop";
                }}
              />
           </div>
           {/* Minimal Corner Decors */}
           <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#A9B9D0]"></div>
           <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#A9B9D0]"></div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-center gap-6 text-[#5F6F8C]">
            <div className="text-center">
               <p className="text-xl font-rounded tracking-widest mb-1">莊家琦</p>
               <p className="text-xs font-serif text-[#9CA3AF] uppercase tracking-wide">Chuang Chia-Chi</p>
            </div>
            <span className="font-script text-xl text-[#D7C7A0]">&</span>
            <div className="text-center">
               <p className="text-xl font-rounded tracking-widest mb-1">林嘉展</p>
               <p className="text-xs font-serif text-[#9CA3AF] uppercase tracking-wide">Lin Jia-Jhan</p>
            </div>
          </div>

          <div className="py-6">
            <h1 className="font-script text-5xl text-[#7C98B3] font-normal tracking-wide">
              2026.01.17
            </h1>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] tracking-widest font-serif">
               <span>SATURDAY</span>
            </div>
          </div>

          <p className="font-serif text-[#5F6F8C] text-sm leading-loose tracking-wide max-w-xs mx-auto">
            誠摯邀請您前來<br/>
            參與這份溫柔的喜悅
          </p>
        </div>

      </motion.div>

      {/* Decorative Bottom */}
      <div className="w-24 h-px bg-[#A9B9D0] mt-8 relative">
         <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 border border-[#A9B9D0] rotate-45 bg-[#F7F5EF]"></div>
      </div>
    </div>
  );
};