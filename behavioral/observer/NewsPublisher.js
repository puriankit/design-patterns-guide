/**
 * Observer Pattern - Real World Example
 * News publishing system with subscribers
 * 
 * Use Case: Notifying multiple subscribers when news is published
 */

// Observer Interface
class Subscriber {
  update(news) {
    throw new Error('update() must be implemented');
  }
}

// Concrete Observers
class EmailSubscriber extends Subscriber {
  constructor(email) {
    super();
    this.email = email;
    this.name = 'Email Subscriber';
  }
  
  update(news) {
    return `📧 Email sent to ${this.email}: "${news.title}"`;
  }
}

class SMSSubscriber extends Subscriber {
  constructor(phoneNumber) {
    super();
    this.phoneNumber = phoneNumber;
    this.name = 'SMS Subscriber';
  }
  
  update(news) {
    return `📱 SMS sent to ${this.phoneNumber}: "${news.title}"`;
  }
}

class PushNotificationSubscriber extends Subscriber {
  constructor(deviceId) {
    super();
    this.deviceId = deviceId;
    this.name = 'Push Notification Subscriber';
  }
  
  update(news) {
    return `🔔 Push notification to ${this.deviceId}: "${news.title}"`;
  }
}

class AppSubscriber extends Subscriber {
  constructor(userId) {
    super();
    this.userId = userId;
    this.name = 'In-App Subscriber';
    this.notifications = [];
  }
  
  update(news) {
    this.notifications.push(news);
    return `📲 In-app notification for user ${this.userId}: "${news.title}"`;
  }
  
  getNotifications() {
    return this.notifications;
  }
}

// Subject (Observable)
class NewsPublisher {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
    this.news = [];
  }
  
  subscribe(subscriber) {
    if (!this.subscribers.includes(subscriber)) {
      this.subscribers.push(subscriber);
      return `✅ ${subscriber.name} subscribed to ${this.name}`;
    }
    return `⚠️  ${subscriber.name} already subscribed`;
  }
  
  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
      return `❌ ${subscriber.name} unsubscribed from ${this.name}`;
    }
    return `⚠️  ${subscriber.name} was not subscribed`;
  }
  
  notify(news) {
    const results = [];
    results.push(`📢 Notifying ${this.subscribers.length} subscribers...`);
    
    this.subscribers.forEach(subscriber => {
      results.push(subscriber.update(news));
    });
    
    return results;
  }
  
  publishNews(title, content, category = 'General') {
    const news = {
      title,
      content,
      category,
      timestamp: new Date().toLocaleTimeString(),
      publisher: this.name
    };
    
    this.news.push(news);
    
    const results = [];
    results.push(`\n📰 NEW ARTICLE PUBLISHED`);
    results.push(`Title: ${title}`);
    results.push(`Category: ${category}`);
    results.push(`Time: ${news.timestamp}`);
    results.push('');
    
    // Notify all subscribers
    results.push(...this.notify(news));
    
    return results;
  }
  
  getSubscriberCount() {
    return this.subscribers.length;
  }
  
  getNewsCount() {
    return this.news.length;
  }
}

// Specialized Publisher with filtering
class CategoryNewsPublisher extends NewsPublisher {
  constructor(name) {
    super(name);
    this.categorySubscribers = new Map();
  }
  
  subscribeToCategory(subscriber, category) {
    if (!this.categorySubscribers.has(category)) {
      this.categorySubscribers.set(category, []);
    }
    
    const subscribers = this.categorySubscribers.get(category);
    if (!subscribers.includes(subscriber)) {
      subscribers.push(subscriber);
      return `✅ ${subscriber.name} subscribed to ${category} news`;
    }
    return `⚠️  ${subscriber.name} already subscribed to ${category}`;
  }
  
  publishNews(title, content, category = 'General') {
    const news = {
      title,
      content,
      category,
      timestamp: new Date().toLocaleTimeString(),
      publisher: this.name
    };
    
    this.news.push(news);
    
    const results = [];
    results.push(`\n📰 NEW ${category.toUpperCase()} ARTICLE`);
    results.push(`Title: ${title}`);
    results.push(`Time: ${news.timestamp}`);
    results.push('');
    
    // Notify all general subscribers
    results.push(`📢 Notifying general subscribers (${this.subscribers.length})...`);
    this.subscribers.forEach(subscriber => {
      results.push(subscriber.update(news));
    });
    
    // Notify category-specific subscribers
    if (this.categorySubscribers.has(category)) {
      const categorySubscribers = this.categorySubscribers.get(category);
      results.push(`📢 Notifying ${category} subscribers (${categorySubscribers.length})...`);
      categorySubscribers.forEach(subscriber => {
        results.push(subscriber.update(news));
      });
    }
    
    return results;
  }
}

export default NewsPublisher;
export {
  EmailSubscriber,
  SMSSubscriber,
  PushNotificationSubscriber,
  AppSubscriber,
  CategoryNewsPublisher
};
