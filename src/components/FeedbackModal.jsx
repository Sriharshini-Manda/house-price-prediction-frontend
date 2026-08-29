import React, { useState } from 'react';
import { X, Star, CheckCircle2, Loader2, MessageSquarePlus } from 'lucide-react';
import { submitFeedback } from '../services/api';

export default function FeedbackModal({ isOpen, onClose, predictionId }) {
  const [actualPrice, setActualPrice] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitFeedback({
        prediction_id: predictionId || 'pred_sample',
        actual_price: actualPrice ? Number(actualPrice) : 0,
        rating,
        comments,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-gray-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
            <h3 className="text-lg font-bold text-white">Feedback Logged!</h3>
            <p className="text-xs text-gray-400">Thank you for helping us track model drift in real time.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Submit Real-World Feedback</h3>
                <p className="text-xs text-gray-400">Help tune model accuracy for prediction ID: <span className="font-mono text-gray-300">{predictionId?.slice(0, 8)}...</span></p>
              </div>
            </div>

            {/* Actual Price Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Actual Sold Price (INR)
              </label>
              <input
                type="number"
                placeholder="e.g. 8600000"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-gray-100"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Rating Accuracy
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Comments / Observations
              </label>
              <textarea
                rows={3}
                placeholder="Add any details about amenities or market conditions..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-gray-100 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-xs text-white gradient-bg-accent shadow-lg shadow-blue-600/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging Feedback...</span>
                </>
              ) : (
                <span>Save Feedback</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
