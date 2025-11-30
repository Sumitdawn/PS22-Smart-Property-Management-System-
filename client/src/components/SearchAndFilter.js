import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilter, categories, propertyTypes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    propertyType: '',
    budgetRange: '',
    difficulty: '',
    timeframe: '',
    roiRange: ''
  });

  const budgetRanges = [
    { label: 'Under ₹25K', value: '0-25000' },
    { label: '₹25K - ₹50K', value: '25000-50000' },
    { label: '₹50K - ₹75K', value: '50000-75000' },
    { label: '₹75K - ₹1L', value: '75000-100000' },
    { label: '₹1L - ₹1.5L', value: '100000-150000' },
    { label: '₹1.5L - ₹2L', value: '150000-200000' },
    { label: '₹2L - ₹3L', value: '200000-300000' },
    { label: '₹3L - ₹5L', value: '300000-500000' },
    { label: '₹5L - ₹10L', value: '500000-1000000' },
    { label: 'Above ₹10L', value: '1000000-999999999' }
  ];

  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
  
  const timeframes = [
    'Less than 1 week',
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '2-3 months',
    'More than 3 months'
  ];

  const roiRanges = [
    { label: 'Below 50%', value: '0-50' },
    { label: '50% - 100%', value: '50-100' },
    { label: '100% - 150%', value: '100-150' },
    { label: '150% - 200%', value: '150-200' },
    { label: 'Above 200%', value: '200-999' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: '',
      propertyType: '',
      budgetRange: '',
      difficulty: '',
      timeframe: '',
      roiRange: ''
    };
    setFilters(emptyFilters);
    setSearchTerm('');
    onFilter(emptyFilters);
    onSearch('');
  };

  return (
    <div className="search-filter-container">
      <div className="search-section">
        <div className="search-box">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search enhancement ideas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => handleSearchChange({ target: { value: '' } })}
              className="clear-search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Budget Range</label>
          <select
            value={filters.budgetRange}
            onChange={(e) => handleFilterChange('budgetRange', e.target.value)}
            className="filter-select"
          >
            <option value="">Any Budget</option>
            {budgetRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Difficulty</label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="filter-select"
          >
            <option value="">Any Difficulty</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Timeframe</label>
          <select
            value={filters.timeframe}
            onChange={(e) => handleFilterChange('timeframe', e.target.value)}
            className="filter-select"
          >
            <option value="">Any Timeframe</option>
            {timeframes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Expected ROI</label>
          <select
            value={filters.roiRange}
            onChange={(e) => handleFilterChange('roiRange', e.target.value)}
            className="filter-select"
          >
            <option value="">Any ROI</option>
            {roiRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <button onClick={clearFilters} className="clear-filters-btn">
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;