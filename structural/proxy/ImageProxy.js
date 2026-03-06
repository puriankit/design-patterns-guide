/**
 * Proxy Pattern - Real World Example
 * Image loading proxy for React Native
 * 
 * Use Case: Lazy loading images, caching, access control
 */

// Real Subject - Expensive to create
class HighResImage {
  constructor(filename) {
    this.filename = filename;
    this.loadTime = Math.random() * 2000 + 1000; // 1-3 seconds
    this.isLoaded = false;
    this.data = null;
  }
  
  load() {
    if (this.isLoaded) {
      return `✅ Image already loaded: ${this.filename}`;
    }
    
    // Simulate expensive loading operation
    this.isLoaded = true;
    this.data = `[Image data for ${this.filename}]`;
    return `📥 Loading ${this.filename}... (${Math.round(this.loadTime)}ms)`;
  }
  
  display() {
    if (!this.isLoaded) {
      return `❌ Cannot display: ${this.filename} not loaded!`;
    }
    return `🖼️  Displaying: ${this.filename}`;
  }
  
  getInfo() {
    return {
      filename: this.filename,
      isLoaded: this.isLoaded,
      size: this.isLoaded ? '2.5 MB' : 'Unknown'
    };
  }
}

// Proxy - Controls access to HighResImage
class ImageProxy {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
    this.accessCount = 0;
  }
  
  load() {
    this.accessCount++;
    
    if (!this.realImage) {
      console.log(`🔄 Proxy: Creating real image for ${this.filename}`);
      this.realImage = new HighResImage(this.filename);
    }
    
    return this.realImage.load();
  }
  
  display() {
    this.accessCount++;
    
    // Lazy initialization - create only when needed
    if (!this.realImage) {
      console.log(`🔄 Proxy: Lazy loading ${this.filename}`);
      this.realImage = new HighResImage(this.filename);
      this.realImage.load();
    } else if (!this.realImage.isLoaded) {
      this.realImage.load();
    }
    
    return this.realImage.display();
  }
  
  getInfo() {
    return {
      filename: this.filename,
      isLoaded: this.realImage ? this.realImage.isLoaded : false,
      accessCount: this.accessCount,
      proxyActive: true
    };
  }
}

// Caching Proxy
class CachedImageProxy {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
    this.cache = null;
    this.cacheHits = 0;
  }
  
  display() {
    // Return cached version if available
    if (this.cache) {
      this.cacheHits++;
      return `💾 [CACHED] ${this.cache} (Hit #${this.cacheHits})`;
    }
    
    // Load and cache
    if (!this.realImage) {
      this.realImage = new HighResImage(this.filename);
      this.realImage.load();
    }
    
    this.cache = this.realImage.display();
    return this.cache;
  }
  
  clearCache() {
    this.cache = null;
    this.cacheHits = 0;
    return '🗑️  Cache cleared';
  }
  
  getInfo() {
    return {
      filename: this.filename,
      cached: this.cache !== null,
      cacheHits: this.cacheHits
    };
  }
}

// Access Control Proxy
class ProtectedImageProxy {
  constructor(filename, requiredRole = 'user') {
    this.filename = filename;
    this.realImage = null;
    this.requiredRole = requiredRole;
  }
  
  display(userRole = 'guest') {
    // Check access rights
    if (!this.hasAccess(userRole)) {
      return `🚫 Access Denied: ${userRole} cannot view ${this.filename}`;
    }
    
    // Load if needed
    if (!this.realImage) {
      this.realImage = new HighResImage(this.filename);
      this.realImage.load();
    }
    
    return `✅ Access Granted: ${this.realImage.display()}`;
  }
  
  hasAccess(userRole) {
    const roles = ['guest', 'user', 'admin'];
    const userLevel = roles.indexOf(userRole);
    const requiredLevel = roles.indexOf(this.requiredRole);
    return userLevel >= requiredLevel;
  }
  
  getInfo() {
    return {
      filename: this.filename,
      requiredRole: this.requiredRole,
      isLoaded: this.realImage ? this.realImage.isLoaded : false
    };
  }
}

export default ImageProxy;
export { HighResImage, CachedImageProxy, ProtectedImageProxy };
