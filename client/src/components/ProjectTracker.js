import React, { useState } from 'react';

const ProjectTracker = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Kitchen Renovation',
      contractor: 'Rajesh Construction',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 65,
      status: 'In Progress',
      budget: 250000,
      spent: 162500,
      milestones: [
        { id: 1, name: 'Demolition', status: 'completed', date: '2024-01-18' },
        { id: 2, name: 'Plumbing Work', status: 'completed', date: '2024-01-25' },
        { id: 3, name: 'Electrical Work', status: 'in-progress', date: '2024-02-01' },
        { id: 4, name: 'Tiling', status: 'pending', date: '2024-02-08' },
        { id: 5, name: 'Cabinet Installation', status: 'pending', date: '2024-02-12' }
      ],
      updates: [
        { date: '2024-01-30', message: 'Electrical work started', image: '⚡' },
        { date: '2024-01-25', message: 'Plumbing completed successfully', image: '🔧' },
        { date: '2024-01-18', message: 'Demolition work completed', image: '🔨' }
      ],
      team: [
        { name: 'Rajesh Kumar', role: 'Project Manager', avatar: '👷' },
        { name: 'Amit Singh', role: 'Electrician', avatar: '⚡' },
        { name: 'Suresh Patil', role: 'Plumber', avatar: '🔧' }
      ]
    },
    {
      id: 2,
      name: 'Bathroom Makeover',
      contractor: 'Modern Interiors Co.',
      startDate: '2024-02-01',
      endDate: '2024-02-20',
      progress: 30,
      status: 'In Progress',
      budget: 150000,
      spent: 45000,
      milestones: [
        { id: 1, name: 'Design Approval', status: 'completed', date: '2024-02-01' },
        { id: 2, name: 'Material Procurement', status: 'completed', date: '2024-02-05' },
        { id: 3, name: 'Demolition', status: 'in-progress', date: '2024-02-08' },
        { id: 4, name: 'Installation', status: 'pending', date: '2024-02-15' }
      ],
      updates: [
        { date: '2024-02-08', message: 'Demolition in progress', image: '🔨' },
        { date: '2024-02-05', message: 'All materials delivered', image: '📦' }
      ],
      team: [
        { name: 'Priya Sharma', role: 'Project Manager', avatar: '👷' },
        { name: 'Ravi Kumar', role: 'Mason', avatar: '🧱' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'pending': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="project-tracker-container">
      <div className="feature-header">
        <h2>📊 Live Project Tracker</h2>
        <p>Monitor your renovation projects in real-time</p>
      </div>

      <div className="projects-overview">
        {projects.map(project => (
          <div key={project.id} className="project-overview-card">
            <div className="project-header">
              <div>
                <h3>{project.name}</h3>
                <p className="contractor-name">by {project.contractor}</p>
              </div>
              <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Overall Progress</span>
                <span className="progress-percentage">{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-stats">
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <div>
                  <p className="stat-label">Budget</p>
                  <p className="stat-value">₹{project.budget.toLocaleString()}</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💸</span>
                <div>
                  <p className="stat-label">Spent</p>
                  <p className="stat-value">₹{project.spent.toLocaleString()}</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <div>
                  <p className="stat-label">Timeline</p>
                  <p className="stat-value">{project.startDate} to {project.endDate}</p>
                </div>
              </div>
            </div>

            <button 
              className="view-details-btn"
              onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
            >
              {activeProject === project.id ? 'Hide Details' : 'View Details'} →
            </button>

            {activeProject === project.id && (
              <div className="project-details">
                <div className="milestones-section">
                  <h4>🎯 Milestones</h4>
                  <div className="milestones-timeline">
                    {project.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="milestone-item">
                        <div 
                          className="milestone-marker"
                          style={{ backgroundColor: getStatusColor(milestone.status) }}
                        >
                          {milestone.status === 'completed' && '✓'}
                          {milestone.status === 'in-progress' && '⏳'}
                          {milestone.status === 'pending' && '○'}
                        </div>
                        <div className="milestone-content">
                          <h5>{milestone.name}</h5>
                          <p className="milestone-date">{milestone.date}</p>
                          <span className={`milestone-status ${milestone.status}`}>
                            {milestone.status.replace('-', ' ')}
                          </span>
                        </div>
                        {index < project.milestones.length - 1 && (
                          <div className="milestone-connector"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="updates-section">
                  <h4>📢 Recent Updates</h4>
                  <div className="updates-list">
                    {project.updates.map((update, index) => (
                      <div key={index} className="update-item">
                        <div className="update-icon">{update.image}</div>
                        <div className="update-content">
                          <p className="update-message">{update.message}</p>
                          <p className="update-date">{update.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="team-section">
                  <h4>👥 Project Team</h4>
                  <div className="team-grid">
                    {project.team.map((member, index) => (
                      <div key={index} className="team-member">
                        <div className="member-avatar">{member.avatar}</div>
                        <div className="member-info">
                          <h5>{member.name}</h5>
                          <p>{member.role}</p>
                        </div>
                        <button className="contact-btn">💬</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  <button className="action-btn primary">📸 Upload Photos</button>
                  <button className="action-btn">💬 Message Contractor</button>
                  <button className="action-btn">📄 View Contract</button>
                  <button className="action-btn">💰 Make Payment</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="tracker-features">
        <h3>Tracker Features</h3>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">📸</span>
            <h4>Photo Updates</h4>
            <p>Daily progress photos from site</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💬</span>
            <h4>Direct Communication</h4>
            <p>Chat with contractors anytime</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <h4>Payment Tracking</h4>
            <p>Milestone-based payments</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <h4>Budget Monitoring</h4>
            <p>Real-time expense tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTracker;
