/**
 * ============================================================================
 * FACTORY PATTERN - Notification System Example
 * ============================================================================
 * 
 * WHAT THIS DOES:
 * Creates different types of notifications (Push, Email, SMS) without the client
 * needing to know the specific class or construction details.
 * 
 * WHY THIS IS USEFUL:
 * - Add new notification types without changing client code
 * - Centralize notification creation logic
 * - Hide complex initialization from client
 * - Easy to switch notification types at runtime
 * 
 * HOW IT WORKS:
 * 1. Client calls: NotificationFactory.create('push', config)
 * 2. Factory determines which class to instantiate
 * 3. Factory creates and returns the appropriate notification object
 * 4. Client uses the notification without knowing its concrete type
 * 
 * REAL-WORLD ANALOGY:
 * Like ordering from a restaurant menu. You say "I want pizza" and the kitchen
 * (factory) handles all the complexity of making it. You don't need to know
 * the recipe, ingredients, or cooking process.
 * ============================================================================
 */

class Notification {
  constructor(title, message) {
    this.title = title;
    this.message = message;
    this.timestamp = new Date();
  }
  
  send() {
    throw new Error('send() must be implemented by subclass');
  }
  
  getInfo() {
    throw new Error('getInfo() must be implemented by subclass');
  }
}

// ============================================================================
// CONCRETE NOTIFICATION TYPES
// ============================================================================
// Each type implements the send() method differently

/**
 * Push Notification - Sends to mobile devices
 * Requires: device token for targeting specific device
 */
class PushNotification extends Notification {
  constructor(title, message, deviceToken) {
    super(title, message);
    this.deviceToken = deviceToken;
    this.type = 'push';
    this.icon = '🔔';
  }
  
  send() {
    // In real app, this would call Firebase Cloud Messaging or similar
    return `${this.icon} Sending Push Notification to ${this.deviceToken}: ${this.message}`;
  }
  
  getInfo() {
    return {
      type: this.type,
      title: this.title,
      message: this.message,
      deviceToken: this.deviceToken,
      timestamp: this.timestamp.toLocaleTimeString()
    };
  }
}

/**
 * Email Notification - Sends via email
 * Requires: recipient email address
 */
class EmailNotification extends Notification {
  constructor(title, message, email) {
    super(title, message);
    this.email = email;
    this.type = 'email';
    this.icon = '📧';
  }
  
  send() {
    // In real app, this would use SendGrid, AWS SES, or similar
    return `${this.icon} Sending Email to ${this.email}: ${this.message}`;
  }
  
  getInfo() {
    return {
      type: this.type,
      title: this.title,
      message: this.message,
      email: this.email,
      timestamp: this.timestamp.toLocaleTimeString()
    };
  }
}

/**
 * SMS Notification - Sends via text message
 * Requires: phone number
 */
class SMSNotification extends Notification {
  constructor(title, message, phoneNumber) {
    super(title, message);
    this.phoneNumber = phoneNumber;
    this.type = 'sms';
    this.icon = '📱';
  }
  
  send() {
    // In real app, this would use Twilio, AWS SNS, or similar
    return `${this.icon} Sending SMS to ${this.phoneNumber}: ${this.message}`;
  }
  
  getInfo() {
    return {
      type: this.type,
      title: this.title,
      message: this.message,
      phoneNumber: this.phoneNumber,
      timestamp: this.timestamp.toLocaleTimeString()
    };
  }
}

/**
 * In-App Notification - Shows within the app
 * Requires: user ID to target specific user
 */
class InAppNotification extends Notification {
  constructor(title, message, userId) {
    super(title, message);
    this.userId = userId;
    this.type = 'inapp';
    this.icon = '💬';
  }
  
  send() {
    // In real app, this would update app state/show toast
    return `${this.icon} Showing In-App Notification to user ${this.userId}: ${this.message}`;
  }
  
  getInfo() {
    return {
      type: this.type,
      title: this.title,
      message: this.message,
      userId: this.userId,
      timestamp: this.timestamp.toLocaleTimeString()
    };
  }
}

// ============================================================================
// FACTORY CLASS - The Heart of the Pattern
// ============================================================================
/**
 * NotificationFactory - Creates notification objects
 * 
 * This is where the magic happens! The factory:
 * 1. Takes a type and configuration
 * 2. Decides which class to instantiate
 * 3. Returns the appropriate notification object
 * 
 * KEY BENEFIT: Client code doesn't need to know about PushNotification,
 * EmailNotification, etc. It just calls the factory!
 */
class NotificationFactory {
  /**
   * Create a notification of the specified type
   * 
   * @param {string} type - Type of notification ('push', 'email', 'sms', 'inapp')
   * @param {object} config - Configuration object with notification details
   * @returns {Notification} - Appropriate notification instance
   * 
   * IMPORTANT: Adding a new notification type?
   * 1. Create the new class (e.g., SlackNotification)
   * 2. Add a case here
   * 3. That's it! All client code automatically supports it!
   */
  static create(type, config) {
    const { title, message, deviceToken, email, phoneNumber, userId } = config;
    
    // Factory decides which class to instantiate based on type
    switch(type.toLowerCase()) {
      case 'push':
        return new PushNotification(title, message, deviceToken);
      case 'email':
        return new EmailNotification(title, message, email);
      case 'sms':
        return new SMSNotification(title, message, phoneNumber);
      case 'inapp':
        return new InAppNotification(title, message, userId);
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  }
  
  static getAvailableTypes() {
    return ['push', 'email', 'sms', 'inapp'];
  }
}

export default NotificationFactory;
export { PushNotification, EmailNotification, SMSNotification, InAppNotification };
