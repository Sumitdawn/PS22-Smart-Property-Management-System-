import React, { useState, useEffect } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const time = parseFloat(tenure) * 12;

    if (principal && rate && time) {
      const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const totalPaymentValue = emiValue * time;
      const totalInterestValue = totalPaymentValue - principal;

      setEmi(Math.round(emiValue));
      setTotalPayment(Math.round(totalPaymentValue));
      setTotalInterest(Math.round(totalInterestValue));
    }
  };

  const loanProviders = [
    { name: 'HDFC Bank', rate: 8.5, processing: 0.5, logo: '🏦' },
    { name: 'SBI', rate: 8.3, processing: 0.35, logo: '🏦' },
    { name: 'ICICI Bank', rate: 8.7, processing: 0.5, logo: '🏦' },
    { name: 'Axis Bank', rate: 8.6, processing: 0.5, logo: '🏦' }
  ];

  return (
    <div className="loan-calculator-container">
      <div className="feature-header">
        <h2>💰 Home Renovation Loan Calculator</h2>
        <p>Calculate your EMI and compare loan options</p>
      </div>

      <div className="calculator-content">
        <div className="calculator-inputs">
          <div className="input-group">
            <label>Loan Amount</label>
            <div className="slider-container">
              <input
                type="range"
                min="50000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="slider"
              />
              <div className="slider-value">
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="value-input"
                />
                <span className="currency">₹</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Interest Rate (% per annum)</label>
            <div className="slider-container">
              <input
                type="range"
                min="6"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="slider"
              />
              <div className="slider-value">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="value-input"
                  step="0.1"
                />
                <span className="currency">%</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Loan Tenure (Years)</label>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="slider"
              />
              <div className="slider-value">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="value-input"
                />
                <span className="currency">Years</span>
              </div>
            </div>
          </div>
        </div>

        <div className="calculator-results">
          <div className="result-card primary">
            <div className="result-icon">💳</div>
            <div className="result-info">
              <h3>Monthly EMI</h3>
              <p className="result-value">₹{emi.toLocaleString()}</p>
            </div>
          </div>

          <div className="result-card">
            <div className="result-icon">💰</div>
            <div className="result-info">
              <h3>Total Payment</h3>
              <p className="result-value">₹{totalPayment.toLocaleString()}</p>
            </div>
          </div>

          <div className="result-card">
            <div className="result-icon">📊</div>
            <div className="result-info">
              <h3>Total Interest</h3>
              <p className="result-value">₹{totalInterest.toLocaleString()}</p>
            </div>
          </div>

          <div className="payment-breakdown">
            <h4>Payment Breakdown</h4>
            <div className="breakdown-chart">
              <div 
                className="breakdown-bar principal"
                style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
              >
                <span>Principal</span>
              </div>
              <div 
                className="breakdown-bar interest"
                style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
              >
                <span>Interest</span>
              </div>
            </div>
            <div className="breakdown-legend">
              <div className="legend-item">
                <span className="legend-color principal"></span>
                <span>Principal: ₹{parseInt(loanAmount).toLocaleString()}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color interest"></span>
                <span>Interest: ₹{totalInterest.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="loan-providers">
        <h3>Compare Loan Providers</h3>
        <div className="providers-grid">
          {loanProviders.map((provider, index) => (
            <div key={index} className="provider-card">
              <div className="provider-logo">{provider.logo}</div>
              <h4>{provider.name}</h4>
              <div className="provider-details">
                <div className="detail">
                  <span className="detail-label">Interest Rate</span>
                  <span className="detail-value">{provider.rate}% p.a.</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Processing Fee</span>
                  <span className="detail-value">{provider.processing}%</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Your EMI</span>
                  <span className="detail-value highlight">
                    ₹{Math.round((loanAmount * (provider.rate/12/100) * Math.pow(1 + provider.rate/12/100, tenure*12)) / (Math.pow(1 + provider.rate/12/100, tenure*12) - 1)).toLocaleString()}
                  </span>
                </div>
              </div>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      <div className="loan-tips">
        <h3>💡 Loan Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">✅</span>
            <h4>Check Credit Score</h4>
            <p>Maintain a credit score above 750 for better interest rates</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💰</span>
            <h4>Down Payment</h4>
            <p>Higher down payment reduces EMI burden and interest</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📄</span>
            <h4>Documentation</h4>
            <p>Keep all property and income documents ready</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🔍</span>
            <h4>Compare Offers</h4>
            <p>Compare multiple lenders before finalizing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
