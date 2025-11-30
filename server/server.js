const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads/avatars');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// In-memory storage for demo (replace with MongoDB later)
let users = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'user' },
  { id: 2, name: 'Admin User', email: 'admin@propenhance.com', role: 'admin' }
];

let properties = [
  {
    id: 1,
    userId: 1,
    type: '2BHK Apartment',
    location: 'Pune, Maharashtra',
    area: 850,
    budget: 500000,
    currentValue: 4500000,
    description: 'Middle-class apartment in good locality',
    submittedAt: new Date().toISOString()
  }
];

let recommendations = [
  {
    id: 1,
    title: 'Smart Kitchen Modular Upgrade',
    category: 'Kitchen',
    description: 'Premium modular kitchen with granite countertops, soft-close drawers, and built-in appliances',
    estimatedCost: 150000,
    valueIncrease: 300000,
    timeRequired: '2-3 weeks',
    difficulty: 'Medium',
    applicableFor: ['2BHK', '3BHK'],
    images: [],
    trending: true,
    rating: 4.8,
    completedProjects: 245,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Luxury Bathroom Makeover',
    category: 'Bathroom',
    description: 'Complete bathroom renovation with premium tiles, modern fixtures, and smart ventilation system',
    estimatedCost: 80000,
    valueIncrease: 200000,
    timeRequired: '1-2 weeks',
    difficulty: 'Medium',
    applicableFor: ['1BHK', '2BHK', '3BHK'],
    images: [],
    trending: false,
    rating: 4.6,
    completedProjects: 189,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Designer False Ceiling with LED',
    category: 'Living Room',
    description: 'Elegant POP false ceiling with ambient LED lighting and modern design patterns',
    estimatedCost: 45000,
    valueIncrease: 120000,
    timeRequired: '1 week',
    difficulty: 'Easy',
    applicableFor: ['2BHK', '3BHK'],
    images: [],
    trending: true,
    rating: 4.7,
    completedProjects: 156,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Balcony Garden & Seating',
    category: 'Exterior',
    description: 'Transform your balcony into a green oasis with vertical gardens and comfortable seating',
    estimatedCost: 35000,
    valueIncrease: 85000,
    timeRequired: '3-4 days',
    difficulty: 'Easy',
    applicableFor: ['1BHK', '2BHK', '3BHK'],
    images: [],
    trending: true,
    rating: 4.5,
    completedProjects: 98,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Master Bedroom Wardrobe',
    category: 'Bedroom',
    description: 'Built-in wardrobe with mirror finish, LED lighting, and smart storage solutions',
    estimatedCost: 75000,
    valueIncrease: 150000,
    timeRequired: '1-2 weeks',
    difficulty: 'Medium',
    applicableFor: ['2BHK', '3BHK', '4BHK'],
    images: [],
    trending: false,
    rating: 4.4,
    completedProjects: 134,
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    title: 'Home Office Setup',
    category: 'Living Room',
    description: 'Dedicated work-from-home space with built-in desk, storage, and proper lighting',
    estimatedCost: 55000,
    valueIncrease: 110000,
    timeRequired: '1 week',
    difficulty: 'Easy',
    applicableFor: ['2BHK', '3BHK', '4BHK'],
    images: [],
    trending: true,
    rating: 4.6,
    completedProjects: 87,
    createdAt: new Date().toISOString()
  }
];

