import React from 'react';
import { motion } from 'framer-motion';

export const Schedule: React.FC = () => {
  const events = [
    {
      time: "11:00",
      title: "證婚儀式",
      enTitle: "Ceremony",
      desc: "戶外證婚 / 交換誓詞"
    },
    {
      time: "12:00",
      title: "婚宴開席",
      enTitle: "Banquet",
      desc: "樹廈廳 / 享用佳餚"
    },
    {
      time: "15:00",
      title: "圓滿送客",
      enTitle: "Farewell",
      desc: "感謝蒞臨 / 合影留念"
    }
  ];

  return (
    <div className="flex flex-col items-center py-6 h-full">
      <h2 className="text-3xl font-script text-[#7C98B3] mb-2">Our Day</h2>
      <p className="text-xs text-[#A9B9D0] tracking-[0.2em] uppercase mb-12 font-serif">Wedding Schedule</p>

      <div className="relative pl-8 pr-4 w-full max-w-sm ml-4">
        {/* Timeline Line: Very thin Mist Blue line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[#D3E0EF]"></div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Dot: Milk white with blue border */}
              <div className="absolute -left-[26px] top-1.5 w-[15px] h-[15px] bg-[#F7F5EF] border border-[#A9B9D0] rounded-full z-10">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D3E0EF] rounded-full"></div>
              </div>

              <div className="flex flex-col items-start">
                <span className="font-script text-2xl text-[#D7C7A0] leading-none mb-1">{event.time}</span>
                <h3 className="text-lg font-rounded text-[#5F6F8C] tracking-widest font-medium">{event.title}</h3>
                <p className="text-xs font-serif text-[#A9B9D0] uppercase tracking-wider mb-2">{event.enTitle}</p>
                {/* Description: Changed to font-rounded to match title, and restored meaningful text */}
                <p className="text-sm font-rounded text-[#7C8DA6] font-normal opacity-90">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Garden Illustration Decor (CSS Simulation) */}
      <div className="mt-auto opacity-20 pt-8">
        <svg width="100" height="40" viewBox="0 0 100 40" className="stroke-[#5F6F8C] fill-none">
           <path d="M10,40 Q20,10 30,30 T50,20 T70,35 T90,15" strokeWidth="0.5" />
           <path d="M15,40 Q25,20 35,35" strokeWidth="0.5" />
           <path d="M60,40 Q70,25 80,40" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};