// API Configuration and endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Health check
  HEALTH: '/health',
  
  // Influencers
  INFLUENCERS: '/influencers',
  INFLUENCER_BY_USERNAME: (username) => `/influencers/${username}`,
  INFLUENCER_PROFILE: (username) => `/influencers/${username}/profile`,
  
  // Posts
  POSTS: '/posts',
  POST_BY_ID: (id) => `/posts/${id}`,
  
  // Reels
  REELS: '/reels',
  REEL_BY_ID: (id) => `/reels/${id}`,
};

// API utility functions
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Generic fetch method with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      console.log(`🔄 API Request: ${config.method || 'GET'} ${url}`);
      
      const response = await fetch(url, config);
      
      console.log(`📡 Response status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`📊 API Response:`, data);
      
      return data;
    } catch (error) {
      console.error(`❌ API Error for ${url}:`, error);
      
      // Handle specific error types
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the server. Please check if the backend server is running.');
      }
      
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${endpoint}?${queryString}` : endpoint;
      return await this.request(url);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// API service functions
export const apiService = {
  // Health check
  async checkHealth() {
    return apiClient.get(API_ENDPOINTS.HEALTH);
  },

  // Influencers
  async getAllInfluencers(params = {}) {
    return apiClient.get(API_ENDPOINTS.INFLUENCERS, params);
  },

  async getInfluencerByUsername(username) {
    return apiClient.get(API_ENDPOINTS.INFLUENCER_BY_USERNAME(username));
  },

  async getInfluencerProfile(username, params = {}) {
    return apiClient.get(API_ENDPOINTS.INFLUENCER_PROFILE(username), params);
  },

  // Posts
  async getAllPosts(params = {}) {
    return apiClient.get(API_ENDPOINTS.POSTS, params);
  },

  async getPostById(id) {
    return apiClient.get(API_ENDPOINTS.POST_BY_ID(id));
  },

  // Reels
  async getAllReels(params = {}) {
    return apiClient.get(API_ENDPOINTS.REELS, params);
  },

  async getReelById(id) {
    return apiClient.get(API_ENDPOINTS.REEL_BY_ID(id));
  },
};

// Export the API client for direct use if needed
export default apiClient;
