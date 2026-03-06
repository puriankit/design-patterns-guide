/**
 * ============================================================================
 * SINGLETON PATTERN - API Service Example
 * ============================================================================
 * 
 * WHAT THIS DOES:
 * This class ensures only ONE instance of ApiService exists in your entire app.
 * No matter how many times you create it, you always get the same instance.
 * 
 * WHY THIS IS USEFUL:
 * - All API calls share the same configuration (baseURL, auth token)
 * - Track total requests across your entire app
 * - Prevent multiple conflicting API configurations
 * - Save memory by not creating duplicate services
 * 
 * HOW IT WORKS:
 * 1. First time: Creates new instance and stores it in ApiService.instance
 * 2. Next times: Returns the stored instance instead of creating new one
 * 
 * REAL-WORLD ANALOGY:
 * Like a country's president - there's only ONE at a time. No matter how many
 * times you ask "who is the president?", you get the same person.
 * ============================================================================
 */

class ApiService {
  // Static variable to store the single instance
  // This is shared across ALL instances of the class
  static instance = null;
  
  constructor() {
    // SINGLETON MAGIC HAPPENS HERE!
    // Check if an instance already exists
    if (ApiService.instance) {
      console.log('♻️  Reusing existing API Service instance...');
      // Return the existing instance instead of creating a new one
      return ApiService.instance;
    }
    
    // This code only runs ONCE (first time constructor is called)
    console.log('🔨 Creating API Service for the FIRST time...');
    
    // Initialize the service properties
    this.baseURL = 'https://api.example.com';  // API endpoint
    this.token = null;                          // Authentication token
    this.requestCount = 0;                      // Track all API calls
    
    // Store this instance so future constructor calls return it
    ApiService.instance = this;
  }
  
  /**
   * ALTERNATIVE WAY TO GET INSTANCE (Recommended)
   * 
   * This is a cleaner way to get the Singleton instance.
   * Instead of: const api = new ApiService();
   * Use: const api = ApiService.getInstance();
   * 
   * Both work the same way, but getInstance() makes it clearer
   * that you're getting a singleton.
   */
  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  
  /**
   * Set authentication token
   * 
   * IMPORTANT: Since there's only ONE instance, setting the token here
   * affects ALL parts of your app that use this service.
   * This is exactly what we want - consistent authentication everywhere!
   */
  setAuthToken(token) {
    this.token = token;
    console.log('🔐 Auth token set for API Service');
  }
  
  /**
   * Make a GET request
   * 
   * Notice how requestCount increments for EVERY call across your entire app.
   * This proves all components are using the same instance!
   */
  async get(endpoint) {
    this.requestCount++;
    console.log(`📡 GET Request #${this.requestCount}: ${this.baseURL}${endpoint}`);
    
    // Simulated API response
    return {
      success: true,
      data: `Mock data from ${endpoint}`,
      requestNumber: this.requestCount
    };
  }
  
  /**
   * Make a POST request
   * 
   * Again, requestCount is shared across ALL components using this service.
   */
  async post(endpoint, data) {
    this.requestCount++;
    console.log(`📡 POST Request #${this.requestCount}: ${this.baseURL}${endpoint}`);
    
    // Simulated API response
    return {
      success: true,
      data: `Posted to ${endpoint}`,
      requestNumber: this.requestCount
    };
  }
  
  /**
   * Get total number of requests made
   * 
   * This count includes ALL requests from ALL parts of your app.
   * Perfect example of shared state in Singleton!
   */
  getRequestCount() {
    return this.requestCount;
  }
  
  /**
   * Get unique ID for this instance
   * 
   * This helps us prove that all variables point to the SAME instance.
   * The ID will be identical no matter where you call this from.
   */
  getInstanceId() {
    return this._instanceId || (this._instanceId = Math.random().toString(36).substr(2, 9));
  }
}

export default ApiService;
