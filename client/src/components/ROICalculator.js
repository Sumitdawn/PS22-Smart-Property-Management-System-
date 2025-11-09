import React, { useState } from 'react';

const ROICalculator = ({ recommendation }) => {
  const [customBudget, setCustomBudget] = useState(recommendation?.estimatedCost || 0);
  const [propertyValue, setPropertyValue] = useState(5000000); // Default 50L
  const [showCalculator, setShowCalculator] = useState(false);

  const calculateROI = () => {
    const investment = customBudget;
    const valueIncrease = recommendation.valueIncrease;
    const roi = ((valueIncrease - investment) / investment * 100).toFixed(1);
    const newPropertyValue = propertyValue + valueIncrease;
    const percentageIncrease = ((valueIncrease / propertyValue) * 100).toFixed(1);
    
    return {
      roi: parseFloat(roi),
      profit: valueIncrease - investment,
      newPropertyValue,
      percentageIncrease: parseFloat(percentageIncrease),
      paybackPeriod: Math.ceil(investment / (valueIncrease / 12)) // Assuming monthly appreciation
    };
  };

  const results = calculateROI();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getROIColor = (roi) => {
    if (roi >= 100) return '#28a745'; // Green
    if (roi >= 50) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  return (
    <div className="roi-calculator">
      <button 
        onClick={() => setShowCalculator(!showCalculator)}
        className="calculator-toggle"
      >
        📊 ROI Calculator {showCalculator ? '▼' : '▶'}
      </button>

      {showCalculator && (
        <div className="calculator-content animate-fadeInUp">
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Your Budget (₹)</label>
              <input
                type="number"
                value={customBudget}
                onChange={(e) => setCustomBudget(parseInt(e.target.value) || 0)}
                className="calculator-input"
              />
            </div>
            <div className="input-group">
              <label>Current Property Value (₹)</label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(parseInt(e.target.value) || 0)}
                className="calculator-input"
              />
            </div>
          </div>

          <div className="calculator-results">
            <div className="result-grid">
              <div className="result-card">
                <div className="result-icon">💰</div>
                <div className="result-value" style={{ color: getROIColor(results.roi) }}>
                  {results.roi}%
                </div>
                <div className="result-label">ROI</div>
              </div>

              <div className="result-card">
                <div className="result-icon">📈</div>
                <div className="result-value">
                  {formatCurrency(results.profit)}
                </div>
                <div className="result-label">Net Profit</div>
              </div>

              <div className="result-card">
                <div className="result-icon">🏠</div>
                <div className="result-value">
                  {formatCurrency(results.newPropertyValue)}
                </div>
                <div className="result-label">New Property Value</div>
              </div>

              <div className="result-card">
                <div className="result-icon">⏱️</div>
                <div className="result-value">
                  {results.paybackPeriod} months
                </div>
                <div className="result-label">Payback Period</div>
              </div>
            </div>

            <div className="roi-insights">
              <h4>💡 Investment Insights</h4>
              <div className="insights-list">
                {results.roi >= 100 && (
                  <div className="insight excellent">
                    🎯 Excellent ROI! This investment can double your money.
                  </div>
                )}
                {results.roi >= 50 && results.roi < 100 && (
                  <div className="insight good">
                    ✅ Good ROI! This is a profitable investment.
                  </div>
                )}
                {results.roi < 50 && results.roi > 0 && (
                  <div className="insight moderate">
                    ⚠️ Moderate ROI. Consider other options for better returns.
                  </div>
                )}
                {results.roi <= 0 && (
                  <div className="insight poor">
                    ❌ Poor ROI. This investment may not be profitable.
                  </div>
                )}
                <div className="insight">
                  📊 Your property value will increase by {results.percentageIncrease}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;