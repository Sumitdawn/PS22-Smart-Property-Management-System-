import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    
    // Apply theme to body
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.className = newTheme ? 'dark-theme' : 'light-theme';
  };

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle futuristic-btn"
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-inner">
        <div className={`theme-icon ${isDark ? 'active' : ''}`}>
          🌙
        </div>
        <div className={`theme-icon ${!isDark ? 'active' : ''}`}>
          ☀️
        </div>
      </div>
      <span className="theme-label">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;