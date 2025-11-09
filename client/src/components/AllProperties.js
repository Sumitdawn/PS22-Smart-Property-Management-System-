import React from 'react';

const AllProperties = ({ properties }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getTotalValue = () => {
    return properties.reduce((sum, prop) => sum + (prop.currentValue || 0), 0);
  };

  const getTotalBudget = () => {
    return properties.reduce((sum, prop) => sum + prop.budget, 0);
  };

  return (
    <div className="all-properties">
      <div className="properties-header">
        <h2>📊 All Properties Dashboard</h2>
        <div className="stats-row">
          <div className="stat-card">
            <h3>{properties.length}</h3>
            <p>Total Properties</p>
          </div>
          <div className="stat-card">
            <h3>{formatCurrency(getTotalValue())}</h3>
            <p>Total Property Value</p>
          </div>
          <div className="stat-card">
            <h3>{formatCurrency(getTotalBudget())}</h3>
            <p>Total Enhancement Budget</p>
          </div>
        </div>
      </div>

      <div className="properties-table">
        <div className="table-header">
          <div className="col">Property</div>
          <div className="col">Location</div>
          <div className="col">Area</div>
          <div className="col">Budget</div>
          <div className="col">Current Value</div>
          <div className="col">Submitted</div>
          <div className="col">Actions</div>
        </div>

        {properties.map(property => (
          <div key={property.id} className="table-row">
            <div className="col">
              <div className="property-info">
                <strong>{property.type}</strong>
                {property.description && (
                  <p className="description">{property.description.substring(0, 50)}...</p>
                )}
              </div>
            </div>
            <div className="col">📍 {property.location}</div>
            <div className="col">{property.area} sq ft</div>
            <div className="col budget">{formatCurrency(property.budget)}</div>
            <div className="col current-value">
              {property.currentValue ? formatCurrency(property.currentValue) : 'Not specified'}
            </div>
            <div className="col">{formatDate(property.submittedAt)}</div>
            <div className="col actions">
              <button className="action-btn view">👁️ View</button>
              <button className="action-btn recommend">💡 Recommend</button>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>No Properties Submitted Yet</h3>
          <p>Users haven't submitted any properties for enhancement recommendations</p>
        </div>
      )}
    </div>
  );
};

export default AllProperties;