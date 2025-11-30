import React, { useState } from 'react';

const MaterialStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const materials = [
    {
      id: 1,
      name: 'Premium Ceramic Tiles',
      category: 'tiles',
      price: 450,
      unit: 'sq.ft',
      image: '🔲',
      rating: 4.5,
      inStock: true,
      brand: 'Kajaria',
      description: 'High-quality ceramic tiles for floors and walls'
    },
    {
      id: 2,
      name: 'Modular Kitchen Cabinets',
      category: 'kitchen',
      price: 25000,
      unit: 'set',
      image: '🗄️',
      rating: 4.8,
      inStock: true,
      brand: 'Godrej',
      description: 'Complete modular kitchen cabinet set'
    },
    {
      id: 3,
      name: 'LED Ceiling Lights',
      category: 'lighting',
      price: 1200,
      unit: 'piece',
      image: '💡',
      rating: 4.6,
      inStock: true,
      brand: 'Philips',
      description: 'Energy-efficient LED ceiling lights'
    },
    {
      id: 4,
      name: 'Granite Countertop',
      category: 'kitchen',
      price: 350,
      unit: 'sq.ft',
      image: '⬛',
      rating: 4.7,
      inStock: true,
      brand: 'Asian Granito',
      description: 'Premium granite for kitchen countertops'
    },
    {
      id: 5,
      name: 'Designer Bathroom Fittings',
      category: 'bathroom',
      price: 8500,
      unit: 'set',
      image: '🚿',
      rating: 4.9,
      inStock: true,
      brand: 'Jaquar',
      description: 'Complete bathroom fittings set'
    },
    {
      id: 6,
      name: 'Wooden Flooring',
      category: 'flooring',
      price: 280,
      unit: 'sq.ft',
      image: '🪵',
      rating: 4.4,
      inStock: true,
      brand: 'Pergo',
      description: 'Laminated wooden flooring'
    },
    {
      id: 7,
      name: 'Wall Paint (Premium)',
      category: 'paint',
      price: 450,
      unit: 'liter',
      image: '🎨',
      rating: 4.6,
      inStock: true,
      brand: 'Asian Paints',
      description: 'Premium emulsion wall paint'
    },
    {
      id: 8,
      name: 'False Ceiling Material',
      category: 'ceiling',
      price: 120,
      unit: 'sq.ft',
      image: '⬜',
      rating: 4.3,
      inStock: true,
      brand: 'Gyproc',
      description: 'POP false ceiling material'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Materials', icon: '📦' },
    { id: 'tiles', name: 'Tiles', icon: '🔲' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'lighting', name: 'Lighting', icon: '💡' },
    { id: 'flooring', name: 'Flooring', icon: '🪵' },
    { id: 'paint', name: 'Paint', icon: '🎨' },
    { id: 'ceiling', name: 'Ceiling', icon: '⬜' }
  ];

  const addToCart = (material) => {
    const existing = cart.find(item => item.id === material.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === material.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...material, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredMaterials = selectedCategory === 'all' 
    ? materials 
    : materials.filter(m => m.category === selectedCategory);

  return (
    <div className="material-store-container">
      <div className="feature-header">
        <h2>🏪 Building Materials Store</h2>
        <p>Buy quality materials directly from verified suppliers</p>
        <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length}) - ₹{getTotalPrice().toLocaleString()}
        </button>
      </div>

      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="materials-grid">
        {filteredMaterials.map(material => (
          <div key={material.id} className="material-card">
            <div className="material-image">{material.image}</div>
            <div className="material-info">
              <div className="material-header">
                <h3>{material.name}</h3>
                <span className="brand-badge">{material.brand}</span>
              </div>
              <p className="material-description">{material.description}</p>
              <div className="material-rating">
                <span className="stars">⭐ {material.rating}</span>
                <span className={`stock-badge ${material.inStock ? 'in-stock' : 'out-stock'}`}>
                  {material.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>
              <div className="material-price">
                <span className="price">₹{material.price}</span>
                <span className="unit">/ {material.unit}</span>
              </div>
              <div className="material-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(material)}
                  disabled={!material.inStock}
                >
                  🛒 Add to Cart
                </button>
                <button className="quick-view-btn">👁️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>🛒 Shopping Cart</h3>
            <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <span className="empty-icon">🛒</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.image}</div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">₹{item.price} / {item.unit}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="store-benefits">
        <div className="benefit-card">
          <span className="benefit-icon">🚚</span>
          <h4>Free Delivery</h4>
          <p>On orders above ₹10,000</p>
        </div>
        <div className="benefit-card">
          <span className="benefit-icon">✅</span>
          <h4>Quality Assured</h4>
          <p>100% genuine products</p>
        </div>
        <div className="benefit-card">
          <span className="benefit-icon">🔄</span>
          <h4>Easy Returns</h4>
          <p>7-day return policy</p>
        </div>
        <div className="benefit-card">
          <span className="benefit-icon">💳</span>
          <h4>Secure Payment</h4>
          <p>Multiple payment options</p>
        </div>
      </div>
    </div>
  );
};

export default MaterialStore;
