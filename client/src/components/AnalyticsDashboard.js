import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  AnimatedDonutChart, 
  AnimatedBarChart, 
  AnimatedLineChart, 
  RadialProgress,
  EnhancedChartWithFilters 
} from './InteractiveCharts';
import RealTimeData from './RealTimeData';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState(null);
  const [dateRange, setDateRange] = useState('30days');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [metricView, setMetricView] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, categoryFilter]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateRange) params.append('dateRange', dateRange);
      if (categoryFilter && categoryFilter !== 'all') params.append('category', categoryFilter);
      
      const response = await axios.get(`/api/analytics?${params.toString()}`);
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
          <h2>📊 Platform Analytics Dashboard</h2>
          <p>Real-time insights and performance metrics</p>
        </div>
        <RealTimeData onDataUpdate={handleRealTimeUpdate} />
      </div>

      {/* Analytics Filters */}
      <div className="analytics-filters">
        <div className="filter-group">
          <label>Date Range</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="analytics-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="analytics-select"
          >
            <option value="all">All Categories</option>
            <option value="kitchen">Kitchen</option>
            <option value="bathroom">Bathroom</option>
            <option value="living">Living Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="exterior">Exterior</option>
          </select>
        </div>

        <div className="filter-group">
          <label>View</label>
          <select 
            value={metricView} 
            onChange={(e) => setMetricView(e.target.value)}
            className="analytics-select"
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed</option>
            <option value="comparison">Comparison</option>
          </select>
        </div>

        <button className="export-btn">
          📥 Export Report
        </button>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-header">
            <div className="metric-icon">👥</div>
            <div className="metric-badge">
              <span className="badge-dot"></span>
              {realTimeData ? 'Live' : 'Active'}
            </div>
          </div>
          <div className="metric-content">
            <h3>{realTimeData?.activeUsers || analytics.totalUsers}</h3>
            <p>{realTimeData ? 'Active Users Now' : 'Total Users'}</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                {realTimeData ? '+8 today' : '+12% this month'}
              </span>
              <span className="metric-compare">vs last period</span>
            </div>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-header">
            <div className="metric-icon">🏠</div>
            <div className="metric-badge success">New</div>
          </div>
          <div className="metric-content">
            <h3>{analytics.totalProperties}</h3>
            <p>Properties Submitted</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                +{realTimeData?.newProperties || analytics.recentActivity.newPropertiesThisWeek} 
                {realTimeData ? ' today' : ' this week'}
              </span>
              <span className="metric-compare">+18% growth</span>
            </div>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-header">
            <div className="metric-icon">💡</div>
            <div className="metric-badge warning">Active</div>
          </div>
          <div className="metric-content">
            <h3>{analytics.totalRecommendations}</h3>
            <p>Enhancement Ideas</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                +3 this week
              </span>
              <span className="metric-compare">All verified</span>
            </div>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-header">
            <div className="metric-icon">📈</div>
            <div className="metric-badge info">ROI</div>
          </div>
          <div className="metric-content">
            <h3>{analytics.avgROI}%</h3>
            <p>Average ROI</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                +8% increase
              </span>
              <span className="metric-compare">Above industry</span>
            </div>
          </div>
        </div>

        <div className="metric-card secondary">
          <div className="metric-header">
            <div className="metric-icon">👀</div>
            <div className="metric-badge secondary">Views</div>
          </div>
          <div className="metric-content">
            <h3>{(realTimeData?.totalViews || analytics.totalViews).toLocaleString()}</h3>
            <p>Total Page Views</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                +245 today
              </span>
              <span className="metric-compare">High engagement</span>
            </div>
          </div>
        </div>

        <div className="metric-card accent">
          <div className="metric-header">
            <div className="metric-icon">✅</div>
            <div className="metric-badge accent">Success</div>
          </div>
          <div className="metric-content">
            <h3>{realTimeData?.completedProjects || analytics.totalProjects}</h3>
            <p>Completed Projects</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                94% success rate
              </span>
              <span className="metric-compare">Excellent</span>
            </div>
          </div>
        </div>

        <div className="metric-card revenue">
          <div className="metric-header">
            <div className="metric-icon">💰</div>
            <div className="metric-badge revenue">Revenue</div>
          </div>
          <div className="metric-content">
            <h3>₹{(analytics.totalProjects * 15000).toLocaleString()}</h3>
            <p>Total Value Generated</p>
            <div className="metric-footer">
              <span className="metric-trend positive">
                <span className="trend-icon">↗</span>
                +₹2.5L this month
              </span>
              <span className="metric-compare">+22% growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Interactive Charts Section */}
      <div className="charts-grid-enhanced">
        {/* Category Distribution with Filters */}
        <div className="chart-section-enhanced">
          <div className="chart-card">
            <div className="chart-header-controls">
              <h3 className="chart-title">📊 Category Distribution</h3>
              <div className="chart-controls">
                <select className="chart-filter-select">
                  <option value="all">All Categories</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="living">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="exterior">Exterior</option>
                </select>
              </div>
            </div>
            <AnimatedDonutChart
              data={Object.entries(analytics.popularCategories).map(([category, percentage]) => ({
                label: category,
                value: percentage
              }))}
              size={280}
            />
            <div className="chart-insights">
              <div className="insight-item">
                <span className="insight-icon">🏆</span>
                <span className="insight-text">
                  Top: {Object.entries(analytics.popularCategories).sort((a, b) => b[1] - a[1])[0]?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Growth with Time Filters */}
        <div className="chart-section-enhanced">
          <div className="chart-card">
            <div className="chart-header-controls">
              <h3 className="chart-title">📈 Platform Growth Metrics</h3>
              <div className="chart-controls">
                <select className="chart-filter-select">
                  <option value="all">All Metrics</option>
                  <option value="users">Users Only</option>
                  <option value="properties">Properties Only</option>
                  <option value="projects">Projects Only</option>
                </select>
              </div>
            </div>
            <AnimatedBarChart
              data={[
                { label: 'Users', value: analytics.totalUsers },
                { label: 'Properties', value: analytics.totalProperties },
                { label: 'Ideas', value: analytics.totalRecommendations },
                { label: 'Projects', value: Math.floor(analytics.totalProjects / 10) }
              ]}
              height={280}
            />
            <div className="chart-insights">
              <div className="insight-item">
                <span className="insight-icon">📊</span>
                <span className="insight-text">
                  Total Growth: {analytics.totalUsers + analytics.totalProperties + analytics.totalRecommendations}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend with Period Filters */}
        <div className="chart-section-enhanced full-width">
          <div className="chart-card">
            <div className="chart-header-controls">
              <h3 className="chart-title">📅 Monthly Growth Trend</h3>
              <div className="chart-controls">
                <select className="chart-filter-select">
                  <option value="6months">Last 6 Months</option>
                  <option value="12months">Last 12 Months</option>
                  <option value="ytd">Year to Date</option>
                  <option value="all">All Time</option>
                </select>
                <select className="chart-filter-select">
                  <option value="all">All Data</option>
                  <option value="users">Users</option>
                  <option value="properties">Properties</option>
                  <option value="revenue">Revenue</option>
                </select>
              </div>
            </div>
            <AnimatedLineChart
              data={[
                { label: 'Jan', value: 45 },
                { label: 'Feb', value: 67 },
                { label: 'Mar', value: 89 },
                { label: 'Apr', value: 123 },
                { label: 'May', value: 156 },
                { label: 'Jun', value: 189 }
              ]}
              width={800}
              height={280}
            />
            <div className="chart-insights">
              <div className="insight-item">
                <span className="insight-icon">📈</span>
                <span className="insight-text">Growth Rate: +320% over 6 months</span>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🎯</span>
                <span className="insight-text">Avg Monthly Growth: +53%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis with Category Filters */}
        <div className="chart-section-enhanced">
          <div className="chart-card">
            <div className="chart-header-controls">
              <h3 className="chart-title">💰 ROI by Category</h3>
              <div className="chart-controls">
                <select className="chart-filter-select">
                  <option value="all">All Categories</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="living">Living Room</option>
                </select>
              </div>
            </div>
            <AnimatedBarChart
              data={[
                { label: 'Kitchen', value: 180 },
                { label: 'Bathroom', value: 150 },
                { label: 'Living', value: 167 },
                { label: 'Bedroom', value: 100 },
                { label: 'Exterior', value: 143 }
              ]}
              height={280}
            />
            <div className="chart-insights">
              <div className="insight-item">
                <span className="insight-icon">💎</span>
                <span className="insight-text">Best ROI: Kitchen (180%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Completion Rate */}
        <div className="chart-section-enhanced">
          <div className="chart-card">
            <div className="chart-header-controls">
              <h3 className="chart-title">✅ Project Status</h3>
              <div className="chart-controls">
                <select className="chart-filter-select">
                  <option value="all">All Projects</option>
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <AnimatedDonutChart
              data={[
                { label: 'Completed', value: 856 },
                { label: 'Ongoing', value: 43 },
                { label: 'Pending', value: 10 }
              ]}
              size={280}
            />
            <div className="chart-insights">
              <div className="insight-item">
                <span className="insight-icon">✨</span>
                <span className="insight-text">Success Rate: 94.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Radial Charts */}
        <div className="chart-section-enhanced full-width">
          <div className="chart-card">
            <h3 className="chart-title">🎯 Performance Metrics</h3>
            <div className="radial-charts-grid">
              <div className="radial-item">
                <RadialProgress
                  percentage={94}
                  title="Success Rate"
                  size={140}
                />
                <p className="radial-description">Project completion success</p>
              </div>
              <div className="radial-item">
                <RadialProgress
                  percentage={analytics.avgROI}
                  title="Avg ROI"
                  size={140}
                />
                <p className="radial-description">Return on investment</p>
              </div>
              <div className="radial-item">
                <RadialProgress
                  percentage={87}
                  title="User Satisfaction"
                  size={140}
                />
                <p className="radial-description">Customer happiness score</p>
              </div>
              <div className="radial-item">
                <RadialProgress
                  percentage={92}
                  title="Quality Score"
                  size={140}
                />
                <p className="radial-description">Work quality rating</p>
              </div>
              <div className="radial-item">
                <RadialProgress
                  percentage={78}
                  title="On-Time Delivery"
                  size={140}
                />
                <p className="radial-description">Timeline adherence</p>
              </div>
            </div>
          </div>
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