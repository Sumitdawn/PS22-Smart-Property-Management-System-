import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractorMarketplace = () => {
  const [contractors, setContractors] = useState([]);
  const [filters, setFilters] = useState({
    specialty: 'all',
    rating: 'all',
    priceRange: 'all',
    location: ''
  });
  const [selectedContractor, setSelectedContractor] = useState(null);

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = async () => {
    // Mock data - replace with actual API call
    const mockContractors = [
      {
        id: 1,
        name: 'Rajesh Construction',
        specialty: 'Kitchen Renovation',
        rating: 4.8,
        reviews: 156,
        completedProjects: 245,
        priceRange: '₹₹₹',
        location: 'Pune, Maharashtra',
        experience: '12 years',
        verified: true,
        avatar: '👷',
        responseTime: '2 hours',
        availability: 'Available'
      },
      {
        id: 2,
        name: 'Modern Interiors Co.',
        specialty: 'Full Home Renovation',
        rating: 4.9,
        reviews: 203,
        completedProjects: 312,
        priceRange: '₹₹₹₹',
        location: 'Mumbai, Maharashtra',
        experience: '15 years',
        verified: true,
        avatar: '🏗️',
        responseTime: '1 hour',
        availability: 'Available'
      },
      {
        id: 3,
        name: 'Budget Builders',
        specialty: 'Bathroom Renovation',
        rating: 4.5,
        reviews: 89,
        completedProjects: 134,
        priceRange: '₹₹',
        location: 'Pune, Maharashtra',
        experience: '8 years',
        verified: true,
        avatar: '🔨',
        responseTime: '4 hours',
        availability: 'Busy'
      },
      {
        id: 4,
        name: 'Elite Renovations',
        specialty: 'Luxury Interiors',
        rating: 5.0,
        reviews: 67,
        completedProjects: 89,
        priceRange: '₹₹₹₹₹',
        location: 'Bangalore, Karnataka',
        experience: '10 years',
        verified: true,
        avatar: '💎',
        responseTime: '30 mins',
        availability: 'Available'
      }
    ];
    setContractors(mockContractors);
  };

  const handleBookConsultation = (contractor) => {
    setSelectedContractor(contractor);
  };

  return (
    <div className="contractor-marketplace">
      <div className="feature-header">
        <h2>👷 Verified Contractor Marketplace</h2>
        <p>Connect with trusted professionals for your project</p>
      </div>

      <div className="marketplace-filters">
        <select 
          value={filters.specialty}
          onChange={(e) => setFilters({...filters, specialty: e.target.value})}
          className="filter-select"
        >
          <option value="all">All Specialties</option>
          <option value="kitchen">Kitchen Renovation</option>
          <option value="bathroom">Bathroom Renovation</option>
          <option value="full">Full Home Renovation</option>
          <option value="luxury">Luxury Interiors</option>
        </select>

        <select 
          value={filters.rating}
          onChange={(e) => setFilters({...filters, rating: e.target.value})}
          className="filter-select"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>

        <select 
          value={filters.priceRange}
          onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
          className="filter-select"
        >
          <option value="all">All Price Ranges</option>
          <option value="budget">Budget (₹₹)</option>
          <option value="moderate">Moderate (₹₹₹)</option>
          <option value="premium">Premium (₹₹₹₹)</option>
          <option value="luxury">Luxury (₹₹₹₹₹)</option>
        </select>

        <input
          type="text"
          placeholder="Search by location..."
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
          className="filter-input"
        />
      </div>

      <div className="contractors-grid">
        {contractors.map(contractor => (
          <div key={contractor.id} className="contractor-card">
            <div className="contractor-header">
              <div className="contractor-avatar">{contractor.avatar}</div>
              <div className="contractor-info">
                <h3>
                  {contractor.name}
                  {contractor.verified && <span className="verified-badge">✓</span>}
                </h3>
                <p className="specialty">{contractor.specialty}</p>
              </div>
              <div className={`availability-badge ${contractor.availability.toLowerCase()}`}>
                {contractor.availability}
              </div>
            </div>

            <div className="contractor-stats">
              <div className="stat">
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{contractor.rating}</span>
                <span className="stat-label">({contractor.reviews} reviews)</span>
              </div>
              <div className="stat">
                <span className="stat-icon">✅</span>
                <span className="stat-value">{contractor.completedProjects}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-icon">💰</span>
                <span className="stat-value">{contractor.priceRange}</span>
              </div>
            </div>

            <div className="contractor-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>{contractor.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎓</span>
                <span>{contractor.experience} experience</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">⏱️</span>
                <span>Responds in {contractor.responseTime}</span>
              </div>
            </div>

            <div className="contractor-actions">
              <button 
                className="btn-primary"
                onClick={() => handleBookConsultation(contractor)}
              >
                📅 Book Consultation
              </button>
              <button className="btn-secondary">💬 Chat Now</button>
              <button className="btn-secondary">📞 Call</button>
            </div>
          </div>
        ))}
      </div>

      {selectedContractor && (
        <div className="consultation-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedContractor(null)}>×</button>
            <h3>Book Consultation with {selectedContractor.name}</h3>
            <form className="consultation-form">
              <input type="date" placeholder="Preferred Date" required />
              <input type="time" placeholder="Preferred Time" required />
              <select required>
                <option value="">Select Service Type</option>
                <option value="kitchen">Kitchen Renovation</option>
                <option value="bathroom">Bathroom Renovation</option>
                <option value="full">Full Home Renovation</option>
              </select>
              <textarea placeholder="Describe your project requirements..." rows="4" required></textarea>
              <button type="submit" className="btn-submit">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorMarketplace;
