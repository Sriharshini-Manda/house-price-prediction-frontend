import React from 'react';
import { LineChart, BarChart2, TrendingUp, Layers, PieChart } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function MarketAnalytics() {
  // Sample Data for Price vs Sqft Curve
  const sqftCurveData = [
    { sqft: 500, priceLakhs: 34.0, pricePerSqft: 6800 },
    { sqft: 750, priceLakhs: 51.5, pricePerSqft: 6860 },
    { sqft: 1000, priceLakhs: 69.0, pricePerSqft: 6900 },
    { sqft: 1250, priceLakhs: 87.5, pricePerSqft: 7000 },
    { sqft: 1500, priceLakhs: 106.0, pricePerSqft: 7060 },
    { sqft: 1800, priceLakhs: 130.0, pricePerSqft: 7220 },
    { sqft: 2200, priceLakhs: 162.0, pricePerSqft: 7360 },
    { sqft: 2800, priceLakhs: 215.0, pricePerSqft: 7670 },
    { sqft: 3500, priceLakhs: 280.0, pricePerSqft: 8000 },
  ];

  // Sample Data for Neighborhood Rate Comparison
  const neighborhoodData = [
    { name: 'Kothrud', avgRate: 9800, color: '#3b82f6' },
    { name: 'Baner', avgRate: 8500, color: '#6366f1' },
    { name: 'Viman Nagar', avgRate: 8900, color: '#8b5cf6' },
    { name: 'Aundh', avgRate: 9200, color: '#ec4899' },
    { name: 'Wakad', avgRate: 7200, color: '#10b981' },
    { name: 'Kharadi', avgRate: 7600, color: '#06b6d4' },
    { name: 'Hinjawadi', avgRate: 6400, color: '#f59e0b' },
    { name: 'Hadapsar', avgRate: 6100, color: '#ef4444' },
  ];

  // Feature Importance breakdown from ML model
  const featureImportanceData = [
    { feature: 'Total Sqft', weight: 48 },
    { feature: 'Location', weight: 26 },
    { feature: 'BHK Count', weight: 14 },
    { feature: 'Bathrooms', weight: 7 },
    { feature: 'Property Age', weight: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono inline-block mb-2">
            ML Analytics Engine
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Pune Real Estate Valuation Trends
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Visual breakdown of square footage price curves, neighborhood rate differentials, and machine learning feature importances.
          </p>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 bg-gray-900/60 p-3 sm:p-4 rounded-xl border border-gray-800 shrink-0">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">Model Metric</span>
            <span className="text-lg font-extrabold text-blue-400">R² = 0.9684</span>
          </div>
          <div className="w-px h-8 bg-gray-800" />
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">Algorithm</span>
            <span className="text-sm font-bold text-purple-300">XGBoost + Ridge</span>
          </div>
        </div>
      </div>

      {/* Grid of Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Price vs Total Sqft */}
        <div className="glass-panel rounded-2xl p-6 border border-gray-800 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Estimated Price Curve vs Square Feet
            </h3>
            <span className="text-[10px] text-gray-400">Values in ₹ Lakhs</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sqftCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="sqft" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value) => [`₹ ${value} Lakhs`, 'Est. Price']}
                  labelFormatter={(label) => `${label} sq.ft`}
                />
                <Area type="monotone" dataKey="priceLakhs" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#priceGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Neighborhood Rates */}
        <div className="glass-panel rounded-2xl p-6 border border-gray-800 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              Average Price per Sq.Ft by Locality
            </h3>
            <span className="text-[10px] text-gray-400">INR / sq.ft</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={neighborhoodData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={45} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value) => [`₹ ${value.toLocaleString('en-IN')} / sqft`, 'Avg. Rate']}
                />
                <Bar dataKey="avgRate" radius={[6, 6, 0, 0]}>
                  {neighborhoodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature Importance Card */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Machine Learning Feature Weight Influence
          </h3>
          <span className="text-[10px] text-gray-400">Relative Weight (%)</span>
        </div>

        <div className="space-y-3">
          {featureImportanceData.map((item) => (
            <div key={item.feature} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-300">{item.feature}</span>
                <span className="text-blue-400 font-mono">{item.weight}%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2.5 overflow-hidden border border-gray-800">
                <div
                  className="gradient-bg-accent h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${item.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
