import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfluencerProfile from './components/InfluencerProfile';
import InfluencerList from './components/InfluencerList';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-dark-900">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<InfluencerList />} />
              <Route path="/influencer/:username" element={<InfluencerProfile />} />
              <Route path="/analytics" element={<div className="text-center py-20"><h2 className="text-2xl font-bold text-white mb-4">Analytics</h2><p className="text-gray-400">Analytics page coming soon!</p></div>} />
              <Route path="/about" element={<div className="text-center py-20"><h2 className="text-2xl font-bold text-white mb-4">About</h2><p className="text-gray-400">About page coming soon!</p></div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;