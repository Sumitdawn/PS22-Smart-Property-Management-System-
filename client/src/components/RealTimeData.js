import React, { useState, useEffect } from 'react';

const RealTimeData = ({ onDataUpdate }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Simulate real-time data updates
      const newData = {
        totalViews: Math.floor(Math.random() * 100) + 1200,
        activeUsers: Math.floor(Math.random() * 50) + 150,
        newProperties: Math.floor(Math.random() * 5) + 1,
        completedProjects: Math.floor(Math.random() * 10) + 900,
        timestamp: new Date().toLocaleTimeString()
      };

      onDataUpdate(newData);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isActive, onDataUpdate]);

  return (
    <div className="real-time-indicator">
      <div className={`status-dot ${isActive ? 'active' : 'inactive'}`}></div>
      <span className="status-text">
        {isActive ? 'Live Data' : 'Paused'}
      </span>
      <button 
        onClick={() => setIsActive(!isActive)}
        className="toggle-btn"
      >
        {isActive ? '⏸️' : '▶️'}
      </button>
    </div>
  );
};

export default RealTimeData;