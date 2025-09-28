# Instagram Influencer Analytics Platform

A comprehensive **MERN stack** application built with **pure JavaScript** for analyzing Instagram influencer profiles, posts, and reels with AI-powered insights and beautiful visualizations.

**✅ Pure MERN Stack - No Python Dependencies**
- **MongoDB** - Database
- **Express.js** - Backend API
- **React** - Frontend Framework  
- **Node.js** - JavaScript Runtime
- **Tailwind CSS** - Styling

## 🚀 Features

### Core Functionality
- **Influencer Profile Management**: Complete influencer profiles with analytics
- **Post Analysis**: AI-powered image analysis with keywords, vibes, and quality metrics
- **Reel Analysis**: Video content analysis with engagement metrics
- **Instagram Scraping**: Automated data collection from Instagram profiles
- **Real-time Analytics**: Comprehensive engagement and performance metrics
- **Beautiful UI**: Modern, responsive design with dark theme

### AI-Powered Insights
- **Image Processing**: Automatic keyword generation and vibe classification
- **Quality Analysis**: Lighting, visual appeal, and consistency scoring
- **Content Classification**: Automatic categorization of posts and reels
- **Engagement Prediction**: AI-driven engagement rate analysis

## 🛠 Tech Stack

### Backend
- **Node.js & Express.js**: RESTful API server
- **MongoDB & Mongoose**: Database and ODM
- **Puppeteer**: Web scraping automation
- **Sharp**: Image processing
- **Jimp**: Pure JavaScript image manipulation
- **Rate Limiting**: API protection and security

### Frontend
- **React 18**: Modern React with Create React App
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Beautiful data visualizations
- **Lucide React**: Modern icon library
- **React Router**: Client-side routing

## 📁 Project Structure

```
Project/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── influencerController.js
│   │   ├── postController.js
│   │   ├── reelController.js
│   │   └── scrapingController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Influencer.js
│   │   ├── Post.js
│   │   └── Reel.js
│   ├── routes/
│   │   ├── influencerRoutes.js
│   │   ├── postRoutes.js
│   │   ├── reelRoutes.js
│   │   └── scrapingRoutes.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── InfluencerProfile.jsx
    │   │   ├── InfluencerList.jsx
    │   │   ├── PostGrid.jsx
    │   │   ├── ReelGrid.jsx
    │   │   ├── Header.jsx
    │   │   └── LoadingSpinner.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure environment variables:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram_influencer
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
INSTAGRAM_USERNAME=your_instagram_username
INSTAGRAM_PASSWORD=your_instagram_password
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
FRONTEND_URL=http://localhost:3000
```

5. **Start MongoDB service**

6. **Run the backend:**
```bash
npm run dev
```

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## 📊 API Endpoints

### Influencers
- `GET /api/influencers` - Get all influencers
- `GET /api/influencers/:username` - Get influencer by username
- `GET /api/influencers/:username/profile` - Get full profile with posts and reels

### Posts
- `GET /api/posts/influencer/:username` - Get posts by influencer
- `GET /api/posts/:postId` - Get specific post
- `GET /api/posts/influencer/:username/analytics` - Get post analytics

### Reels
- `GET /api/reels/influencer/:username` - Get reels by influencer
- `GET /api/reels/:reelId` - Get specific reel
- `GET /api/reels/influencer/:username/analytics` - Get reel analytics

### Scraping
- `POST /api/scraping/profile/:username` - Scrape influencer profile
- `POST /api/scraping/posts/:username` - Scrape influencer posts
- `POST /api/scraping/analyze/:postId` - Analyze post image

## 🎨 UI Features

### Design System
- **Dark Theme**: Modern dark UI with green accents
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and hover effects
- **Glass Morphism**: Modern glass effects
- **Typography**: Inter font family for readability

### Components
- **Profile Cards**: Beautiful influencer profile displays
- **Analytics Charts**: Interactive data visualizations
- **Post Grids**: Masonry-style post layouts
- **Reel Players**: Video content with engagement metrics
- **Loading States**: Smooth loading animations

## 🔒 Security Features

- **Rate Limiting**: API protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Data sanitization and validation
- **Error Handling**: Comprehensive error management
- **Helmet Security**: HTTP security headers

## 📈 Analytics & Insights

### Engagement Metrics
- Follower growth tracking
- Post performance analysis
- Engagement rate calculations
- Content quality scoring

### AI Analysis
- **Image Classification**: Automatic content categorization
- **Sentiment Analysis**: Post mood detection
- **Quality Assessment**: Visual appeal scoring
- **Trend Detection**: Popular content patterns

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy to Heroku, Vercel, or your preferred platform

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using the MERN stack**

