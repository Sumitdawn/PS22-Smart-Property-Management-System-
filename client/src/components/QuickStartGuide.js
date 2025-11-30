import React, { useState } from 'react';

const QuickStartGuide = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to EstateFlow! 🏠',
      description: 'Your complete property enhancement platform',
      features: [
        '✨ AI-powered renovation recommendations',
        '🏠 Virtual property visualization',
        '👷 Connect with verified contractors',
        '🏪 Buy materials directly',
        '💰 Calculate loans & ROI',
        '📊 Track projects in real-time'
      ]
    },
    {
      title: 'Explore Trending Ideas 🔥',
      description: 'Discover popular renovation ideas',
      action: 'Click "Trending" to see what\'s hot in property enhancement'
    },
    {
      title: 'Visualize Your Space 🏠',
      description: 'See before you invest',
      action: 'Use "Virtual Tour" to upload photos and see AI-powered transformations'
    },
    {
      title: 'Find Expert Contractors 👷',
      description: 'Connect with verified professionals',
      action: 'Browse "Find Contractors" to book consultations with trusted experts'
    },
    {
      title: 'Shop for Materials 🏪',
      description: 'Buy quality materials',
      action: 'Visit "Buy Materials" for direct purchase from verified suppliers'
    },
    {
      title: 'Calculate Your Investment 💰',
      description: 'Plan your finances',
      action: 'Use "Loan Calculator" to estimate EMI and compare loan options'
    },
    {
      title: 'Track Your Projects 📊',
      description: 'Monitor progress in real-time',
      action: 'Check "Track Projects" for live updates, milestones, and team communication'
    }
  ];

  return (
    <div className="quick-start-overlay">
      <div className="quick-start-modal">
        <button className="close-guide" onClick={onClose}>×</button>
        
        <div className="guide-content">
          <div className="guide-header">
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].description}</p>
          </div>

          <div className="guide-body">
            {steps[currentStep].features ? (
              <ul className="features-list">
                {steps[currentStep].features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ) : (
              <div className="action-guide">
                <p>{steps[currentStep].action}</p>
              </div>
            )}
          </div>

          <div className="guide-footer">
            <div className="progress-dots">
              {steps.map((_, index) => (
                <span 
                  key={index}
                  className={`dot ${index === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>
            
            <div className="guide-actions">
              {currentStep > 0 && (
                <button onClick={() => setCurrentStep(currentStep - 1)}>
                  ← Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next →
                </button>
              ) : (
                <button onClick={onClose} className="get-started-btn">
                  Get Started! 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;
