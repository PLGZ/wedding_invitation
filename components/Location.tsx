import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car, Bus, Sparkles, Train } from 'lucide-react';

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
      className="w-full max-w-3xl mx-auto mb-12 px-4"
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white">
        
        <h2 className="text-3xl font-handwriting text-center text-purple-800 mb-8 flex flex-col items-center">
          <span className="mb-2">地點與交通</span>
          <span className="font-script text-xl text-slate-500">Location & Traffic</span>
        </h2>

        {/* Venue Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">青青格麗絲莊園</h3>
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

        {/* Transportation Cards - Vertical Layout for better readability */}
        <div className="space-y-4 text-left">
          
          {/* Driving */}
          <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3 text-blue-800">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Car size={20} />
              </div>
              <h4 className="font-bold text-lg tracking-wide">自行開車 DRIVE</h4>
            </div>
            <ul className="text-slate-600 text-sm space-y-3 list-none leading-relaxed">
              <li className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="flex-shrink-0 font-bold text-white bg-blue-400 px-2 py-0.5 rounded text-xs self-start mt-0.5">南下</span>
                <span>中山高速公路 ➜ 桃園南崁交流道下 ➜ 右側直行新南路一段 ➜ 右轉南華一街 ➜ 左轉至南崁路直行 ➜ 青青格麗絲莊園。</span>
              </li>
              <li className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="flex-shrink-0 font-bold text-white bg-blue-400 px-2 py-0.5 rounded text-xs self-start mt-0.5">北上</span>
                <span>中山高速公路 ➜ 桃園南崁交流道下 ➜ 左轉中正路 ➜ 右側直行新南路一段 ➜ 右轉南華一街 ➜ 左轉至南崁路直行 ➜ 青青格麗絲莊園。</span>
              </li>
            </ul>
          </div>

          {/* MRT */}
          <div className="bg-teal-50/80 p-5 rounded-2xl border border-teal-100">
             <div className="flex items-center gap-3 mb-3 text-teal-800">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Train size={20} />
              </div>
              <h4 className="font-bold text-lg tracking-wide">機場捷運 TMRTS</h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              桃園機捷 <span className="font-bold text-teal-700">山鼻站</span> ➜ 步行至大力新村站 (約1分) ➜ 搭乘桃園客運 <span className="font-bold bg-teal-100 px-1 rounded text-teal-800">5020</span> (約14分) ➜ 於 <span className="font-bold text-teal-700">大同公司站</span> 下車 ➜ 即可抵達青青格麗絲莊園。
            </p>
          </div>

          {/* Bus */}
          <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-3 mb-3 text-purple-800">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Bus size={20} />
              </div>
              <h4 className="font-bold text-lg tracking-wide">公車 BUS</h4>
            </div>
            <div className="text-slate-600 text-sm space-y-5 leading-relaxed">
               
               {/* Taoyuan Route */}
               <div>
                  <h5 className="font-bold text-purple-800 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    桃園 ➜ 青青格麗絲莊園 (到站處：大同公司)
                  </h5>
                  <p className="text-xs text-slate-500 mb-2 pl-4">
                    桃園客運（乘車處：桃園火車站前、復興路 7-11 超商前）
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                    <li className="bg-white/60 px-2 py-1 rounded border border-purple-100"><span className="font-bold text-purple-700">5014</span> 桃園 ➜ 南祥路 ➜ 南崁</li>
                    <li className="bg-white/60 px-2 py-1 rounded border border-purple-100"><span className="font-bold text-purple-700">5015</span> 桃園 ➜ 南崁 ➜ 大園</li>
                    <li className="bg-white/60 px-2 py-1 rounded border border-purple-100"><span className="font-bold text-purple-700">5022</span> 桃園 ➜ 南崁 ➜ 沙崙</li>
                  </ul>
               </div>
               
               {/* Taipei Route */}
               <div className="border-t border-purple-200 pt-4">
                  <h5 className="font-bold text-purple-800 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    台北 ➜ 青青格麗絲莊園 (到站處：長榮)
                  </h5>
                  <p className="mb-3 pl-4">
                    台北 ➜ 下南崁交流道 ➜ 首站<span className="font-bold text-purple-700">「長榮」</span>下車 ➜ 南華一街 ➜ 步行約 10 分鐘抵達。
                  </p>
                  <div className="flex flex-wrap gap-2 pl-4 text-xs font-medium">
                     <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-full text-slate-700 shadow-sm">1841、1842 國光客運</span>
                     <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-full text-slate-700 shadow-sm">1356 葛瑪蘭客運</span>
                     <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-full text-slate-700 shadow-sm">5250 亞通客運</span>
                     <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-full text-slate-700 shadow-sm">1961 大有客運</span>
                  </div>
               </div>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
            <a 
              href={externalMapUrl}
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              開啟 Google Maps 導航 <Sparkles size={16} />
            </a>
        </div>

      </div>
    </motion.div>
  );
};