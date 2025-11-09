import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilter, categories, propertyTypes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    propertyType: '',
    budgetRange: '',
    difficulty: ''
  });

  const budgetRanges = [
    { label: 'Under ₹50K', value: '0-50000' },
    { label: '₹50K - ₹1L', value: '50000-100000' },
    { label: '₹1L - ₹2L', value: '100000-200000' },
    { label: '₹2L - ₹5L', value: '200000-500000' },
    { label: 'Above ₹5L', value: '500000-999999999' }
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

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
      difficulty: ''
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

        <button onClick={clearFilters} className="clear-filters-btn">
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;