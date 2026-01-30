
import React, { useEffect, useState } from 'react';
import { Map as MapIcon, Navigation, Activity, Clock } from 'lucide-react';

export const LiveMap: React.FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % 1000), 50);
    return () => clearInterval(interval);
  }, []);

  // Simulate vehicle position along a path
  const getPos = (offset: number) => {
    const p = (frame + offset) % 1000;
    return p / 10;
  };

  return (
    <div className="relative w-full h-80 bg-[#f8f9fa] rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
      {/* Real-time Map Background (Simulated SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Roads and Traffic Layers */}
        {/* Western Express Highway */}
        <path d="M50 0 L150 150 L200 300" stroke="#eee" strokeWidth="12" fill="none" />
        <path d="M50 0 L150 150" stroke="#f44336" strokeWidth="4" fill="none" strokeDasharray="8 4" className="animate-[dash_2s_linear_infinite]" />
        <path d="M150 150 L200 300" stroke="#ff9800" strokeWidth="4" fill="none" />

        {/* Eastern Express Highway */}
        <path d="M350 0 L250 150 L200 300" stroke="#eee" strokeWidth="12" fill="none" />
        <path d="M350 0 L250 150" stroke="#4caf50" strokeWidth="4" fill="none" />
        <path d="M250 150 L200 300" stroke="#4caf50" strokeWidth="4" fill="none" />

        {/* Link Roads */}
        <path d="M150 150 L250 150" stroke="#eee" strokeWidth="10" fill="none" />
        <path d="M150 150 L250 150" stroke="#ffeb3b" strokeWidth="4" fill="none" />

        {/* Moving Vehicles */}
        {/* Train Icon (Simulated) */}
        <circle cx={50 + getPos(0)} cy={getPos(0)} r="4" fill="#1e293b" filter="url(#shadow)" />
        
        {/* Bus Icon (Simulated) */}
        <rect x={350 - getPos(200)} y={getPos(200)} width="6" height="10" rx="1" fill="#dc2626" transform={`rotate(30, ${350 - getPos(200)}, ${getPos(200)})`} />
        
        {/* Auto Icon (Simulated) */}
        <circle cx={150 + getPos(100)} cy="150" r="3" fill="#fbbf24" />
      </svg>

      {/* Traffic Legend Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-red-500 rounded-full"></div>
          <span className="text-[9px] font-black text-slate-600 uppercase">Heavy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-orange-400 rounded-full"></div>
          <span className="text-[9px] font-black text-slate-600 uppercase">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-green-500 rounded-full"></div>
          <span className="text-[9px] font-black text-slate-600 uppercase">Clear</span>
        </div>
      </div>

      {/* Floating Info */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
         <div className="bg-slate-900 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold shadow-lg animate-bounce">
            <Activity size={12} className="text-emerald-400" />
            LIVE TRAFFIC DATA ACTIVE
         </div>
      </div>

      {/* Center Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
          <MapIcon size={20} className="text-blue-600 drop-shadow-md" />
        </div>
      </div>
    </div>
  );
};
