import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import HistoryDashboard from './components/HistoryDashboard';
import MarketAnalytics from './components/MarketAnalytics';
import FeedbackModal from './components/FeedbackModal';
import { getMetadata, predictPrice } from './services/api';
import { Building2, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('predict');
  const [metadata, setMetadata] = useState(null);
  const [connectionState, setConnectionState] = useState('waking_up'); // 'waking_up' | 'connected' | 'failed'
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [formData, setFormData] = useState({
    location: 'Baner, Pune',
    total_sqft: 1250,
    bhk: 2,
    bathrooms: 2,
    property_age_years: 3,
    property_type: 'Apartment',
    furnishing_status: 'Semi-Furnished',
  });

  // On-Demand wake-up polling loop on mount (handles dormant Render cold start)
  useEffect(() => {
    let isMounted = true;
    let attempts = 0;
    const maxAttempts = 12; // 12 attempts * 5s = 60s total window
    const intervalMs = 5000;

    const attemptConnection = async () => {
      while (isMounted && attempts < maxAttempts) {
        attempts++;
        try {
          const data = await getMetadata();
          if (!isMounted) return;
          setMetadata(data);
          setConnectionState('connected');
          setIsBackendConnected(true);
          setApiError((prev) => (prev && prev.includes('waking up') ? null : prev));
          if (data.locations && data.locations.length > 0) {
            setFormData((prev) => ({ ...prev, location: data.locations[0] }));
          }
          return; // Connected successfully!
        } catch (err) {
          console.warn(`Backend connection attempt ${attempts}/${maxAttempts} pending:`, err?.message || err);
          if (attempts >= maxAttempts) {
            if (isMounted) {
              setConnectionState('failed');
              setIsBackendConnected(false);
            }
            return;
          }
          await new Promise((res) => setTimeout(res, intervalMs));
        }
      }
    };

    attemptConnection();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePredictSubmit = async (e) => {
    e.preventDefault();
    if (connectionState === 'waking_up') {
      setApiError('The cloud backend is currently waking up from cold start (~30-40s). Please wait a few moments...');
      return;
    }
    setIsLoading(true);
    setApiError(null);
    try {
      const result = await predictPrice(formData);
      setPrediction(result);
    } catch (err) {
      console.error('Prediction request failed:', err);
      setApiError(err.response?.data?.detail || 'Failed to connect to backend server. Make sure FastAPI is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-gray-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBackendConnected={isBackendConnected}
        connectionState={connectionState}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert if API unreachable */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="text-rose-400 hover:text-white text-xs underline font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab 1: Price Estimator */}
        {activeTab === 'predict' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <PredictionForm
                formData={formData}
                setFormData={setFormData}
                metadata={metadata}
                onSubmit={handlePredictSubmit}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <ResultCard
                prediction={prediction}
                formData={formData}
                onOpenFeedback={() => setIsFeedbackOpen(true)}
                onReset={() => setPrediction(null)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Prediction History */}
        {activeTab === 'history' && (
          <div className="max-w-6xl mx-auto">
            <HistoryDashboard metadata={metadata} />
          </div>
        )}

        {/* Tab 3: Market Insights */}
        {activeTab === 'analytics' && (
          <div className="max-w-6xl mx-auto">
            <MarketAnalytics />
          </div>
        )}
      </main>

      {/* Feedback Dialog Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        predictionId={prediction?.id}
      />

      {/* Sleek Footer */}
      <footer className="border-t border-gray-900 bg-gray-950/60 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-gray-300">EstatePulse Engine</span>
            <span>— ML House Price Prediction System</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-400">
            <span>FastAPI + MongoDB Atlas + React 18</span>
            <span className="text-gray-700">•</span>
            <span className="text-blue-400">v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
