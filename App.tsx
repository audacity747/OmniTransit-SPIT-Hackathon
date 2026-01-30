
import React, { useState, useEffect } from 'react';
import { RouteOption, RouteLeg, RoutingPriority, UserProfile, TransitMode } from './types';
import { CITIES } from './services/mockData';
import { AIAssistant } from './components/AIAssistant';
import { CommunityPulse } from './components/CommunityPulse';
import { CommuterWallet } from './components/CommuterWallet';
import { LiveMap } from './components/LiveMap';
import { calculateMumbaiRoute, MUMBAI_STATIONS } from './services/mumbaiTransitService';
import { 
  MapPin, 
  Navigation, 
  Menu, 
  Search, 
  Bot, 
  TrendingUp, 
  Compass, 
  Clock, 
  IndianRupee,
  Layers,
  ChevronRight,
  Zap,
  Train,
  Info,
  ArrowUpDown,
  ArrowRight,
  Footprints,
  Smartphone,
  Map as MapIcon,
  Activity,
  Car,
  Bus,
  Users,
  Timer
} from 'lucide-react';

const App: React.FC = () => {
  const [source, setSource] = useState('Thane');
  const [destination, setDestination] = useState('Borivali');
  const [activeTab, setActiveTab] = useState<'routes' | 'pulse' | 'map'>('routes');
  const [priority, setPriority] = useState<RoutingPriority>(RoutingPriority.FASTEST);
  const [showAI, setShowAI] = useState(false);
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const city = CITIES[0];
  const [user] = useState<UserProfile>({
    name: 'Aditya K.',
    coins: 1420,
    trustScore: 98,
    location: { lat: 19.0760, lng: 72.8777 }
  });

  const handleSearch = () => {
    if (!source || !destination) return;
    setIsSearching(true);
    setTimeout(() => {
      const calculatedRoutes = calculateMumbaiRoute(source, destination, priority);
      setRoutes(calculatedRoutes);
      setIsSearching(false);
      if (calculatedRoutes.length > 0) setExpandedRoute(calculatedRoutes[0].id);
    }, 600);
  };

  useEffect(() => { handleSearch(); }, [priority]);

  const getModeIcon = (mode: TransitMode) => {
    switch (mode) {
      case TransitMode.TRAIN: return <Train size={16} />;
      case TransitMode.METRO: return <Smartphone size={16} />;
      case TransitMode.BUS: return <Bus size={16} />;
      case TransitMode.AUTO: case TransitMode.SHARE_AUTO: return <Car size={16} />;
      case TransitMode.WALK: return <Footprints size={16} />;
      default: return <MapIcon size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans antialiased text-slate-900">
      <header className="glass-panel sticky top-0 z-40 px-4 py-4 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="pulse-gradient p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-200 flex items-center justify-center">
              <Compass size={24} className="animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tighter leading-none">OmniTransit</h1>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Syncing Mumbai Live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors shadow-sm"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Navigator & Profile */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
             <LiveMap />
             
             <div className="mt-8 space-y-4">
                <div className="flex gap-4 relative">
                  <div className="flex flex-col items-center pt-3 h-[96px] w-6">
                    <div className="w-3 h-3 rounded-full border-[3px] border-emerald-500 bg-white z-10 shadow-sm"></div>
                    <div className="w-[2px] flex-1 bg-slate-200 mx-auto"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-500 z-10 shadow-sm"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="relative">
                      <input value={source} onChange={(e) => setSource(e.target.value)} list="stations" className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border border-slate-100 outline-none focus:ring-2 ring-emerald-500/20 transition-all pl-10" placeholder="Origin station..." />
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                    </div>
                    <div className="relative">
                      <input value={destination} onChange={(e) => setDestination(e.target.value)} list="stations" className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border border-slate-100 outline-none focus:ring-2 ring-blue-500/20 transition-all pl-10" placeholder="Target hub..." />
                      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                    </div>
                  </div>
                  <button onClick={() => {setSource(destination); setDestination(source);}} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-slate-100 p-2.5 rounded-2xl shadow-md text-slate-400 hover:text-emerald-500 transition-all active:scale-90"><ArrowUpDown size={18} /></button>
                  <datalist id="stations">{MUMBAI_STATIONS.map(s => <option key={s.name} value={s.name} />)}</datalist>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { id: RoutingPriority.FASTEST, icon: Zap, label: 'Fastest' },
                    { id: RoutingPriority.CHEAPEST, icon: IndianRupee, label: 'Budget' },
                    { id: RoutingPriority.LESS_WALK, icon: Footprints, label: 'Less Walk' },
                    { id: RoutingPriority.SEAMLESS, icon: Layers, label: 'Direct' }
                  ].map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => setPriority(p.id)}
                      className={`flex items-center gap-2 p-3 rounded-2xl text-[10px] font-black uppercase transition-all border ${
                        priority === p.id ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
                      }`}
                    >
                      <p.icon size={14} />
                      {p.label}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full pulse-gradient text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSearching ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Navigation size={22} />}
                  <span className="tracking-tight uppercase">Analyze Routes</span>
                </button>
             </div>
          </div>
          <div className="hidden lg:block">
            <CommuterWallet userCoins={user.coins} trustScore={user.trustScore} />
          </div>
        </div>

        {/* Right Column: Dynamic Feed */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex bg-slate-200/40 p-1.5 rounded-[1.5rem] backdrop-blur-md">
              {(['routes', 'pulse', 'map'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3.5 rounded-2xl text-xs font-black capitalize transition-all duration-300 ${activeTab === tab ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:bg-slate-100/50'}`}
                >
                  {tab === 'routes' ? 'Commute Paths' : tab === 'pulse' ? 'Live Pulse' : 'Network Map'}
                </button>
              ))}
           </div>

           {activeTab === 'routes' && (
             <div className="space-y-6">
                {routes.map(route => (
                  <div key={route.id} className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${expandedRoute === route.id ? 'shadow-2xl border-emerald-200 ring-1 ring-emerald-50' : 'shadow-md border-slate-100 hover:shadow-lg'}`}>
                    <div onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)} className="p-6 cursor-pointer group">
                       <div className="flex justify-between items-start">
                          <div className="flex gap-5">
                             <div className="bg-slate-900 text-white p-4 rounded-[1.5rem] flex flex-col items-center min-w-[80px] shadow-lg group-hover:scale-105 transition-transform">
                                <span className="text-2xl font-black">{route.duration}</span>
                                <span className="text-[10px] uppercase font-black opacity-50 tracking-tighter">MINS</span>
                             </div>
                             <div>
                                <div className="flex gap-1.5 mb-3">
                                  {route.mode.map((m, i) => (
                                    <React.Fragment key={i}>
                                      {i > 0 && <ChevronRight size={14} className="text-slate-300 self-center" />}
                                      <div className="bg-slate-50 p-1.5 rounded-xl text-slate-500 border border-slate-100 shadow-sm">{getModeIcon(m)}</div>
                                    </React.Fragment>
                                  ))}
                                </div>
                                <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 leading-none">
                                   {source} <ArrowRight size={18} className="text-slate-300" /> {destination}
                                </h3>
                                <div className="flex items-center gap-3 mt-2">
                                   <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                                      <Activity size={10} />
                                      {route.pulseStatus}
                                   </div>
                                   <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                                      <Layers size={10} />
                                      {route.interchanges} Switches
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="flex items-center justify-end gap-1.5 font-black text-slate-900 text-2xl">
                                <IndianRupee size={20} className="text-slate-400" /> <span>{route.cost}</span>
                             </div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Est. Total Fare</p>
                          </div>
                       </div>
                    </div>

                    {expandedRoute === route.id && (
                      <div className="p-8 pt-0 border-t border-slate-50 space-y-8 bg-slate-50/20">
                        <div className="mt-8 space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2.5px] before:bg-slate-200 before:rounded-full">
                          {route.legs.map(leg => (
                            <div key={leg.id} className="relative pl-10 animate-in slide-in-from-left-4 duration-300">
                              <div className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white border-[2.5px] border-emerald-500 z-10 shadow-md text-emerald-600 transition-transform hover:scale-125">
                                 {getModeIcon(leg.mode)}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                 <div className="md:col-span-3">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <p className="text-base font-black text-slate-900 leading-none">{leg.from}</p>
                                      {leg.line && <span className="bg-slate-900 text-[10px] text-white px-2 py-1 rounded-lg font-black uppercase tracking-tight shadow-sm">{leg.line}</span>}
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-md mb-3">{leg.description}</p>
                                    
                                    {/* Detailed Mode Info */}
                                    <div className="flex flex-wrap gap-2 items-center">
                                      {leg.platform && (
                                         <div className="bg-white border border-slate-200 text-slate-700 text-[9px] font-black px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 uppercase">
                                            <Layers size={10} className="text-blue-500" />
                                            Platform {leg.platform.replace('PF ', '')}
                                         </div>
                                      )}
                                      {leg.rickshawInfo && (
                                         <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 uppercase">
                                            <Car size={10} />
                                            {leg.rickshawInfo.type}: {leg.rickshawInfo.standName} (WAIT: {leg.rickshawInfo.estimatedWait}m)
                                         </div>
                                      )}
                                      {leg.liveStatus && (
                                         <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 uppercase animate-pulse">
                                            <Zap size={10} />
                                            {leg.liveStatus}
                                         </div>
                                      )}
                                    </div>

                                    {leg.navigationTip && (
                                      <div className="mt-4 flex items-start gap-2 bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50">
                                         <Info size={14} className="text-blue-500 mt-0.5" />
                                         <p className="text-[10px] font-bold text-blue-700 leading-tight">NAV TIP: {leg.navigationTip}</p>
                                      </div>
                                    )}

                                    {leg.progress !== undefined && (
                                      <div className="mt-5 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                                         <div className="flex justify-between items-center mb-2 px-1">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{leg.from}</span>
                                            <div className="flex items-center gap-1.5">
                                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                                               <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em]">Live Position</span>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{leg.to}</span>
                                         </div>
                                         <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                            <div 
                                              className="h-full pulse-gradient transition-all duration-1000 relative" 
                                              style={{ width: `${leg.progress}%` }}
                                            >
                                               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-[3px] border-emerald-500 shadow-md"></div>
                                            </div>
                                         </div>
                                      </div>
                                    )}
                                 </div>
                                 <div className="text-right">
                                    <div className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-2xl">
                                      <Clock size={12} className="text-slate-400" />
                                      <span className="text-xs font-black text-slate-600">{leg.duration}m</span>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Bot Advice Panel */}
                        <div className="bg-emerald-900 text-emerald-50 rounded-3xl p-6 flex gap-5 items-center shadow-2xl shadow-emerald-200/40 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                           <div className="bg-emerald-800 p-3 rounded-2xl shadow-inner relative z-10">
                              <Bot size={28} className="text-emerald-300" />
                           </div>
                           <div className="relative z-10">
                              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">Mumbaikar Intelligence</h4>
                              <p className="text-sm font-medium leading-relaxed italic opacity-90">
                                {route.pulseDescription}
                              </p>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'pulse' && <CommunityPulse />}
           {activeTab === 'map' && <div className="bg-white p-12 rounded-[2.5rem] min-h-[500px] border border-slate-100 shadow-inner flex flex-col items-center justify-center text-center">
              <div className="relative mb-8">
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping scale-150"></div>
                 <Activity size={64} className="text-emerald-500 relative z-10 animate-bounce" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Real-Time Traffic Mesh</h3>
              <p className="text-base text-slate-500 max-w-md mt-4 leading-relaxed font-medium">
                Our proprietary AI combines Google Traffic APIs with crowdsourced Pulse reports to visualize congestion on roads, local platforms, and metro escalators simultaneously.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                 <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-2xl font-black text-slate-900">4.2k</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Active Nodes</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-2xl font-black text-emerald-600">98%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Sync Accuracy</p>
                 </div>
              </div>
           </div>}
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowAI(true)} 
        className="fixed bottom-10 right-8 pulse-gradient p-5 rounded-[2rem] text-white shadow-2xl hover:scale-110 active:scale-90 transition-all z-40 ring-8 ring-white/30 group"
      >
        <Bot size={32} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 bg-rose-500 w-6 h-6 rounded-full border-4 border-white text-[10px] font-black flex items-center justify-center shadow-lg">1</div>
      </button>

      <AIAssistant city={city.name} isOpen={showAI} onClose={() => setShowAI(false)} liveContext={JSON.stringify(routes)} />
    </div>
  );
};

export default App;
