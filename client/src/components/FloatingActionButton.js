import React, { useState } from 'react';

const FloatingActionButton = ({ onQuickAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    { icon: '💡', label: 'Quick Idea', action: 'idea' },
    { icon: '🏠', label: 'Add Property', action: 'property' },
    { icon: '📊', label: 'Analytics', action: 'analytics' },
    { icon: '❤️', label: 'Favorites', action: 'favorites' }
  ];

  const handleActionClick = (action) => {
    onQuickAction(action);
    setIsExpanded(false);
  };

  return (
    <div className="fab-container">
      {isExpanded && (
        <div className="fab-menu animate-slideUp">
          {quickActions.map((action, index) => (
            <button
              key={action.action}
              className="fab-menu-item tooltip"
              data-tooltip={action.label}
              onClick={() => handleActionClick(action.action)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="fab-icon">{action.icon}</span>
            </button>
          ))}
        </div>
      )}
      
      <button 
        className={`fab interactive-element ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={`fab-main-icon ${isExpanded ? 'rotated' : ''}`}>
          {isExpanded ? '✕' : '⚡'}
        </span>
        <div className="notification-badge">4</div>
      </button>
    </div>
  );
};

export default FloatingActionButton;