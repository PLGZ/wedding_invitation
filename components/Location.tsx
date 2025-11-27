import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

export const Location: React.FC = () => {
  const address = "338桃園市蘆竹區南崁路46號";
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="flex flex-col items-center py-6 h-full overflow-y-auto">
      <h2 className="text-3xl font-script text-[#7C98B3] mb-2">Venue</h2>
      <p className="text-xs text-[#A9B9D0] tracking-[0.2em] uppercase mb-8 font-serif">Location & Access</p>

      <div className="w-full space-y-8 px-2">
        
        {/* Venue Title */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-rounded text-[#5F6F8C] tracking-widest font-medium">青青格麗絲莊園</h3>
          <p className="text-sm font-serif text-[#9CA3AF]">樹廈廳</p>
          <a 
            href={externalMapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#D7C7A0] border-b border-[#D7C7A0] pb-0.5 hover:text-[#bfa975] transition-colors mt-1"
          >
            <MapPin size={12} />
            {address}
          </a>
        </div>

        {/* Minimal Map Frame */}
        <div className="w-full aspect-[16/9] border border-[#D3E0EF] p-1 bg-white">
           <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0, opacity: 0.8 }} 
            allowFullScreen 
            loading="lazy" 
            title="Location Map"
            className="grayscale-[20%]"
          ></iframe>
        </div>

        {/* Info Blocks - Clean Text, No Backgrounds */}
        <div className="space-y-6">
          <Section title="自行開車 DRIVE">
            <ul className="list-none space-y-3 text-sm font-serif text-[#7C8DA6] leading-relaxed">
              <li>
                <span className="text-[#A9B9D0] text-xs uppercase tracking-wider block mb-1">Southbound 南下</span>
                中山高 ➜ 桃園南崁交流道 ➜ 右側新南路一段 ➜ 右轉南華一街 ➜ 左轉南崁路
              </li>
              <li>
                <span className="text-[#A9B9D0] text-xs uppercase tracking-wider block mb-1">Northbound 北上</span>
                中山高 ➜ 桃園南崁交流道 ➜ 左轉中正路 ➜ 新南路一段 ➜ 右轉南華一街 ➜ 左轉南崁路
              </li>
            </ul>
          </Section>

          <Section title="大眾運輸 PUBLIC TRANSIT">
            <div className="text-sm font-serif text-[#7C8DA6] space-y-3 leading-relaxed">
               <p>
                 <strong className="font-medium text-[#5F6F8C]">機場捷運</strong><br/>
                 A10 山鼻站 ➜ 轉乘公車 5020 ➜ 大同公司站
               </p>
               <div className="w-full h-px bg-[#E5E7EB] my-2"></div>
               <p>
                 <strong className="font-medium text-[#5F6F8C]">公車 (台北出發)</strong><br/>
                 至「長榮站」下車 (國光1841/1842, 亞通5250, 大有1961)
               </p>
               <p>
                 <strong className="font-medium text-[#5F6F8C]">公車 (桃園出發)</strong><br/>
                 至「大同公司站」下車 (5014, 5015, 5022)
               </p>
            </div>
          </Section>
        </div>

        <div className="pt-4 text-center">
           <a 
              href={externalMapUrl}
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-3 border border-[#A9B9D0] text-[#7C98B3] text-sm tracking-widest rounded-[2px] hover:bg-[#A9B9D0] hover:text-white transition-all duration-300"
            >
              GOOGLE MAP 導航
            </a>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="relative pl-4 border-l border-[#D3E0EF]">
    <h4 className="text-xs font-bold text-[#A9B9D0] tracking-widest uppercase mb-2">{title}</h4>
    {children}
  </div>
);