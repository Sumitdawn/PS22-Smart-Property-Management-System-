import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  AnimatedDonutChart, 
  AnimatedBarChart, 
  AnimatedLineChart, 
  RadialProgress 
} from './InteractiveCharts';
import RealTimeData from './RealTimeData';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRealTimeUpdate = (newData) => {
    setRealTimeData(newData);
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="analytics-error">
        <h3>Unable to load analytics</h3>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard animate-fadeInUp">
      <div className="analytics-header">
        <div className="header-content">
          <h2>📊 Platform Analytics</h2>
          <p>Comprehensive insights into platform performance</p>
        </div>
        <RealTimeData onDataUpdate={handleRealTimeUpdate} />
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{realTimeData?.activeUsers || analytics.totalUsers}</h3>
            <p>{realTimeData ? 'Active Users' : 'Total Users'}</p>
            <span className="metric-trend positive">
              {realTimeData ? 'Live' : '+12% this month'}
            </span>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">🏠</div>
          <div className="metric-content">
            <h3>{analytics.totalProperties}</h3>
            <p>Properties Submitted</p>
            <span className="metric-trend positive">
              +{realTimeData?.newProperties || analytics.recentActivity.newPropertiesThisWeek} 
              {realTimeData ? ' today' : ' this week'}
            </span>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon">💡</div>
          <div className="metric-content">
            <h3>{analytics.totalRecommendations}</h3>
            <p>Enhancement Ideas</p>
            <span className="metric-trend neutral">Active recommendations</span>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>{analytics.avgROI}%</h3>
            <p>Average ROI</p>
            <span className="metric-trend positive">Excellent returns</span>
          </div>
        </div>

        <div className="metric-card secondary">
          <div className="metric-icon">👀</div>
          <div className="metric-content">
            <h3>{(realTimeData?.totalViews || analytics.totalViews).toLocaleString()}</h3>
            <p>Total Views</p>
            <span className="metric-trend positive">
              {realTimeData ? `Updated: ${realTimeData.timestamp}` : 'High engagement'}
            </span>
          </div>
        </div>

        <div className="metric-card accent">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>{realTimeData?.completedProjects || analytics.totalProjects}</h3>
            <p>Completed Projects</p>
            <span className="metric-trend positive">Success rate: 94%</span>
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="charts-grid">
        <div className="chart-section">
          <AnimatedDonutChart
            data={Object.entries(analytics.popularCategories).map(([category, percentage]) => ({
              label: category,
              value: percentage
            }))}
            title="📊 Category Distribution"
            size={250}
          />
        </div>

        <div className="chart-section">
          <AnimatedBarChart
            data={[
              { label: 'Users', value: analytics.totalUsers },
              { label: 'Properties', value: analytics.totalProperties },
              { label: 'Ideas', value: analytics.totalRecommendations },
              { label: 'Projects', value: Math.floor(analytics.totalProjects / 10) }
            ]}
            title="📈 Platform Growth"
            height={250}
          />
        </div>

        <div className="chart-section">
          <AnimatedLineChart
            data={[
              { label: 'Jan', value: 45 },
              { label: 'Feb', value: 67 },
              { label: 'Mar', value: 89 },
              { label: 'Apr', value: 123 },
              { label: 'May', value: 156 },
              { label: 'Jun', value: 189 }
            ]}
            title="📅 Monthly Growth Trend"
            width={400}
            height={200}
          />
        </div>

        <div className="radial-charts">
          <RadialProgress
            percentage={94}
            title="Success Rate"
            size={120}
          />
          <RadialProgress
            percentage={analytics.avgROI}
            title="Avg ROI"
            size={120}
          />
          <RadialProgress
            percentage={87}
            title="User Satisfaction"
            size={120}
          />
        </div>
      </div>

      {/* Popular Recommendations */}
      <div className="analytics-section">
        <h3>🏆 Top Performing Recommendations</h3>
        <div className="popular-recommendations">
          {analytics.recentActivity.popularRecommendations.map((rec, index) => (
            <div key={index} className="popular-rec-item">
              <div className="rec-rank">#{index + 1}</div>
              <div className="rec-info">
                <h4>{rec.title}</h4>
                <p>{rec.projects} completed projects</p>
              </div>
              <div className="rec-badge">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
                {index > 2 && '⭐'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="analytics-section">
        <h3>📅 Recent Activity</h3>
        <div className="activity-summary">
          <div className="activity-item">
            <div className="activity-icon">🆕</div>
            <div className="activity-content">
              <h4>New Properties This Week</h4>
              <p>{analytics.recentActivity.newPropertiesThisWeek} properties submitted</p>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">📈</div>
            <div className="activity-content">
              <h4>Platform Growth</h4>
              <p>Steady increase in user engagement</p>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">💰</div>
            <div className="activity-content">
              <h4>ROI Performance</h4>
              <p>Average ROI exceeding expectations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="analytics-actions">
        <button className="action-button primary">
          📊 Export Report
        </button>
        <button className="action-button secondary">
          🔄 Refresh Data
        </button>
        <button className="action-button tertiary">
          ⚙️ Configure Alerts
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;