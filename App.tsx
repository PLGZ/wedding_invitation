import React, { useState } from 'react';
import { FloatingElements } from './components/FloatingElements';
import { Intro } from './components/Intro';
import { RsvpForm } from './components/RsvpForm';
import { Schedule } from './components/Schedule';
import { Location } from './components/Location';
import { Home, CalendarDays, MapPin, Mail, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'schedule' | 'location' | 'rsvp'>('intro');

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return <Intro />;
      case 'schedule':
        return <Schedule />;
      case 'location':
        return <Location />;
      case 'rsvp':
        return <RsvpForm />;
      default:
        return <Intro />;
    }
  };

  const NavButton = ({ tab, icon: Icon, label }: { tab: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center w-full py-3 transition-all duration-300 relative ${
        activeTab === tab ? 'text-[#7C98B3]' : 'text-[#C6C8CC] hover:text-[#A9B9D0]'
      }`}
    >
      <Icon size={20} strokeWidth={1.5} />
      <span className="text-[10px] mt-1 tracking-wider font-rounded">{label}</span>
      {activeTab === tab && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute top-0 w-8 h-[2px] bg-[#A9B9D0] rounded-full"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F7F5EF] text-[#5F6F8C]">
      
      {/* Background Watercolor Effects */}
      <FloatingElements />

      <main className="relative z-10 w-full h-[calc(100vh-80px)] max-w-md mx-auto flex flex-col pt-4 px-4 pb-2">
        {/* Card Container */}
        <div className="flex-1 bg-white/40 backdrop-blur-sm rounded-[2px] shadow-sm border border-[#fff] relative overflow-y-auto overflow-x-hidden p-1">
          {/* Inner fine border for that "Card" look */}
          <div className="min-h-full border border-[#D3E0EF] rounded-[2px] bg-white/30 p-4 md:p-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#F7F5EF]/90 backdrop-blur-md border-t border-[#E6E6FA] z-50 h-[80px]">
        <div className="max-w-md mx-auto flex justify-between px-2">
          <NavButton tab="intro" icon={Home} label="邀請" />
          <NavButton tab="schedule" icon={CalendarDays} label="流程" />
          <NavButton tab="location" icon={MapPin} label="交通" />
          <NavButton tab="rsvp" icon={Mail} label="回函" />
        </div>
      </div>

    </div>
  );
};

export default App;