import React from 'react';
import { IndianRupee, TrendingUp, ShieldCheck, Tag, Sparkles, MessageSquarePlus, RefreshCw, BarChart2 } from 'lucide-react';

export default function ResultCard({ prediction, formData, onOpenFeedback, onReset }) {
  if (!prediction) {
    return (
      <div className="glass-panel rounded-2xl p-8 border border-gray-800 flex flex-col items-center justify-center text-center min-h-[420px] relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Ready for Prediction</h3>
        <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
          Adjust the property parameters on the left and click <span className="text-blue-400 font-semibold">"Estimate Property Price"</span> to compute the estimated market valuation.
        </p>
      </div>
    );
  }

  const { estimated_price, formatted_price, price_per_sqft, price_range, model_version } = prediction;

  const formatLakhs = (val) => {
    if (!val) return '';
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} L`;
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
      {/* Decorative Glow Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Inference Complete</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 font-mono">
            {model_version}
          </span>
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            title="Reset Result"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Price Readout */}
      <div className="text-center my-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1">
          Estimated Valuation
        </span>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight my-2 break-words">
          {formatted_price}
        </h1>
        <p className="text-xs text-gray-400 font-mono mt-1 break-all">
          Exact Estimate: ₹ {estimated_price?.toLocaleString('en-IN')} INR
        </p>
      </div>

      {/* Metric Badges Grid */}
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 my-6">
        <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800/80 flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-semibold flex items-center gap-1">
            <Tag className="w-3 h-3 text-purple-400" /> Price / Sq.Ft
          </span>
          <span className="text-sm sm:text-base font-bold text-purple-300 mt-1">
            ₹ {price_per_sqft?.toLocaleString('en-IN')} / sqft
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800/80 flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-400" /> 95% Confidence Band
          </span>
          <span className="text-xs sm:text-sm font-bold text-blue-300 mt-1">
            {formatLakhs(price_range?.min)} - {formatLakhs(price_range?.max)}
          </span>
        </div>
      </div>

      {/* Property Input Summary */}
      <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/60 mb-6">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-2">
          Evaluation Summary
        </span>
        <div className="flex flex-wrap gap-2 text-xs text-gray-300">
          <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700/60 font-medium">
            📍 {formData.location}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700/60 font-medium">
            📐 {formData.total_sqft} sqft
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700/60 font-medium">
            🛏️ {formData.bhk} BHK
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700/60 font-medium">
            🛁 {formData.bathrooms} Bath
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700/60 font-medium">
            🏚️ {formData.property_age_years === 0 ? 'Brand New' : `${formData.property_age_years} yrs old`}
          </span>
        </div>
      </div>

      {/* Footer Feedback Action */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>MongoDB Atlas Logged</span>
        </div>

        <button
          onClick={onOpenFeedback}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition border border-gray-700"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-blue-400" />
          <span>Provide Feedback</span>
        </button>
      </div>
    </div>
  );
}
