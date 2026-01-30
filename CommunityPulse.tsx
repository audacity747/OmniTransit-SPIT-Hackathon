
import React, { useState } from 'react';
import { MOCK_REPORTS } from '../services/mockData';
import { MapPin, Users, Clock, AlertTriangle, ShieldCheck, ThumbsUp, Camera } from 'lucide-react';

export const CommunityPulse: React.FC = () => {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [isReporting, setIsReporting] = useState(false);

  const handleVerify = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, consensusCount: r.consensusCount + 1, verified: r.consensusCount + 1 >= 3 } : r));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Live Pulse</h2>
          <p className="text-sm text-slate-500">Verified by 2,430 commuters nearby</p>
        </div>
        <button 
          onClick={() => setIsReporting(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Camera size={16} />
          Report Ground Reality
        </button>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <div key={report.id} className={`p-4 rounded-2xl border ${report.verified ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-200'} shadow-sm transition-all`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${report.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {report.type === 'QUEUE' ? <Users size={18} /> : <AlertTriangle size={18} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{report.location}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={12} />
                    <span>5 mins ago</span>
                    {report.verified && (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <ShieldCheck size={12} />
                        Community Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {!report.verified && (
                <button 
                  onClick={() => handleVerify(report.id)}
                  className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                >
                  <ThumbsUp size={12} />
                  Verify (+2 Coins)
                </button>
              )}
            </div>
            <p className="text-sm text-slate-700 ml-10">{report.description}</p>
            <div className="mt-3 ml-10 flex items-center gap-4">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                {report.consensusCount} confirmations
              </span>
            </div>
          </div>
        ))}
      </div>

      {isReporting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Report an Issue</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">What's happening?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Overcrowding', 'Long Queue', 'Delay', 'Interchange Closed'].map(t => (
                      <button key={t} className="px-3 py-2 border border-slate-200 rounded-xl text-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Details (Optional)</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" rows={3} placeholder="Tell us more..."></textarea>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                  <MapPin className="text-blue-500 mt-1" size={16} />
                  <div>
                    <p className="text-xs font-bold text-blue-900">Geo-Fencing Active</p>
                    <p className="text-[10px] text-blue-700">Reporting for: Silk Board Metro (45m away)</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setIsReporting(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold">Cancel</button>
                  <button onClick={() => setIsReporting(false)} className="flex-1 px-4 py-3 pulse-gradient text-white rounded-xl font-semibold shadow-lg">Submit & Earn</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
