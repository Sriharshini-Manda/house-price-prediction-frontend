import React from 'react';
import { Building2, Activity, History, LineChart, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isBackendConnected }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('predict')}>
            <div className="w-10 h-10 rounded-xl gradient-bg-accent flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">EstatePulse</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ML Powered
                </span>
              </div>
              <p className="text-xs text-gray-400">House Price Prediction System</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('predict')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'predict'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Price Estimator</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Prediction History</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span className="hidden sm:inline">Market Insights</span>
            </button>
          </nav>

          {/* Backend Connection Status Badge */}
          <div className="flex items-center space-x-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isBackendConnected ? 'bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50' : 'bg-rose-500'
              }`}
            />
            <span className="text-xs font-medium text-gray-400 hidden md:inline">
              {isBackendConnected ? 'FastAPI Connected' : 'Connecting to API...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
