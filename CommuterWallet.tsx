
import React from 'react';
import { Coins, TrendingUp, Award, Gift, Zap } from 'lucide-react';

export const CommuterWallet: React.FC<{ userCoins: number; trustScore: number }> = ({ userCoins, trustScore }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Pulse Wallet</h2>
          <div className="flex items-center gap-2 mt-1">
            <Coins className="text-amber-500" size={24} />
            <span className="text-3xl font-bold text-slate-900">{userCoins}</span>
          </div>
        </div>
        <div className="bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
          <TrendingUp className="text-emerald-600" size={14} />
          <span className="text-xs font-bold text-emerald-700">Trust Score: {trustScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
          <Award className="text-blue-500" size={20} />
          <span className="text-[10px] font-bold text-slate-500 uppercase">Top Contributor</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
          <Gift className="text-purple-500" size={20} />
          <span className="text-[10px] font-bold text-slate-500 uppercase">3 Rewards Ready</span>
        </div>
      </div>

      <h3 className="font-bold text-sm text-slate-900 mb-3">Next Milestone</h3>
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
        <div className="absolute top-0 left-0 h-full pulse-gradient" style={{ width: '75%' }}></div>
      </div>
      <p className="text-[10px] text-slate-500 text-right font-medium">125 coins until "Local Legend" Badge</p>

      <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
        <Zap size={18} className="text-amber-400" />
        Redeem for Metro Card
      </button>
    </div>
  );
};
