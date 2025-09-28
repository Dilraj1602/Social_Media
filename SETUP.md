# Instagram Influencer Analytics Platform

A full-stack web application for analyzing Instagram influencer profiles, posts, and reels with advanced analytics and AI-powered insights.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - app works with mock data)

### Installation & Setup

1. **Clone and navigate to the project directory**
   ```bash
   cd /Users/sumitkumar/Documents/Project
   ```

2. **Start both servers automatically**
   ```bash
   ./start-servers.sh
   ```

   Or start manually:

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

## 📊 Features

### ✅ Completed Features

#### Backend
- ✅ Express.js REST API server
- ✅ MongoDB integration with fallback to mock data
- ✅ CORS configuration for frontend communication
- ✅ Rate limiting and security middleware
- ✅ Comprehensive influencer data models
- ✅ Post and reel analysis with AI insights
- ✅ Mock data for demonstration

#### Frontend
- ✅ React.js with modern hooks
- ✅ Responsive design with Tailwind CSS
- ✅ Dark theme with custom color palette
- ✅ Influencer listing with search and filtering
- ✅ Detailed influencer profile pages
- ✅ Post and reel grids with analytics
- ✅ Interactive charts and visualizations
- ✅ Loading states and error handling

#### Data Models
- ✅ Influencer profiles with engagement metrics
- ✅ Post analysis with image processing insights
- ✅ Reel analysis with video processing data
- ✅ Analytics and engagement tracking

## 🔧 API Endpoints

### Influencers
- `GET /api/influencers` - List all influencers
- `GET /api/influencers/:username` - Get specific influencer
- `GET /api/influencers/:username/profile` - Get full profile with posts/reels

### Posts
- `GET /api/posts` - List all posts
- `GET /api/posts/:id` - Get specific post

### Reels
- `GET /api/reels` - List all reels
- `GET /api/reels/:id` - Get specific reel

### Health
- `GET /api/health` - Server health check

## 🎨 Frontend Components

### Pages
- **Home** (`/`) - Influencer listing with search
- **Profile** (`/influencer/:username`) - Detailed influencer profile
- **Analytics** (`/analytics`) - Coming soon
- **About** (`/about`) - Coming soon

### Components
- `InfluencerList` - Grid of influencer cards
- `InfluencerProfile` - Detailed profile view
- `PostGrid` - Post gallery with analytics
- `ReelGrid` - Reel gallery with metrics
- `Header` - Navigation and search
- `LoadingSpinner` - Loading states

## 📱 Sample Data

The application includes mock data for demonstration:

### Influencer: Ralph Edwards
- **Username**: ralphedwards
- **Followers**: 125,000
- **Posts**: 342
- **Engagement Rate**: 4.2%
- **Category**: Tech

### Sample Posts
- Coding and technology content
- Sunset photography
- Professional development insights

### Sample Reels
- Quick coding tips
- Educational content
- Tutorial videos

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # Development server with hot reload
```

### Environment Variables

#### Backend (.env)
```
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/instagram_influencer_db
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ENVIRONMENT=development
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   - Solution: Backend automatically uses port 5001

2. **CORS errors**
   - Solution: Backend is configured for localhost:3000

3. **MongoDB connection issues**
   - Solution: App falls back to mock data automatically

4. **Frontend not loading**
   - Check if both servers are running
   - Verify port 3000 is available

### Logs
- Backend logs: `backend.log`
- Frontend logs: `frontend.log`

## 🔮 Future Enhancements

### Planned Features
- [ ] Real Instagram scraping integration
- [ ] User authentication
- [ ] Advanced analytics dashboard
- [ ] Export functionality
- [ ] Real-time data updates
- [ ] Mobile app version

### Technical Improvements
- [ ] Database optimization
- [ ] Caching layer
- [ ] Image processing pipeline
- [ ] Video analysis features
- [ ] Performance monitoring

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Status**: ✅ Fully functional with mock data
**Last Updated**: September 27, 2025
**Version**: 1.0.0

