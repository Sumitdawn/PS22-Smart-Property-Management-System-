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
import VirtualTour from './VirtualTour';
import ContractorMarketplace from './ContractorMarketplace';
import LoanCalculator from './LoanCalculator';
import MaterialStore from './MaterialStore';
import ProjectTracker from './ProjectTracker';
import QuickStartGuide from './QuickStartGuide';
import '../styles/NewFeatures.css';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('trending');
  const [properties, setProperties] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    fetchRecommendations();
    fetchProperties();
    
    // Set up polling for real-time updates every 5 seconds
    const interval = setInterval(() => {
      fetchRecommendations();
      fetchProperties();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get('/api/recommendations');
      setRecommendations(response.data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const fetchProperties = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get('/api/properties');
      setProperties(response.data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
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
          <div className="dashboard-logo">
            <div className="dashboard-logo-icon">🏠</div>
            <div className="dashboard-logo-text">
              <h2>
                <span className="logo-estate">Estate</span>
                <span className="logo-flow">Flow</span>
              </h2>
              <p>Affordable to Opulent</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-search">
          <input 
            type="text" 
            placeholder="Search properties, ideas, or locations..." 
          />
        </div>
        <div className="header-actions">
          <button 
            className="help-btn"
            onClick={() => setShowGuide(true)}
            title="Quick Start Guide"
          >
            ❓ Help
          </button>
          
          <div className="refresh-indicator">
            {isRefreshing ? (
              <span className="refreshing">
                <span className="spinner"></span> Updating...
              </span>
            ) : (
              <span className="last-update">
                ✓ Updated {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="header-notification">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>
          
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-button">
            Logout
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
          className={activeTab === 'virtual-tour' ? 'active' : ''}
          onClick={() => setActiveTab('virtual-tour')}
        >
          🏠 Virtual Tour
        </button>
        <button 
          className={activeTab === 'contractors' ? 'active' : ''}
          onClick={() => setActiveTab('contractors')}
        >
          👷 Find Contractors
        </button>
        <button 
          className={activeTab === 'materials' ? 'active' : ''}
          onClick={() => setActiveTab('materials')}
        >
          🏪 Buy Materials
        </button>
        <button 
          className={activeTab === 'loan' ? 'active' : ''}
          onClick={() => setActiveTab('loan')}
        >
          💰 Loan Calculator
        </button>
        <button 
          className={activeTab === 'tracker' ? 'active' : ''}
          onClick={() => setActiveTab('tracker')}
        >
          📊 Track Projects
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
        {activeTab === 'virtual-tour' && <VirtualTour />}
        {activeTab === 'contractors' && <ContractorMarketplace />}
        {activeTab === 'materials' && <MaterialStore />}
        {activeTab === 'loan' && <LoanCalculator />}
        {activeTab === 'tracker' && <ProjectTracker />}
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
      
      {showGuide && <QuickStartGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default Dashboard;