let userFavorites = {}; // userId: [recommendationIds]
let analytics = {
  totalViews: 1247,
  totalProjects: 909,
  avgROI: 142,
  popularCategories: {
    'Kitchen': 35,
    'Bathroom': 28,
    'Living Room': 22,
    'Bedroom': 15
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Simple auth routes for demo
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user && password === 'password') { // Simple demo auth
    res.json({
      token: 'demo-token-' + user.id,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        createdAt: new Date().toISOString()
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  
  res.status(201).json({
    token: 'demo-token-' + newUser.id,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

app.get('/api/users/profile', (req, res) => {
  // Simple demo - get user from token
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Property routes
app.get('/api/properties', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if (user?.role === 'admin') {
    res.json(properties);
  } else {
    const userProperties = properties.filter(p => p.userId == userId);
    res.json(userProperties);
  }
});

app.post('/api/properties', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  
  const newProperty = {
    id: properties.length + 1,
    userId: parseInt(userId),
    ...req.body,
    submittedAt: new Date().toISOString()
  };
  
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// Recommendations routes
app.get('/api/recommendations', (req, res) => {
  const { category, propertyType } = req.query;
  let filtered = recommendations;
  
  if (category) {
    filtered = filtered.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }
  
  if (propertyType) {
    filtered = filtered.filter(r => r.applicableFor.includes(propertyType));
  }
  
  res.json(filtered);
});

app.post('/api/recommendations', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  const newRecommendation = {
    id: recommendations.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  recommendations.push(newRecommendation);
  res.status(201).json(newRecommendation);
});

app.put('/api/recommendations/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  const recIndex = recommendations.findIndex(r => r.id == req.params.id);
  if (recIndex !== -1) {
    recommendations[recIndex] = { ...recommendations[recIndex], ...req.body };
    res.json(recommendations[recIndex]);
  } else {
    res.status(404).json({ message: 'Recommendation not found' });
  }
});

app.delete('/api/recommendations/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  const recIndex = recommendations.findIndex(r => r.id == req.params.id);
  if (recIndex !== -1) {
    recommendations.splice(recIndex, 1);
    res.json({ message: 'Recommendation deleted' });
  } else {
    res.status(404).json({ message: 'Recommendation not found' });
  }
});

// Personalized recommendations with AI-like scoring
app.post('/api/recommendations/personalized', (req, res) => {
  const { propertyType, budget, area, location } = req.body;
  
  let suitable = recommendations.filter(r => {
    return r.applicableFor.includes(propertyType) && r.estimatedCost <= budget;
  });
  
  // Enhanced scoring algorithm
  suitable = suitable.map(r => {
    const roi = ((r.valueIncrease - r.estimatedCost) / r.estimatedCost * 100);
    const popularityScore = (r.completedProjects / 300) * 20; // Max 20 points
    const ratingScore = (r.rating / 5) * 30; // Max 30 points
    const trendingBonus = r.trending ? 15 : 0;
    const budgetEfficiency = ((budget - r.estimatedCost) / budget) * 10; // Bonus for using budget efficiently
    
    const totalScore = roi + popularityScore + ratingScore + trendingBonus + budgetEfficiency;
    
    return {
      ...r,
      roi: roi.toFixed(1),
      score: totalScore.toFixed(1),
      budgetUtilization: ((r.estimatedCost / budget) * 100).toFixed(1)
    };
  }).sort((a, b) => b.score - a.score);
  
  res.json(suitable);
});

// Favorites system
app.post('/api/favorites/:recommendationId', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const recId = parseInt(req.params.recommendationId);
  
  if (!userFavorites[userId]) {
    userFavorites[userId] = [];
  }
  
  if (!userFavorites[userId].includes(recId)) {
    userFavorites[userId].push(recId);
    res.json({ message: 'Added to favorites', favorites: userFavorites[userId] });
  } else {
    res.json({ message: 'Already in favorites', favorites: userFavorites[userId] });
  }
});

app.delete('/api/favorites/:recommendationId', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const recId = parseInt(req.params.recommendationId);
  
  if (userFavorites[userId]) {
    userFavorites[userId] = userFavorites[userId].filter(id => id !== recId);
    res.json({ message: 'Removed from favorites', favorites: userFavorites[userId] });
  } else {
    res.json({ message: 'Not in favorites', favorites: [] });
  }
});

app.get('/api/favorites', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  
  const userFavs = userFavorites[userId] || [];
  const favoriteRecs = recommendations.filter(r => userFavs.includes(r.id));
  
  res.json(favoriteRecs);
});

// Analytics endpoint with filtering
app.get('/api/analytics', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const user = users.find(u => u.id == userId);
  
  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  const { dateRange, category } = req.query;
  
  // Calculate date filter
  let dateFilter = new Date(0); // Beginning of time
  const now = new Date();
  
  switch(dateRange) {
    case '7days':
      dateFilter = new Date(now - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      dateFilter = new Date(now - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90days':
      dateFilter = new Date(now - 90 * 24 * 60 * 60 * 1000);
      break;
    case '6months':
      dateFilter = new Date(now - 180 * 24 * 60 * 60 * 1000);
      break;
    case '1year':
      dateFilter = new Date(now - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      dateFilter = new Date(0);
  }
  
  // Filter recommendations by category
  let filteredRecs = recommendations;
  if (category && category !== 'all') {
    filteredRecs = recommendations.filter(r => 
      r.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter properties by date
  const filteredProperties = properties.filter(p => 
    new Date(p.submittedAt) > dateFilter
  );
  
  // Calculate dynamic metrics based on filters
  const totalProjects = filteredRecs.reduce((sum, r) => sum + r.completedProjects, 0);
  const avgROI = filteredRecs.length > 0 
    ? Math.round(filteredRecs.reduce((sum, r) => {
        const roi = ((r.valueIncrease - r.estimatedCost) / r.estimatedCost * 100);
        return sum + roi;
      }, 0) / filteredRecs.length)
    : 142;
  
  // Calculate category distribution
  const categoryDist = {};
  filteredRecs.forEach(r => {
    categoryDist[r.category] = (categoryDist[r.category] || 0) + 1;
  });
  
  const totalRecs = filteredRecs.length || 1;
  const popularCategories = {};
  Object.keys(categoryDist).forEach(cat => {
    popularCategories[cat] = Math.round((categoryDist[cat] / totalRecs) * 100);
  });
  
  // Calculate views based on date range multiplier
  const viewsMultiplier = dateRange === '7days' ? 0.2 : 
                         dateRange === '30days' ? 0.5 : 
                         dateRange === '90days' ? 0.8 : 1;
  
  const enhancedAnalytics = {
    totalViews: Math.round(analytics.totalViews * viewsMultiplier),
    totalProjects: Math.round(totalProjects * viewsMultiplier),
    avgROI: avgROI,
    popularCategories: Object.keys(popularCategories).length > 0 ? popularCategories : analytics.popularCategories,
    totalRecommendations: filteredRecs.length,
    totalUsers: users.length,
    totalProperties: filteredProperties.length,
    recentActivity: {
      newPropertiesThisWeek: properties.filter(p => 
        new Date(p.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      popularRecommendations: filteredRecs
        .sort((a, b) => b.completedProjects - a.completedProjects)
        .slice(0, 5)
        .map(r => ({ title: r.title, projects: r.completedProjects }))
    }
  };
  
  res.json(enhancedAnalytics);
});

// Trending recommendations
app.get('/api/recommendations/trending', (req, res) => {
  const trending = recommendations
    .filter(r => r.trending)
    .sort((a, b) => b.completedProjects - a.completedProjects)
    .slice(0, 6);
  
  res.json(trending);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.put('/api/users/profile', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('-')[2];
  const userIndex = users.findIndex(u => u.id == userId);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('send-message', (data) => {
    io.to(data.room).emit('receive-message', {
      id: Date.now(),
      message: data.message,
      user: data.user,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🏠 Property Enhancement Platform Server running on port ${PORT}`);
  console.log('📧 Demo credentials:');
  console.log('   User: rajesh@example.com, password: password');
  console.log('   Admin: admin@propenhance.com, password: password');
  console.log('🌐 Frontend: http://localhost:3000');
});