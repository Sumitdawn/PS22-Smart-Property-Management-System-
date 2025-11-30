import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CursorFollower from './CursorFollower';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success('Login successful!');
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

        <h1>Transform Your Property Value</h1>
        <p>Join thousands of homeowners who have increased their property value with expert recommendations</p>

        <div className="auth-features">
          <div className="feature-item">
            <div className="feature-icon">🏠</div>
            <div className="feature-text">
              <h3>Smart Recommendations</h3>
              <p>AI-powered suggestions tailored to your property</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <div className="feature-text">
              <h3>ROI Calculator</h3>
              <p>Calculate returns on every improvement</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <div className="feature-text">
              <h3>Budget Planning</h3>
              <p>Get cost estimates from verified contractors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-form">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to continue to your dashboard</p>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ fontSize: '0.9rem' }}>Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
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
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>

          <div className="trust-badges">
            <div className="trust-badge">
              <span className="trust-badge-icon">✓</span>
              <span>Secure Login</span>
            </div>
            <div className="trust-badge">
              <span className="trust-badge-icon">🔒</span>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;