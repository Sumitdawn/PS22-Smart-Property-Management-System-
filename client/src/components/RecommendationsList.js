import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchAndFilter from './SearchAndFilter';
import ROICalculator from './ROICalculator';

const RecommendationsList = ({ recommendations, onRefresh }) => {
  const [personalizedRecs, setPersonalizedRecs] = useState([]);
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [filteredRecommendations, setFilteredRecommendations] = useState(recommendations);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('roi'); // roi, cost, value, difficulty
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const categories = ['Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Exterior'];
  const propertyTypes = ['1BHK', '2BHK', '3BHK', '4BHK', 'Villa'];

  useEffect(() => {
    setFilteredRecommendations(recommendations);
  }, [recommendations]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, null);
  };

  const handleFilter = (filters) => {
    applyFilters(searchTerm, filters);
  };

  const applyFilters = (search, filters) => {
    let filtered = recommendations;

    // Apply search
    if (search) {
      filtered = filtered.filter(rec => 
        rec.title.toLowerCase().includes(search.toLowerCase()) ||
        rec.description.toLowerCase().includes(search.toLowerCase()) ||
        rec.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(rec => rec.category === filters.category);
      }
      if (filters.propertyType) {
        filtered = filtered.filter(rec => rec.applicableFor.includes(filters.propertyType));
      }
      if (filters.budgetRange) {
        const [min, max] = filters.budgetRange.split('-').map(Number);
        filtered = filtered.filter(rec => rec.estimatedCost >= min && rec.estimatedCost <= max);
      }
      if (filters.difficulty) {
        filtered = filtered.filter(rec => rec.difficulty === filters.difficulty);
      }
    }

    // Apply sorting
    filtered = sortRecommendations(filtered, sortBy);
    setFilteredRecommendations(filtered);
  };

  const sortRecommendations = (recs, sortType) => {
    return [...recs].sort((a, b) => {
      switch (sortType) {
        case 'roi':
          const roiA = ((a.valueIncrease - a.estimatedCost) / a.estimatedCost * 100);
          const roiB = ((b.valueIncrease - b.estimatedCost) / b.estimatedCost * 100);
          return roiB - roiA;
        case 'cost':
          return a.estimatedCost - b.estimatedCost;
        case 'value':
          return b.valueIncrease - a.valueIncrease;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sorted = sortRecommendations(filteredRecommendations, newSortBy);
    setFilteredRecommendations(sorted);
  };

  const getPersonalizedRecommendations = async () => {
    try {
      const response = await axios.post('/api/recommendations/personalized', {
        propertyType: '2BHK',
        budget: 500000,
        area: 850,
        location: 'Pune'
      });
      setPersonalizedRecs(response.data);
      setShowPersonalized(true);
      toast.success('Personalized recommendations generated!');
    } catch (error) {
      toast.error('Failed to get personalized recommendations');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="recommendations-container animate-fadeInUp">
      <div className="recommendations-header">
        <div className="header-content">
          <h2>💡 Property Enhancement Ideas</h2>
          <p>Discover ways to increase your property value with smart investments</p>
        </div>
        
        <div className="header-actions">
          <button 
            onClick={getPersonalizedRecommendations}
            className="personalized-btn animate-pulse"
          >
            🎯 Get AI Recommendations
          </button>
        </div>
      </div>

      <SearchAndFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
        propertyTypes={propertyTypes}
      />

      <div className="view-controls">
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="roi">Best ROI</option>
            <option value="cost">Lowest Cost</option>
            <option value="value">Highest Value</option>
            <option value="difficulty">Easiest First</option>
          </select>
        </div>
        
        <div className="view-mode-controls">
          <button 
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            ⊞ Grid
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            ☰ List
          </button>
        </div>
        
        <div className="results-count">
          {filteredRecommendations.length} ideas found
        </div>
      </div>

      {showPersonalized && personalizedRecs.length > 0 && (
        <div className="personalized-section">
          <h3>🎯 Personalized for Your Property</h3>
          <div className="recommendations-grid">
            {personalizedRecs.map(rec => (
              <div key={rec.id} className="recommendation-card personalized">
                <div className="card-header">
                  <h4>{rec.title}</h4>
                  <span className="category-badge">{rec.category}</span>
                  <span className="roi-badge">ROI: {rec.roi}%</span>
                </div>
                <p className="description">{rec.description}</p>
                <div className="card-details">
                  <div className="detail-item">
                    <span className="label">Cost:</span>
                    <span className="value cost">{formatCurrency(rec.estimatedCost)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Value Increase:</span>
                    <span className="value increase">{formatCurrency(rec.valueIncrease)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time:</span>
                    <span className="value">{rec.timeRequired}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Difficulty:</span>
                    <span className={`difficulty ${rec.difficulty.toLowerCase()}`}>
                      {rec.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="all-recommendations">
        <div className={`recommendations-${viewMode}`}>
          {filteredRecommendations.map((rec, index) => (
            <div 
              key={rec.id} 
              className={`recommendation-card ${viewMode}-view animate-slideInRight`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <h4>{rec.title}</h4>
                <div className="badges">
                  <span className="category-badge">{rec.category}</span>
                  <span className="roi-badge">
                    ROI: {((rec.valueIncrease - rec.estimatedCost) / rec.estimatedCost * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <p className="description">{rec.description}</p>
              
              <div className="card-metrics">
                <div className="metric">
                  <div className="metric-icon">💰</div>
                  <div className="metric-content">
                    <span className="metric-value">{formatCurrency(rec.estimatedCost)}</span>
                    <span className="metric-label">Investment</span>
                  </div>
                </div>
                
                <div className="metric">
                  <div className="metric-icon">📈</div>
                  <div className="metric-content">
                    <span className="metric-value">{formatCurrency(rec.valueIncrease)}</span>
                    <span className="metric-label">Value Increase</span>
                  </div>
                </div>
                
                <div className="metric">
                  <div className="metric-icon">⏱️</div>
                  <div className="metric-content">
                    <span className="metric-value">{rec.timeRequired}</span>
                    <span className="metric-label">Duration</span>
                  </div>
                </div>
                
                <div className="metric">
                  <div className="metric-icon">🎯</div>
                  <div className="metric-content">
                    <span className={`metric-value difficulty ${rec.difficulty.toLowerCase()}`}>
                      {rec.difficulty}
                    </span>
                    <span className="metric-label">Difficulty</span>
                  </div>
                </div>
              </div>

              <div className="card-tags">
                <span className="tag-label">Suitable for:</span>
                {rec.applicableFor.map(type => (
                  <span key={type} className="property-tag">{type}</span>
                ))}
              </div>

              <ROICalculator recommendation={rec} />

              <div className="card-actions">
                <button className="action-btn primary">
                  ⭐ Add to Favorites
                </button>
                <button className="action-btn secondary">
                  📋 Get Quote
                </button>
                <button className="action-btn tertiary">
                  📤 Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="empty-results">
            <div className="empty-icon">🔍</div>
            <h3>No recommendations found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsList;