# Instagram Influencer Backend API

A comprehensive backend API for analyzing Instagram influencer profiles, posts, and reels with AI-powered insights.

## Features

- **Influencer Profile Management**: Store and manage influencer data
- **Post Analysis**: Analyze posts with AI-generated insights
- **Reel Analysis**: Process video content for engagement metrics
- **Instagram Scraping**: Automated data collection from Instagram
- **Image Processing**: AI-powered image analysis
- **Analytics**: Comprehensive engagement and performance metrics

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose

- TensorFlow.js for AI analysis
- Rate limiting and security middleware

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
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

3. Start MongoDB service

4. Run the server:
```bash
npm run dev
```

## API Endpoints

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

## Database Models

### Influencer
- Basic profile information
- Follower/following counts
- Engagement metrics
- Verification status

### Post
- Post content and metadata
- AI-generated analysis
- Quality indicators
- Engagement metrics

### Reel
- Video content metadata
- AI-generated analysis
- Quality metrics
- Performance data

## Security Features

- Rate limiting on all endpoints
- CORS protection
- Helmet for security headers
- Input validation
- Error handling

## Development

The API includes comprehensive error handling, logging, and security measures. All scraping operations are rate-limited to prevent abuse.



