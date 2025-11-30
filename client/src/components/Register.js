import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CursorFollower from './CursorFollower';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-left-panel">
        <div className="auth-logo-section">
          <div className="auth-logo">
            <div className="logo-icon">🏠</div>
            <div className="logo-text">
              <span className="logo-estate">Estate</span>
              <span className="logo-flow">Flow</span>
            </div>
          </div>
          <p className="logo-tagline">AFFORDABLE TO OPULENT</p>
        </div>
        
        <h1>Start Your Property Journey</h1>
        <p>Create an account and unlock professional property enhancement tools</p>
        
        <div className="auth-features">
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <div className="feature-text">
              <h3>Free Property Analysis</h3>
              <p>Get instant valuation and improvement suggestions</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <div className="feature-text">
              <h3>Expert Network</h3>
              <p>Connect with verified contractors and designers</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div className="feature-text">
              <h3>Track Progress</h3>
              <p>Monitor your property improvements in real-time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-form">
          <h2>Create Account</h2>
          <p className="subtitle">Join our community of smart homeowners</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
              <small style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                Must be at least 6 characters
              </small>
            </div>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" required style={{ marginTop: '0.25rem' }} />
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or sign up with</span>
          </div>

          <div className="social-login">
            <button className="social-btn">
              <span>🔵</span> Google
            </button>
            <button className="social-btn">
              <span>📘</span> Facebook
            </button>
          </div>

          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>

          <div className="trust-badges">
            <div className="trust-badge">
              <span className="trust-badge-icon">✓</span>
              <span>Free Forever</span>
            </div>
            <div className="trust-badge">
              <span className="trust-badge-icon">🔒</span>
              <span>Data Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;