# Instagram Influencer Analytics Platform

A comprehensive **MERN stack** application built with **pure JavaScript** for analyzing Instagram influencer profiles, posts, and reels with AI-powered insights and beautiful visualizations.


**✅ Pure MERN Stack - No Python Dependencies**
- **MongoDB** - Database (optional, app works fully with mock data)
- **Express.js** - Backend API (uses robust mock data if DB not available)
- **React** - Frontend Framework
- **Node.js** - JavaScript Runtime
- **Tailwind CSS** - Styling

**Note:** Puppeteer and Sharp are NOT required. All data is served from robust mock data for easy local development and testing.

## 🚀 Features


### Core Functionality
- **Influencer Search by Username**: Instantly search influencers by username and view their full profile
- **Influencer Profile Management**: Complete influencer profiles with analytics
- **Post Analysis**: AI-powered image analysis with keywords, vibes, and quality metrics (mocked)
- **Reel Analysis**: Video content analysis with engagement metrics (mocked)
- **Real-time Analytics**: Comprehensive engagement and performance metrics (mocked)
- **Beautiful UI**: Modern, responsive design with dark theme

### AI-Powered Insights
- **Image Processing**: Automatic keyword generation and vibe classification
- **Quality Analysis**: Lighting, visual appeal, and consistency scoring
- **Content Classification**: Automatic categorization of posts and reels
- **Engagement Prediction**: AI-driven engagement rate analysis

## 🛠 Tech Stack


### Backend
- **Node.js & Express.js**: RESTful API server
- **MongoDB & Mongoose**: Database and ODM (optional)
- **Mock Data**: All endpoints work with robust mock data for easy setup
- **Rate Limiting**: API protection and security
- **Comprehensive Error Handling**: All endpoints return clear error messages


### Frontend
- **React 18**: Modern React with Create React App
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Beautiful data visualizations
- **Lucide React**: Modern icon library
- **React Router**: Client-side routing
- **Robust Error Handling**: All pages/components handle errors and loading states gracefully

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

3. **(Optional) Create environment file:**
```bash
cp .env.example .env
```

4. **(Optional) Configure environment variables for MongoDB:**
If you want to use a real database, edit `.env` as needed. Otherwise, the app works fully with mock data—no DB required!

5. **Run the backend (mock data mode):**
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


## 📊 API Endpoints (Mock Data)

### Influencers
- `GET /api/influencers` - Get all influencers (search, sort, paginate)
- `GET /api/influencers/:username` - Get influencer by username
- `GET /api/influencers/:username/profile` - Get full profile with posts and reels

### Posts
- `GET /api/posts` - Get all posts (mocked)
- `GET /api/posts/:id` - Get specific post (mocked)

### Reels
- `GET /api/reels` - Get all reels (mocked)
- `GET /api/reels/:id` - Get specific reel (mocked)

### Health
- `GET /api/health` - Server health check


## 🎨 UI Features

### Design System
- **Dark Theme**: Modern dark UI with green accents
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and hover effects
- **Glass Morphism**: Modern glass effects
- **Typography**: Inter font family for readability

### Components
- **Influencer Search**: Search influencers by username with instant results
- **Profile Cards**: Beautiful influencer profile displays
- **Analytics Charts**: Interactive data visualizations
- **Post Grids**: Masonry-style post layouts
- **Reel Players**: Video content with engagement metrics
- **Loading States & Error Boundaries**: Smooth loading animations and robust error handling


## 🔒 Security & Robustness

- **Rate Limiting**: API protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Data sanitization and validation
- **Error Handling**: Comprehensive error management (frontend & backend)

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


---
**Built with ❤️ using the MERN stack**

---
**Current State:**
- All backend endpoints work with robust mock data (no DB or scraping required)
- Puppeteer and Sharp are NOT required
- Search by username and view influencer profile is fully supported
- All major errors and edge cases are handled gracefully in both backend and frontend

