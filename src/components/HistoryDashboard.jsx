import React, { useState, useEffect } from 'react';
import { History, Search, MapPin, Calendar, ArrowUpDown, Filter, Loader2, Database, AlertCircle } from 'lucide-react';
import { getHistory } from '../services/api';

export default function HistoryDashboard({ metadata }) {
  const [historyItems, setHistoryItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [limit] = useState(15);
  const [skip, setSkip] = useState(0);

  const fetchHistoryData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const params = { limit, skip };
      if (locationFilter) params.location = locationFilter;
      const data = await getHistory(params);
      setHistoryItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch prediction history:', err);
      setFetchError('Unable to connect to MongoDB Atlas history database. Verify backend service is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [locationFilter, skip]);

  const formatDate = (isoString) => {
    if (!isoString) return 'Just now';
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const locations = metadata?.locations || [
    "Baner, Pune", "Kothrud, Pune", "Wakad, Pune", "Hinjawadi, Pune",
    "Viman Nagar, Pune", "Kharadi, Pune", "Hadapsar, Pune", "Aundh, Pune"
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-2xl space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            Prediction History Logs
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Real-time query records persisted to MongoDB Atlas cloud database.
          </p>
        </div>

        {/* Location Filter Dropdown */}
        <div className="flex items-center space-x-3">
          <div className="relative min-w-[200px]">
            <select
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setSkip(0);
              }}
              className="w-full px-3 py-2 text-xs rounded-xl glass-input text-gray-200 cursor-pointer"
            >
              <option value="" className="bg-gray-900">All Locations ({total})</option>
              {locations.map((loc) => (
                <option key={loc} value={loc} className="bg-gray-900">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchHistoryData}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition border border-gray-700 text-xs font-semibold"
            title="Refresh Table"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Network Error Alert */}
      {fetchError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button
            onClick={fetchHistoryData}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-medium"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* History Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-xs">Loading prediction history from MongoDB Atlas...</p>
        </div>
      ) : historyItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 space-y-3">
          <Database className="w-12 h-12 text-gray-700" />
          <p className="text-sm font-medium text-gray-400">No predictions logged yet.</p>
          <p className="text-xs text-gray-500">Run a price prediction from the Price Estimator tab to record entries!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/60 uppercase font-semibold text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Property Specs</th>
                <th className="py-3.5 px-4 text-right">Valuation</th>
                <th className="py-3.5 px-4 text-right">Rate / Sqft</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {historyItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3.5 px-4 font-mono text-gray-400 whitespace-nowrap">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {item.features?.location}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-300">
                        {item.features?.total_sqft} sqft
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-300 border border-blue-800/40">
                        {item.features?.bhk} BHK
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                        {item.features?.bathrooms} Bath
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-400 whitespace-nowrap">
                    {item.prediction?.formatted_price}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-purple-300 whitespace-nowrap">
                    ₹ {item.prediction?.price_per_sqft?.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs text-gray-400">
        <span>Showing {historyItems.length} of {total} entries</span>
        <div className="flex items-center space-x-2">
          <button
            disabled={skip === 0}
            onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
            className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-gray-300"
          >
            Previous
          </button>
          <button
            disabled={skip + limit >= total}
            onClick={() => setSkip((prev) => prev + limit)}
            className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
