import React, { useState } from 'react';
import axios from 'axios';
import '../styles/VirtualTourEnhanced.css';

const VirtualTour = () => {
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);

  const rooms = [
    { id: 'living', name: 'Living Room', icon: '🛋️', color: '#7877c6' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳', color: '#ff77c6' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️', color: '#77dbff' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿', color: '#77ffc6' },
    { id: 'exterior', name: 'Exterior', icon: '🏡', color: '#ffc677' }
  ];

  const styles = [
    { id: 'modern', name: 'Modern', preview: '🏢', description: 'Clean lines, minimal decor' },
    { id: 'traditional', name: 'Traditional', preview: '🏛️', description: 'Classic & timeless' },
    { id: 'minimalist', name: 'Minimalist', preview: '⬜', description: 'Less is more' },
    { id: 'luxury', name: 'Luxury', preview: '💎', description: 'Premium & elegant' },
    { id: 'rustic', name: 'Rustic', preview: '🪵', description: 'Natural & cozy' }
  ];

  const exampleTransformations = [
    // Kitchen Examples
    {
      id: 1,
      room: 'kitchen',
      style: 'modern',
      title: 'Modern Modular Kitchen Transformation',
      beforeDesc: 'Old-style kitchen with dated cabinets',
      afterDesc: 'Sleek modular kitchen with granite countertops',
      cost: '₹2,50,000',
      valueIncrease: '₹5,00,000',
      timeline: '3 weeks',
      rating: 4.9,
      projects: 245,
      beforeImage: '🏚️',
      afterImage: '✨'
    },
    {
      id: 2,
      room: 'kitchen',
      style: 'luxury',
      title: 'Premium Kitchen with Island',
      beforeDesc: 'Basic kitchen layout',
      afterDesc: 'Luxury kitchen with central island & premium appliances',
      cost: '₹4,50,000',
      valueIncrease: '₹8,00,000',
      timeline: '4 weeks',
      rating: 4.9,
      projects: 178,
      beforeImage: '🏚️',
      afterImage: '💎'
    },
    {
      id: 3,
      room: 'kitchen',
      style: 'traditional',
      title: 'Classic Wooden Kitchen',
      beforeDesc: 'Plain kitchen space',
      afterDesc: 'Traditional wooden cabinets with modern amenities',
      cost: '₹2,80,000',
      valueIncrease: '₹5,50,000',
      timeline: '3.5 weeks',
      rating: 4.7,
      projects: 156,
      beforeImage: '🏚️',
      afterImage: '🪵'
    },
    // Living Room Examples
    {
      id: 4,
      room: 'living',
      style: 'modern',
      title: 'Contemporary Living Space',
      beforeDesc: 'Basic living room',
      afterDesc: 'Modern living with false ceiling & ambient lighting',
      cost: '₹2,20,000',
      valueIncrease: '₹4,50,000',
      timeline: '2.5 weeks',
      rating: 4.8,
      projects: 234,
      beforeImage: '🏚️',
      afterImage: '✨'
    },
    {
      id: 5,
      room: 'living',
      style: 'luxury',
      title: 'Luxury Living Room Makeover',
      beforeDesc: 'Simple living space',
      afterDesc: 'Elegant living with designer furniture & lighting',
      cost: '₹3,50,000',
      valueIncrease: '₹6,50,000',
      timeline: '4 weeks',
      rating: 4.9,
      projects: 189,
      beforeImage: '🏚️',
      afterImage: '💎'
    },
    {
      id: 6,
      room: 'living',
      style: 'minimalist',
      title: 'Minimalist Living Design',
      beforeDesc: 'Cluttered living area',
      afterDesc: 'Clean, spacious with hidden storage',
      cost: '₹1,80,000',
      valueIncrease: '₹3,80,000',
      timeline: '2 weeks',
      rating: 4.6,
      projects: 167,
      beforeImage: '🏚️',
      afterImage: '⬜'
    },
    // Bedroom Examples
    {
      id: 7,
      room: 'bedroom',
      style: 'modern',
      title: 'Modern Master Bedroom',
      beforeDesc: 'Basic bedroom setup',
      afterDesc: 'Contemporary bedroom with built-in wardrobe',
      cost: '₹2,00,000',
      valueIncrease: '₹4,00,000',
      timeline: '2.5 weeks',
      rating: 4.7,
      projects: 198,
      beforeImage: '🏚️',
      afterImage: '✨'
    },
    {
      id: 8,
      room: 'bedroom',
      style: 'minimalist',
      title: 'Minimalist Bedroom Design',
      beforeDesc: 'Cluttered bedroom space',
      afterDesc: 'Clean, organized with smart storage',
      cost: '₹1,50,000',
      valueIncrease: '₹3,20,000',
      timeline: '2 weeks',
      rating: 4.6,
      projects: 134,
      beforeImage: '🏚️',
      afterImage: '⬜'
    },
    {
      id: 9,
      room: 'bedroom',
      style: 'luxury',
      title: 'Luxury Bedroom Suite',
      beforeDesc: 'Standard bedroom',
      afterDesc: 'Premium bedroom with walk-in closet',
      cost: '₹3,20,000',
      valueIncrease: '₹6,00,000',
      timeline: '3.5 weeks',
      rating: 4.8,
      projects: 145,
      beforeImage: '🏚️',
      afterImage: '💎'
    },
    // Bathroom Examples
    {
      id: 10,
      room: 'bathroom',
      style: 'modern',
      title: 'Contemporary Bathroom Upgrade',
      beforeDesc: 'Basic bathroom setup',
      afterDesc: 'Modern bathroom with premium fittings',
      cost: '₹1,80,000',
      valueIncrease: '₹3,50,000',
      timeline: '2 weeks',
      rating: 4.7,
      projects: 156,
      beforeImage: '🏚️',
      afterImage: '✨'
    },
    {
      id: 11,
      room: 'bathroom',
      style: 'luxury',
      title: 'Spa-Style Luxury Bathroom',
      beforeDesc: 'Old bathroom',
      afterDesc: 'Spa-like bathroom with jacuzzi & premium tiles',
      cost: '₹3,50,000',
      valueIncrease: '₹6,50,000',
      timeline: '3 weeks',
      rating: 4.9,
      projects: 123,
      beforeImage: '🏚️',
      afterImage: '💎'
    },
    // Exterior Examples
    {
      id: 12,
      room: 'exterior',
      style: 'modern',
      title: 'Modern Facade Renovation',
      beforeDesc: 'Plain exterior walls',
      afterDesc: 'Contemporary facade with texture paint',
      cost: '₹2,50,000',
      valueIncrease: '₹5,50,000',
      timeline: '3 weeks',
      rating: 4.8,
      projects: 167,
      beforeImage: '🏚️',
      afterImage: '✨'
    },
    {
      id: 13,
      room: 'exterior',
      style: 'traditional',
      title: 'Classic Exterior Design',
      beforeDesc: 'Dated exterior look',
      afterDesc: 'Traditional architecture with stone cladding',
      cost: '₹3,00,000',
      valueIncrease: '₹6,00,000',
      timeline: '4 weeks',
      rating: 4.7,
      projects: 134,
      beforeImage: '🏚️',
      afterImage: '🏛️'
    },
    {
      id: 14,
      room: 'exterior',
      style: 'rustic',
      title: 'Rustic Charm Exterior',
      beforeDesc: 'Simple exterior',
      afterDesc: 'Rustic design with wooden elements',
      cost: '₹2,80,000',
      valueIncrease: '₹5,80,000',
      timeline: '3.5 weeks',
      rating: 4.6,
      projects: 112,
      beforeImage: '🏚️',
      afterImage: '🪵'
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setShowComparison(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredExamples = exampleTransformations.filter(ex => 
    ex.room === selectedRoom && ex.style === selectedStyle
  );

  return (
    <div className="virtual-tour-container">
      <div className="feature-header-enhanced">
        <div className="header-badge">✨ AI-Powered Visualization</div>
        <h2>🏠 Virtual Property Tour & Visualization</h2>
        <p>See your property transformation before you invest - Upload your photo and get instant results</p>
        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Visualizations Created</span>
          </div>
          <div className="stat-badge">
            <span className="stat-number">95%</span>
            <span className="stat-label">Accuracy Rate</span>
          </div>
          <div className="stat-badge">
            <span className="stat-number">2 Min</span>
            <span className="stat-label">Processing Time</span>
          </div>
        </div>
      </div>

      <div className="tour-content-enhanced">
        <div className="tour-controls-enhanced">
          <div className="control-section-enhanced">
            <div className="section-header">
              <h3>🎨 Select Room Type</h3>
              <span className="section-badge">Step 1</span>
            </div>
            <div className="room-selector-grid">
              {rooms.map(room => (
                <button
                  key={room.id}
                  className={`room-btn-enhanced ${selectedRoom === room.id ? 'active' : ''}`}
                  onClick={() => setSelectedRoom(room.id)}
                  style={{ '--room-color': room.color }}
                >
                  <span className="room-icon-large">{room.icon}</span>
                  <span className="room-name">{room.name}</span>
                  {selectedRoom === room.id && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section-enhanced">
            <div className="section-header">
              <h3>💎 Choose Design Style</h3>
              <span className="section-badge">Step 2</span>
            </div>
            <div className="style-selector-grid">
              {styles.map(style => (
                <button
                  key={style.id}
                  className={`style-btn-enhanced ${selectedStyle === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <span className="style-icon">{style.preview}</span>
                  <div className="style-info">
                    <span className="style-name">{style.name}</span>
                    <span className="style-desc">{style.description}</span>
                  </div>
                  {selectedStyle === style.id && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section-enhanced">
            <div className="section-header">
              <h3>📸 Upload Your Photo</h3>
              <span className="section-badge">Step 3</span>
            </div>
            <div className="upload-section-enhanced">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="tour-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="tour-upload" className="upload-btn-enhanced">
                <div className="upload-icon">📤</div>
                <div className="upload-text">
                  <span className="upload-title">Click to Upload</span>
                  <span className="upload-subtitle">or drag and drop</span>
                </div>
              </label>
              <div className="upload-tips">
                <p className="tip-title">💡 Tips for best results:</p>
                <ul>
                  <li>✓ Use good lighting</li>
                  <li>✓ Capture full room view</li>
                  <li>✓ JPG, PNG up to 10MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="tour-preview-enhanced">
          <div className="preview-header-enhanced">
            <div className="preview-title-section">
              <h3>
                {rooms.find(r => r.id === selectedRoom)?.icon} {rooms.find(r => r.id === selectedRoom)?.name} - 
                {styles.find(s => s.id === selectedStyle)?.name} Style
              </h3>
              <p className="preview-subtitle">AI-Generated Visualization</p>
            </div>
            <div className="preview-actions-enhanced">
              <button className="action-btn-enhanced primary">💾 Save</button>
              <button className="action-btn-enhanced">📤 Share</button>
              <button className="action-btn-enhanced">🖨️ Print</button>
            </div>
          </div>
          
          {showComparison && uploadedImage ? (
            <div className="comparison-view">
              <div className="comparison-slider">
                <div className="comparison-side before-side">
                  <div className="comparison-label">BEFORE</div>
                  <img src={uploadedImage} alt="Original room" className="comparison-image" />
                </div>
                <div className="comparison-divider">
                  <div className="divider-handle">⟷</div>
                </div>
                <div className="comparison-side after-side">
                  <div className="comparison-label">AFTER (AI Generated)</div>
                  <div className="ai-preview-overlay">
                    <img src={uploadedImage} alt="Transformed room" className="comparison-image transformed" />
                    <div className="ai-processing-badge">
                      <span className="processing-icon">✨</span>
                      <span>AI Enhanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="preview-canvas-enhanced">
              <div className="placeholder-preview-enhanced">
                <div className="placeholder-animation">
                  <div className="placeholder-icon-large">{rooms.find(r => r.id === selectedRoom)?.icon}</div>
                  <div className="upload-prompt">
                    <h4>Upload Your Photo to See Magic! ✨</h4>
                    <p>Get instant AI-powered visualization of your space</p>
                    <label htmlFor="tour-upload" className="inline-upload-btn">
                      📸 Upload Photo Now
                    </label>
                  </div>
                </div>
                <div className="feature-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">⚡</span>
                    <span>Instant Results</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🎨</span>
                    <span>Multiple Styles</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">💯</span>
                    <span>High Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="preview-info-enhanced">
            <div className="info-card-enhanced cost">
              <div className="info-icon-wrapper">
                <span className="info-icon-large">💰</span>
              </div>
              <div className="info-content">
                <h4>Estimated Cost</h4>
                <p className="info-value">₹1,50,000 - ₹2,50,000</p>
                <span className="info-badge">Budget Friendly</span>
              </div>
            </div>
            <div className="info-card-enhanced timeline">
              <div className="info-icon-wrapper">
                <span className="info-icon-large">⏱️</span>
              </div>
              <div className="info-content">
                <h4>Timeline</h4>
                <p className="info-value">2-3 weeks</p>
                <span className="info-badge">Fast Delivery</span>
              </div>
            </div>
            <div className="info-card-enhanced value">
              <div className="info-icon-wrapper">
                <span className="info-icon-large">📈</span>
              </div>
              <div className="info-content">
                <h4>Value Increase</h4>
                <p className="info-value">+₹4,00,000</p>
                <span className="info-badge success">167% ROI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sample-transformations-enhanced">
        <div className="transformations-header">
          <h3>🎨 Real Transformation Examples</h3>
          <p>See how we've transformed spaces like yours</p>
        </div>
        
        {filteredExamples.length > 0 ? (
          <div className="transformation-grid-enhanced">
            {filteredExamples.map(example => (
              <div 
                key={example.id} 
                className="transformation-card-enhanced"
                onClick={() => setSelectedExample(example)}
              >
                <div className="transformation-images">
                  <div className="before-after-split">
                    <div className="split-side before">
                      <span className="split-label">Before</span>
                      <div className="example-placeholder before-img">🏚️</div>
                    </div>
                    <div className="split-divider"></div>
                    <div className="split-side after">
                      <span className="split-label">After</span>
                      <div className="example-placeholder after-img">✨</div>
                    </div>
                  </div>
                </div>
                <div className="transformation-details">
                  <h4>{example.title}</h4>
                  <div className="transformation-stats">
                    <div className="stat">
                      <span className="stat-icon">⭐</span>
                      <span>{example.rating}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">✅</span>
                      <span>{example.projects} projects</span>
                    </div>
                  </div>
                  <div className="transformation-info-grid">
                    <div className="info-item">
                      <span className="label">Cost:</span>
                      <span className="value">{example.cost}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Value:</span>
                      <span className="value success">{example.valueIncrease}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Time:</span>
                      <span className="value">{example.timeline}</span>
                    </div>
                  </div>
                  <button className="view-details-btn">View Full Details →</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-examples">
            <p>🔍 No examples for this combination yet. Upload your photo to be the first!</p>
          </div>
        )}
      </div>

      <div className="tour-benefits">
        <h3>Why Use Virtual Tour?</h3>
        <div className="benefits-grid">
          <div className="benefit-card-enhanced">
            <div className="benefit-icon">🎯</div>
            <h4>Make Informed Decisions</h4>
            <p>See exactly how your space will look before spending a rupee</p>
          </div>
          <div className="benefit-card-enhanced">
            <div className="benefit-icon">💰</div>
            <h4>Save Money</h4>
            <p>Avoid costly mistakes by visualizing first</p>
          </div>
          <div className="benefit-card-enhanced">
            <div className="benefit-icon">⚡</div>
            <h4>Instant Results</h4>
            <p>Get AI-powered visualizations in under 2 minutes</p>
          </div>
          <div className="benefit-card-enhanced">
            <div className="benefit-icon">🎨</div>
            <h4>Multiple Options</h4>
            <p>Try different styles and designs risk-free</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
