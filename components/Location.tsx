import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car, Bus, Sparkles } from 'lucide-react';

export const Location: React.FC = () => {
  // New address encoding for Google Maps
  const address = "338桃園市蘆竹區南崁路46號";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto mb-12 px-4"
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white">
        
        <h2 className="text-3xl font-handwriting text-center text-purple-800 mb-8 flex flex-col items-center">
          <span className="mb-2">地點與交通</span>
          <span className="font-script text-xl text-slate-500">Location & Traffic</span>
        </h2>

        {/* Venue Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">青青格麗絲莊園 樹廈廳</h3>
          <p className="text-slate-600 flex items-center justify-center gap-2">
            <MapPin size={18} className="text-amber-500" />
            {address}
          </p>
        </div>

        {/* Map */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-8">
          <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>

        {/* Transportation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3 text-blue-800">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Car size={20} />
              </div>
              <h4 className="font-bold text-lg">自行開車 (Driving)</h4>
            </div>
            <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>導航請設定「桃園市蘆竹區南崁路46號」。</li>
              <li>周邊設有停車場，請留意現場標示。</li>
            </ul>
          </div>

          <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-3 mb-3 text-purple-800">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Bus size={20} />
              </div>
              <h4 className="font-bold text-lg">大眾運輸 (Public Transport)</h4>
            </div>
            <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>鄰近公車站牌，請查詢往「南崁」方向之公車。</li>
              <li>若搭乘機場捷運，可至鄰近站點轉乘計程車。</li>
            </ul>
          </div>

        </div>

        <div className="mt-6 text-center">
            <a 
              href={externalMapUrl}
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold border-b-2 border-amber-200 hover:border-amber-400 transition-colors pb-1"
            >
              開啟 Google Maps 導航 <Sparkles size={16} />
            </a>
        </div>

      </div>
    </motion.div>
  );
};