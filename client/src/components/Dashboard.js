import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecommendationsList from './RecommendationsList';
import PropertiesList from './PropertiesList';
import PropertySubmission from './PropertySubmission';
import ManageRecommendations from './ManageRecommendations';
import AllProperties from './AllProperties';
import TrendingRecommendations from './TrendingRecommendations';
import AnalyticsDashboard from './AnalyticsDashboard';
import ThemeToggle from './ThemeToggle';
import FloatingActionButton from './FloatingActionButton';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('trending');
  const [properties, setProperties] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
    fetchProperties();
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('/api/recommendations');
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'idea':
        setActiveTab('trending');
        break;
      case 'property':
        setActiveTab('submit');
        break;
      case 'analytics':
        if (user?.role === 'admin') {
          setActiveTab('analytics');
        }
        break;
      case 'favorites':
        // TODO: Implement favorites tab
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏠 Property Enhancement Platform</h1>
          <p>Add value to Indian middle-class residential properties</p>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <span className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </span>
          <button onClick={handleLogout} className="logout-button ripple-effect">
            <span>Logout</span>
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'trending' ? 'active' : ''}
          onClick={() => setActiveTab('trending')}
        >
          🔥 Trending
        </button>
        <button 
          className={activeTab === 'recommendations' ? 'active' : ''}
          onClick={() => setActiveTab('recommendations')}
        >
          💡 All Ideas
        </button>
        <button 
          className={activeTab === 'properties' ? 'active' : ''}
          onClick={() => setActiveTab('properties')}
        >
          🏡 My Properties
        </button>
        <button 
          className={activeTab === 'submit' ? 'active' : ''}
          onClick={() => setActiveTab('submit')}
        >
          📝 Submit Property
        </button>
        {user?.role === 'admin' && (
          <>
            <button 
              className={activeTab === 'analytics' ? 'active' : ''}
              onClick={() => setActiveTab('analytics')}
            >
              📊 Analytics
            </button>
            <button 
              className={activeTab === 'manage-recommendations' ? 'active' : ''}
              onClick={() => setActiveTab('manage-recommendations')}
            >
              ⚙️ Manage Ideas
            </button>
            <button 
              className={activeTab === 'all-properties' ? 'active' : ''}
              onClick={() => setActiveTab('all-properties')}
            >
              🏠 All Properties
            </button>
          </>
        )}
      </nav>

      <main className="dashboard-content">
        {activeTab === 'trending' && <TrendingRecommendations />}
        {activeTab === 'recommendations' && (
          <RecommendationsList 
            recommendations={recommendations} 
            onRefresh={fetchRecommendations}
          />
        )}
        {activeTab === 'properties' && (
          <PropertiesList 
            properties={properties} 
            onRefresh={fetchProperties}
          />
        )}
        {activeTab === 'submit' && (
          <PropertySubmission onSubmit={fetchProperties} />
        )}
        {activeTab === 'analytics' && user?.role === 'admin' && (
          <AnalyticsDashboard />
        )}
        {activeTab === 'manage-recommendations' && user?.role === 'admin' && (
          <ManageRecommendations 
            recommendations={recommendations}
            onRefresh={fetchRecommendations}
          />
        )}
        {activeTab === 'all-properties' && user?.role === 'admin' && (
          <AllProperties properties={properties} />
        )}
      </main>
      
      <FloatingActionButton onQuickAction={handleQuickAction} />
    </div>
  );
};

export default Dashboard;