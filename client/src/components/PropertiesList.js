import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PropertyComparison from './PropertyComparison';
import ROICalculator from './ROICalculator';

const PropertiesList = ({ properties }) => {
  const [showComparison, setShowComparison] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyRecommendations, setPropertyRecommendations] = useState({});
  const [propertyAnalysis, setPropertyAnalysis] = useState({});
  const [loadingRecommendations, setLoadingRecommendations] = useState({});
  const [loadingAnalysis, setLoadingAnalysis] = useState({});
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRecommendationsForProperty = async (property) => {
    setLoadingRecommendations(prev => ({ ...prev, [property.id]: true }));
    
    try {
      const response = await axios.post('/api/recommendations/personalized', {
        propertyType: property.type,
        budget: property.budget,
        area: property.area,
        location: property.location
      });
      
      setPropertyRecommendations(prev => ({
        ...prev,
        [property.id]: response.data
      }));
      
      toast.success(`Found ${response.data.length} personalized recommendations!`);
    } catch (error) {
      toast.error('Failed to get recommendations');
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoadingRecommendations(prev => ({ ...prev, [property.id]: false }));
    }
  };

  const generatePropertyAnalysis = (property) => {
    setLoadingAnalysis(prev => ({ ...prev, [property.id]: true }));
    
    // Simulate analysis generation
    setTimeout(() => {
      const analysis = {
        marketValue: property.currentValue || property.budget * 10,
        potentialIncrease: property.budget * 1.8,
        roi: ((property.budget * 1.8) / property.budget * 100).toFixed(1),
        marketTrend: 'Positive',
        locationScore: Math.floor(Math.random() * 30) + 70, // 70-100
        propertyScore: Math.floor(Math.random() * 20) + 80, // 80-100
        recommendations: [
          'Property is in a high-growth area',
          'Enhancement budget is well-allocated',
          'Expected ROI is above market average',
          'Consider prioritizing kitchen and bathroom upgrades'
        ],
        timeline: '6-12 months for optimal returns'
      };
      
      setPropertyAnalysis(prev => ({
        ...prev,
        [property.id]: analysis
      }));
      
      setLoadingAnalysis(prev => ({ ...prev, [property.id]: false }));
      toast.success('Property analysis generated successfully!');
    }, 2000);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="properties-list animate-fadeInUp">
      <div className="properties-header">
        <div className="header-content">
          <h2>🏡 My Properties</h2>
          <p>Track your submitted properties and their enhancement potential</p>
        </div>
        
        {properties.length > 1 && (
          <div className="header-actions">
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className="comparison-toggle-btn"
            >
              {showComparison ? '📋 Hide Comparison' : '🔄 Compare Properties'}
            </button>
          </div>
        )}
      </div>

      {showComparison && properties.length > 1 && (
        <PropertyComparison properties={properties} />
      )}

      {properties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>No Properties Submitted Yet</h3>
          <p>Submit your property details to get personalized enhancement recommendations</p>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-header">
                <h3>{property.type}</h3>
                <span className="location">📍 {property.location}</span>
              </div>
              
              <div className="property-details">
                <div className="detail-row">
                  <span className="label">Area:</span>
                  <span className="value">{property.area} sq ft</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Enhancement Budget:</span>
                  <span className="value budget">{formatCurrency(property.budget)}</span>
                </div>
                
                {property.currentValue && (
                  <div className="detail-row">
                    <span className="label">Current Value:</span>
                    <span className="value current-value">{formatCurrency(property.currentValue)}</span>
                  </div>
                )}
                
                <div className="detail-row">
                  <span className="label">Submitted:</span>
                  <span className="value">{formatDate(property.submittedAt)}</span>
                </div>
              </div>

              {property.description && (
                <div className="property-description">
                  <h4>Description:</h4>
                  <p>{property.description}</p>
                </div>
              )}

              <div className="property-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => getRecommendationsForProperty(property)}
                  disabled={loadingRecommendations[property.id]}
                >
                  {loadingRecommendations[property.id] ? (
                    <>🔄 Loading...</>
                  ) : (
                    <>💡 Get Recommendations</>
                  )}
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => generatePropertyAnalysis(property)}
                  disabled={loadingAnalysis[property.id]}
                >
                  {loadingAnalysis[property.id] ? (
                    <>🔄 Analyzing...</>
                  ) : (
                    <>📊 View Analysis</>
                  )}
                </button>
              </div>

              {/* Show Recommendations */}
              {propertyRecommendations[property.id] && (
                <div className="property-recommendations">
                  <h4>💡 Personalized Recommendations</h4>
                  <div className="recommendations-mini-grid">
                    {propertyRecommendations[property.id].slice(0, 3).map(rec => (
                      <div key={rec.id} className="mini-recommendation-card">
                        <h5>{rec.title}</h5>
                        <div className="mini-rec-details">
                          <span className="mini-cost">{formatCurrency(rec.estimatedCost)}</span>
                          <span className="mini-roi">ROI: {rec.roi}%</span>
                        </div>
                        <div className="mini-rec-actions">
                          <button className="mini-btn">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {propertyRecommendations[property.id].length > 3 && (
                    <button className="view-all-recommendations">
                      View All {propertyRecommendations[property.id].length} Recommendations
                    </button>
                  )}
                </div>
              )}

              {/* Show Analysis */}
              {propertyAnalysis[property.id] && (
                <div className="property-analysis">
                  <h4>📊 Property Analysis</h4>
                  <div className="analysis-grid">
                    <div className="analysis-metric">
                      <span className="metric-label">Market Value</span>
                      <span className="metric-value">{formatCurrency(propertyAnalysis[property.id].marketValue)}</span>
                    </div>
                    <div className="analysis-metric">
                      <span className="metric-label">Potential Increase</span>
                      <span className="metric-value increase">{formatCurrency(propertyAnalysis[property.id].potentialIncrease)}</span>
                    </div>
                    <div className="analysis-metric">
                      <span className="metric-label">Expected ROI</span>
                      <span className="metric-value roi">{propertyAnalysis[property.id].roi}%</span>
                    </div>
                    <div className="analysis-metric">
                      <span className="metric-label">Location Score</span>
                      <span className="metric-value score">{propertyAnalysis[property.id].locationScore}/100</span>
                    </div>
                  </div>
                  
                  <div className="analysis-insights">
                    <h5>🎯 Key Insights</h5>
                    <ul>
                      {propertyAnalysis[property.id].recommendations.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-timeline">
                    <strong>⏱️ Timeline:</strong> {propertyAnalysis[property.id].timeline}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;