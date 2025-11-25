import React from 'react';
import { motion } from 'framer-motion';
import { Clock, HeartHandshake, Utensils, Sparkles } from 'lucide-react';

export const Schedule: React.FC = () => {
  const events = [
    {
      time: "11:00",
      title: "證婚儀式",
      enTitle: "Ceremony",
      icon: <HeartHandshake className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-br from-purple-300 to-fuchsia-500"
    },
    {
      time: "12:00",
      title: "婚宴開席",
      enTitle: "Wedding Banquet",
      icon: <Utensils className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-br from-fuchsia-500 to-violet-600"
    },
    {
      time: "15:00",
      title: "圓滿結束",
      enTitle: "After Party / End",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-br from-violet-600 to-indigo-700"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto mb-12 px-4"
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white relative overflow-hidden">
         {/* Decorative Ribbon */}
         <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-200 to-transparent rounded-bl-full opacity-50 -mr-8 -mt-8"></div>

        <h2 className="text-3xl font-handwriting text-center text-purple-800 mb-10 flex flex-col items-center">
          <span className="mb-2">婚宴流程</span>
          <span className="font-script text-xl text-slate-500">Wedding Schedule</span>
        </h2>

        <div className="relative">
          {/* Vertical Line - Updated to Purple Gradient */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-300 via-violet-500 to-indigo-700"></div>

          <div className="space-y-10">
            {events.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-6 relative z-10"
              >
                {/* Icon Bubble */}
                <div className={`flex-shrink-0 w-14 h-14 ${event.color} rounded-full shadow-lg flex items-center justify-center border-4 border-white`}>
                  {event.icon}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/50 rounded-2xl p-4 shadow-sm border border-white hover:bg-white/80 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                    <span className="text-2xl font-bold text-slate-700 font-script">{event.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">{event.title}</h3>
                  <p className="text-slate-500 text-sm font-script">{event.enTitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};