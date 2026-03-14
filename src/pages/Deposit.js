import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Deposit() {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('zenith_user') || 'null');
  
  // Validate user has phone number (check both phone and id fields)
  if (user && !user.phone && !user.id) {
    localStorage.removeItem('zenith_user');
    window.location.href = '/login';
  }

  const handleDeposit = () => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    // Show instructions directly
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-md mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
            <p className="text-gray-600 mt-2">Manual deposit via Airtel Money</p>
          </div>

          {!showInstructions ? (
            <div className="space-y-6">
              <button
                onClick={handleDeposit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-xl transition flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Deposit
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">📱 Deposit Instructions</h3>
                
                <div className="space-y-3 text-green-800">
                  <p><strong>Step 1:</strong> Send any amount to:</p>
                  <p className="text-xl font-bold">📱 0746160623</p>
                  <p className="text-lg font-semibold">👤 KISAKYE REAGAN</p>
                  <p><strong>Step 2:</strong> Network: <strong>Airtel Money</strong></p>
                  <hr className="border-green-300 my-2" />
                  <p className="text-sm"><strong>Step 3:</strong> After sending, contact admin with a screenshot of your deposit to confirm.</p>
                  <p className="text-sm"><strong>Step 4:</strong> Your balance will be credited within 24 hours.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm("Open phone dialer to send money?")) {
                    window.location.href = "tel:*185*8*6*1*746160623*1#";
                  }
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition"
              >
                📞 Open Phone Dialer
              </button>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full text-gray-600 hover:text-gray-800 py-2"
              >
                ← Back
              </button>
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 py-2"
          >
            ← Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Deposit;
