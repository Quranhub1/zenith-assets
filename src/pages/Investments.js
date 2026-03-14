import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Investments = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Apple Products Investment Packages
  const investmentPackages = [
    {
      id: 1,
      name: 'iPhone 16 Pro Max Bundle',
      description: 'Invest in the latest iPhone distribution network across East Africa',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
      minAmount: 50000,
      maxAmount: 5000000,
      duration: '30 days',
      returns: '15%',
      category: 'Consumer Electronics'
    },
    {
      id: 2,
      name: 'MacBook Pro Distribution',
      description: 'Premium laptop distribution business in Uganda and neighboring countries',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      minAmount: 100000,
      maxAmount: 10000000,
      duration: '60 days',
      returns: '25%',
      category: 'Computing'
    },
    {
      id: 3,
      name: 'Apple Watch Health Network',
      description: 'Health monitoring devices distribution to hospitals and fitness centers',
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
      minAmount: 75000,
      maxAmount: 3000000,
      duration: '45 days',
      returns: '18%',
      category: 'Health Tech'
    },
    {
      id: 4,
      name: 'iPad Education Program',
      description: 'Supplying iPads to schools and educational institutions',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      minAmount: 200000,
      maxAmount: 8000000,
      duration: '90 days',
      returns: '30%',
      category: 'Education'
    },
    {
      id: 5,
      name: 'AirPods Pro Retail',
      description: 'Premium audio devices retail network across major shopping centers',
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800',
      minAmount: 30000,
      maxAmount: 2000000,
      duration: '21 days',
      returns: '12%',
      category: 'Audio'
    },
    {
      id: 6,
      name: 'Apple Vision Pro AR',
      description: 'Augmented reality devices for entertainment and business solutions',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800',
      minAmount: 150000,
      maxAmount: 15000000,
      duration: '120 days',
      returns: '40%',
      category: 'AR/VR'
    }
  ];

  const handleInvest = async (pkg) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const submitInvestment = async () => {
    if (!investAmount || isNaN(investAmount)) {
      alert('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(investAmount);
    if (amount < selectedPackage.minAmount) {
      alert(`Minimum investment is UGX ${selectedPackage.minAmount.toLocaleString()}`);
      return;
    }
    if (amount > selectedPackage.maxAmount) {
      alert(`Maximum investment is UGX ${selectedPackage.maxAmount.toLocaleString()}`);
      return;
    }
    if (amount > user.balance) {
      alert('Insufficient balance. Please deposit funds first.');
      return;
    }

    setLoading(true);

    // Calculate returns
    const returns = parseFloat(selectedPackage.returns) / 100;
    const expectedReturn = amount + (amount * returns);

    // Create investment record
    const investment = {
      id: Date.now(),
      userId: user.phone,
      packageName: selectedPackage.name,
      amount: amount,
      expectedReturn: expectedReturn,
      returns: selectedPackage.returns,
      duration: selectedPackage.duration,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    const investments = JSON.parse(localStorage.getItem('investments_' + user.phone) || '[]');
    investments.push(investment);
    localStorage.setItem('investments_' + user.phone, JSON.stringify(investments));

    // Update user balance
    const newBalance = user.balance - amount;
    user.balance = newBalance;
    localStorage.setItem('user', JSON.stringify(user));

    setLoading(false);
    setShowModal(false);
    alert(`Investment of UGX ${amount.toLocaleString()} in ${selectedPackage.name} successful! Expected return: UGX ${expectedReturn.toLocaleString()}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Apple Products Investment
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Invest in the world's most innovative technology company
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-2xl font-bold">UGX 50K+</p>
                <p className="text-sm text-blue-200">Minimum</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-2xl font-bold">40%</p>
                <p className="text-sm text-blue-200">Max Returns</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-blue-200">Packages</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Balance Banner */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Your Balance</p>
              <p className="text-2xl font-bold text-green-600">
                UGX {user?.balance?.toLocaleString() || 0}
              </p>
            </div>
            <Link
              to="/deposit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Deposit Funds
            </Link>
          </div>
        </div>
      </div>

      {/* Investment Packages */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Available Investment Packages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {pkg.returns} Returns
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {pkg.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {pkg.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Min Investment</p>
                    <p className="font-semibold">UGX {pkg.minAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{pkg.duration}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleInvest(pkg)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Invest Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Investment Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold mb-4">Invest in {selectedPackage.name}</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Minimum:</span>
                <span className="font-medium">UGX {selectedPackage.minAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Maximum:</span>
                <span className="font-medium">UGX {selectedPackage.maxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Expected Returns:</span>
                <span className="font-medium text-green-600">{selectedPackage.returns}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{selectedPackage.duration}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Amount (UGX)
              </label>
              <input
                type="number"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                placeholder={`Min: ${selectedPackage.minAmount}`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitInvestment}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Investment'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Investments;
