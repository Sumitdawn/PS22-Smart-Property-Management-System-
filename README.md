# Full-Stack Web Application

A comprehensive full-stack web application with React frontend and Node.js backend featuring authentication, real-time chat, file uploads, and user management.

## 🚀 Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes

### User Management
- User profiles with editable information
- Avatar upload functionality
- Admin panel for user management
- User role management

### Real-time Communication
- Socket.IO powered chat system
- Multiple chat rooms
- Real-time message delivery
- User presence indicators

### File Management
- Image upload with validation
- File size and type restrictions
- Preview functionality
- Upload history

### Modern UI/UX
- Responsive design
- Toast notifications
- Loading states
- Clean, modern interface

## 🏗️ Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context (Auth)
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # File uploads directory
│   ├── server.js          # Main server file
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install-all
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
UPLOAD_PATH=uploads
```

### 3. Database Setup

Make sure MongoDB is running on your system:

```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4. Start the Application

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- **Backend server**: http://localhost:5000
- **React frontend**: http://localhost:3000

### Individual Commands

```bash
# Start only backend
npm run server

# Start only frontend  
npm run client
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-avatar` - Upload user avatar
- `GET /api/users` - Get all users (Admin only)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Default Admin Setup

To create an admin user, you can either:

1. Register a normal user and manually update the role in MongoDB
2. Add a seed script to create default admin user
3. Use the registration endpoint and modify the user role in the database

## 🎯 Usage Guide

### For Regular Users:
1. **Register/Login** - Create account or sign in
2. **Profile Management** - Update personal information and upload avatar
3. **Real-time Chat** - Join different chat rooms and communicate
4. **File Upload** - Upload and manage image files

### For Administrators:
- All user features plus:
- **User Management** - View and manage all registered users
- **System Overview** - Monitor user activity and system health

## 🔧 Development

### Adding New Features

1. **Backend**: Add routes in `server/routes/`, models in `server/models/`
2. **Frontend**: Add components in `client/src/components/`
3. **Database**: Update models and add migrations if needed

### File Upload Configuration

- **Supported formats**: JPEG, PNG, GIF
- **Max file size**: 5MB
- **Storage location**: `server/uploads/avatars/`

### Socket.IO Events

- `join-room` - Join a chat room
- `send-message` - Send a message
- `receive-message` - Receive a message

## 🚨 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Protected API routes

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on ports 3000/5000

3. **File Upload Issues**
   - Check `uploads/avatars/` directory exists
   - Verify file permissions

4. **Socket.IO Connection Issues**
   - Ensure both frontend and backend are running
   - Check CORS configuration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.