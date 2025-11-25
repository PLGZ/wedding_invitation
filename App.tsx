import React from 'react';
import { FloatingElements } from './components/FloatingElements';
import { Intro } from './components/Intro';
import { RsvpForm } from './components/RsvpForm';
import { Schedule } from './components/Schedule';
import { Location } from './components/Location';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-[#f0f8ff] overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-50 via-purple-50 to-white z-0 pointer-events-none"></div>
      
      {/* Decorative Side Curtains/Gradients */}
      <div className="fixed inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-blue-100/30 to-transparent z-0 pointer-events-none"></div>
      <div className="fixed inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-purple-100/30 to-transparent z-0 pointer-events-none"></div>

      <FloatingElements />

      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        <Intro />
        
        <Schedule />

        <Location />

        <div className="w-full px-4 mb-20">
          <RsvpForm />
        </div>

        <footer className="w-full py-8 text-center text-slate-400 text-sm font-handwriting">
          <p>Designed with Love for the Happy Couple</p>
          <p>© 2026 Wedding Invitation</p>
        </footer>
      </main>

    </div>
  );
};

export default App;