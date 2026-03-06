/**
 * Singleton Pattern - Real World Example
 * API Service that ensures only one instance exists throughout the app
 * 
 * Use Case: Managing API calls with a single configuration and state
 */

class ApiService {
  static instance = null;
  
  constructor() {
    if (ApiService.instance) {
      console.log('♻️  Reusing existing API Service instance...');
      return ApiService.instance;
    }
    
    console.log('🔨 Creating API Service for the FIRST time...');
    
    this.baseURL = 'https://api.example.com';
    this.token = null;
    this.requestCount = 0;
    
    ApiService.instance = this;
  }
  
  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  
  setAuthToken(token) {
    this.token = token;
    console.log('🔐 Auth token set for API Service');
  }
  
  async get(endpoint) {
    this.requestCount++;
    console.log(`📡 GET Request #${this.requestCount}: ${this.baseURL}${endpoint}`);
    
    return {
      success: true,
      data: `Mock data from ${endpoint}`,
      requestNumber: this.requestCount
    };
  }
  
  async post(endpoint, data) {
    this.requestCount++;
    console.log(`📡 POST Request #${this.requestCount}: ${this.baseURL}${endpoint}`);
    
    return {
      success: true,
      data: `Posted to ${endpoint}`,
      requestNumber: this.requestCount
    };
  }
  
  getRequestCount() {
    return this.requestCount;
  }
  
  getInstanceId() {
    return this._instanceId || (this._instanceId = Math.random().toString(36).substr(2, 9));
  }
}

export default ApiService;
