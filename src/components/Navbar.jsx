import React from 'react';
import { Building2, Activity, History, LineChart, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isBackendConnected, connectionState = 'waking_up' }) {
  const isConnected = connectionState === 'connected' || isBackendConnected;
  const isWakingUp = connectionState === 'waking_up' && !isConnected;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('predict')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-bg-accent flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">EstatePulse</span>
                <span className="hidden min-[400px]:inline-flex text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ML Powered
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden min-[500px]:block">House Price Prediction System</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('predict')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
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
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
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
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
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
          <div className="flex items-center space-x-2 shrink-0">
            {isConnected ? (
              <>
                <span
                  title="FastAPI Connected"
                  className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50"
                />
                <span className="text-xs font-medium text-emerald-400/90 hidden lg:inline">
                  FastAPI Connected
                </span>
              </>
            ) : isWakingUp ? (
              <>
                <span
                  title="Waking up server (Render free tier cold start, ~30-40s)..."
                  className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shadow-sm shadow-amber-400/50"
                />
                <span
                  title="Render free tier sleeps after 15m of inactivity. Waking up container..."
                  className="text-xs font-medium text-amber-300/90 hidden lg:inline flex items-center gap-1.5"
                >
                  <span className="inline-block w-2.5 h-2.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                  Waking up server (~30s)...
                </span>
              </>
            ) : (
              <>
                <span
                  title="Backend unreachable"
                  className="w-2.5 h-2.5 rounded-full bg-rose-500"
                />
                <span className="text-xs font-medium text-rose-400 hidden lg:inline">
                  Server Offline
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
