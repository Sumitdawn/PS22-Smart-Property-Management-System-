import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PropertySubmission = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    area: '',
    budget: '',
    currentValue: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const propertyTypes = ['1BHK', '2BHK', '3BHK', '4BHK', 'Villa', 'Independent House'];
  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/properties', {
        ...formData,
        area: parseInt(formData.area),
        budget: parseInt(formData.budget),
        currentValue: parseInt(formData.currentValue)
      });
      
      toast.success('Property submitted successfully!');
      setFormData({
        type: '',
        location: '',
        area: '',
        budget: '',
        currentValue: '',
        description: ''
      });
      onSubmit();
    } catch (error) {
      toast.error('Failed to submit property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-submission">
      <div className="submission-header">
        <h2>📝 Submit Your Property Details</h2>
        <p>Get personalized enhancement recommendations for your property</p>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-row">
          <div className="form-group">
            <label>Property Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {indianCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Area (sq ft) *</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g., 850"
              required
              min="200"
              max="5000"
            />
          </div>

          <div className="form-group">
            <label>Enhancement Budget (₹) *</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 500000"
              required
              min="10000"
              max="5000000"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Current Property Value (₹)</label>
          <input
            type="number"
            name="currentValue"
            value={formData.currentValue}
            onChange={handleChange}
            placeholder="e.g., 4500000"
            min="500000"
            max="50000000"
          />
        </div>

        <div className="form-group">
          <label>Property Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property, current condition, specific areas you want to improve..."
            rows="4"
          />
        </div>

        <div className="form-info">
          <h4>💡 What happens next?</h4>
          <ul>
            <li>Our system will analyze your property details</li>
            <li>You'll get personalized enhancement recommendations</li>
            <li>Each recommendation includes cost, value increase, and ROI</li>
            <li>Filter recommendations by budget and property type</li>
          </ul>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Submitting...' : '🚀 Submit Property & Get Recommendations'}
        </button>
      </form>
    </div>
  );
};

export default PropertySubmission;