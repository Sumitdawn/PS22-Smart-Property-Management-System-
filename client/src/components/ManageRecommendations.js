import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageRecommendations = ({ recommendations, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingRec, setEditingRec] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    estimatedCost: '',
    valueIncrease: '',
    timeRequired: '',
    difficulty: '',
    applicableFor: []
  });

  const categories = ['Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Exterior', 'Other'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const propertyTypes = ['1BHK', '2BHK', '3BHK', '4BHK', 'Villa'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (propertyType) => {
    setFormData(prev => ({
      ...prev,
      applicableFor: prev.applicableFor.includes(propertyType)
        ? prev.applicableFor.filter(type => type !== propertyType)
        : [...prev.applicableFor, propertyType]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        estimatedCost: parseInt(formData.estimatedCost),
        valueIncrease: parseInt(formData.valueIncrease)
      };

      if (editingRec) {
        await axios.put(`/api/recommendations/${editingRec.id}`, payload);
        toast.success('Recommendation updated successfully!');
      } else {
        await axios.post('/api/recommendations', payload);
        toast.success('Recommendation created successfully!');
      }

      resetForm();
      onRefresh();
    } catch (error) {
      toast.error('Failed to save recommendation');
    }
  };

  const handleEdit = (rec) => {
    setEditingRec(rec);
    setFormData({
      title: rec.title,
      category: rec.category,
      description: rec.description,
      estimatedCost: rec.estimatedCost.toString(),
      valueIncrease: rec.valueIncrease.toString(),
      timeRequired: rec.timeRequired,
      difficulty: rec.difficulty,
      applicableFor: rec.applicableFor
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recommendation?')) {
      try {
        await axios.delete(`/api/recommendations/${id}`);
        toast.success('Recommendation deleted successfully!');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete recommendation');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      estimatedCost: '',
      valueIncrease: '',
      timeRequired: '',
      difficulty: '',
      applicableFor: []
    });
    setEditingRec(null);
    setShowForm(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="manage-recommendations">
      <div className="manage-header">
        <h2>⚙️ Manage Enhancement Ideas</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="add-button"
        >
          {showForm ? '❌ Cancel' : '➕ Add New Idea'}
        </button>
      </div>

      {showForm && (
        <div className="recommendation-form">
          <h3>{editingRec ? 'Edit Recommendation' : 'Add New Recommendation'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Estimated Cost (₹) *</label>
                <input
                  type="number"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Value Increase (₹) *</label>
                <input
                  type="number"
                  name="valueIncrease"
                  value={formData.valueIncrease}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Time Required *</label>
                <input
                  type="text"
                  name="timeRequired"
                  value={formData.timeRequired}
                  onChange={handleInputChange}
                  placeholder="e.g., 2-3 weeks"
                  required
                />
              </div>
              <div className="form-group">
                <label>Difficulty *</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Difficulty</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Applicable For *</label>
              <div className="checkbox-group">
                {propertyTypes.map(type => (
                  <label key={type} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.applicableFor.includes(type)}
                      onChange={() => handleCheckboxChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                {editingRec ? 'Update' : 'Create'} Recommendation
              </button>
              <button type="button" onClick={resetForm} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="recommendations-table">
        <h3>All Recommendations ({recommendations.length})</h3>
        <div className="table-container">
          {recommendations.map(rec => (
            <div key={rec.id} className="recommendation-row">
              <div className="rec-info">
                <h4>{rec.title}</h4>
                <span className="category">{rec.category}</span>
                <p>{rec.description}</p>
              </div>
              <div className="rec-details">
                <div className="detail">
                  <span>Cost: {formatCurrency(rec.estimatedCost)}</span>
                </div>
                <div className="detail">
                  <span>Value: {formatCurrency(rec.valueIncrease)}</span>
                </div>
                <div className="detail">
                  <span>Time: {rec.timeRequired}</span>
                </div>
                <div className="detail">
                  <span>Difficulty: {rec.difficulty}</span>
                </div>
              </div>
              <div className="rec-actions">
                <button 
                  onClick={() => handleEdit(rec)}
                  className="edit-btn"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(rec.id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRecommendations;