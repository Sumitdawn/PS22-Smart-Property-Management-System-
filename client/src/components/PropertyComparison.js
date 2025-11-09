import React, { useState } from 'react';

const PropertyComparison = ({ properties }) => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const handlePropertySelect = (propertyId) => {
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter(id => id !== propertyId));
    } else if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };

  const getSelectedPropertiesData = () => {
    return properties.filter(p => selectedProperties.includes(p.id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculatePotentialROI = (property) => {
    // Simplified ROI calculation based on property type and budget
    const baseROI = {
      '1BHK': 0.8,
      '2BHK': 1.0,
      '3BHK': 1.2,
      '4BHK': 1.4,
      'Villa': 1.6
    };
    
    const multiplier = baseROI[property.type] || 1.0;
    return (property.budget * multiplier * 1.5).toFixed(0);
  };

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="property-comparison">
      <div className="comparison-header">
        <h3>🔄 Compare Properties</h3>
        <p>Select up to 3 properties to compare their enhancement potential</p>
      </div>

      <div className="property-selector">
        <div className="selector-grid">
          {properties.map(property => (
            <div 
              key={property.id}
              className={`property-selector-card ${
                selectedProperties.includes(property.id) ? 'selected' : ''
              }`}
              onClick={() => handlePropertySelect(property.id)}
            >
              <div className="selector-header">
                <h4>{property.type}</h4>
                <div className="selection-indicator">
                  {selectedProperties.includes(property.id) ? '✓' : '+'}
                </div>
              </div>
              <p>📍 {property.location}</p>
              <p>📐 {property.area} sq ft</p>
              <p>💰 {formatCurrency(property.budget)} budget</p>
            </div>
          ))}
        </div>

        {selectedProperties.length > 1 && (
          <button 
            onClick={() => setShowComparison(!showComparison)}
            className="compare-button"
          >
            📊 Compare Selected Properties ({selectedProperties.length})
          </button>
        )}
      </div>

      {showComparison && selectedProperties.length > 1 && (
        <div className="comparison-results animate-fadeInUp">
          <h4>📈 Comparison Results</h4>
          
          <div className="comparison-table">
            <div className="comparison-header-row">
              <div className="comparison-cell header">Criteria</div>
              {getSelectedPropertiesData().map(property => (
                <div key={property.id} className="comparison-cell header">
                  {property.type} - {property.location}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="comparison-cell label">Area (sq ft)</div>
              {getSelectedPropertiesData().map(property => (
                <div key={property.id} className="comparison-cell">
                  {property.area}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="comparison-cell label">Enhancement Budget</div>
              {getSelectedPropertiesData().map(property => (
                <div key={property.id} className="comparison-cell">
                  {formatCurrency(property.budget)}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="comparison-cell label">Current Value</div>
              {getSelectedPropertiesData().map(property => (
                <div key={property.id} className="comparison-cell">
                  {property.currentValue ? formatCurrency(property.currentValue) : 'Not specified'}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="comparison-cell label">Cost per sq ft</div>
              {getSelectedPropertiesData().map(property => (
                <div key={property.id} className="comparison-cell">
                  {formatCurrency(property.budget / property.area)}
                </div>
              ))}
            </div>

            <div className="comparison-row highlight">
              <div className="comparison-cell label">Potential ROI</div>
              {getSelectedPropertiesData().map(property => (
                <div key={property.id} className="comparison-cell">
                  {formatCurrency(calculatePotentialROI(property))}
                </div>
              ))}
            </div>
          </div>

          <div className="comparison-insights">
            <h5>💡 Insights</h5>
            <div className="insights-grid">
              {(() => {
                const data = getSelectedPropertiesData();
                const bestBudget = data.reduce((prev, curr) => 
                  prev.budget > curr.budget ? prev : curr
                );
                const bestArea = data.reduce((prev, curr) => 
                  prev.area > curr.area ? prev : curr
                );
                const bestROI = data.reduce((prev, curr) => 
                  calculatePotentialROI(prev) > calculatePotentialROI(curr) ? prev : curr
                );

                return (
                  <>
                    <div className="insight-card">
                      <div className="insight-icon">💰</div>
                      <div className="insight-content">
                        <strong>Highest Budget</strong>
                        <p>{bestBudget.type} in {bestBudget.location}</p>
                      </div>
                    </div>
                    <div className="insight-card">
                      <div className="insight-icon">📐</div>
                      <div className="insight-content">
                        <strong>Largest Area</strong>
                        <p>{bestArea.type} - {bestArea.area} sq ft</p>
                      </div>
                    </div>
                    <div className="insight-card">
                      <div className="insight-icon">📈</div>
                      <div className="insight-content">
                        <strong>Best ROI Potential</strong>
                        <p>{bestROI.type} in {bestROI.location}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyComparison;