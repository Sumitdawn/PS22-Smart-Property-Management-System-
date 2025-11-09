import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingRecommendations = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const response = await axios.get('/api/recommendations/trending');
      setTrending(response.data);
    } catch (error) {
      console.error('Error fetching trending:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="trending-loading">
        <div className="loading-spinner"></div>
        <p>Loading trending ideas...</p>
      </div>
    );
  }

  return (
    <div className="trending-recommendations">
      <div className="trending-header">
        <h3>🔥 Trending Enhancement Ideas</h3>
        <p>Most popular projects this month</p>
      </div>

      <div className="trending-grid">
        {trending.map((rec, index) => (
          <div 
            key={rec.id} 
            className="trending-card animate-slideInRight"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="trending-badge">
              <span className="fire-icon">🔥</span>
              <span className="rank">#{index + 1}</span>
            </div>
            
            <div className="trending-content">
              <h4>{rec.title}</h4>
              <p className="category">{rec.category}</p>
              
              <div className="trending-stats">
                <div className="stat">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-value">{rec.rating}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">✅</span>
                  <span className="stat-value">{rec.completedProjects}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">💰</span>
                  <span className="stat-value">
                    {((rec.valueIncrease - rec.estimatedCost) / rec.estimatedCost * 100).toFixed(0)}% ROI
                  </span>
                </div>
              </div>

              <div className="trending-price">
                <span className="price-label">Starting from</span>
                <span className="price-value">{formatCurrency(rec.estimatedCost)}</span>
              </div>
            </div>

            <div className="trending-actions">
              <button className="quick-view-btn">👁️ Quick View</button>
              <button className="add-favorite-btn">❤️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRecommendations;