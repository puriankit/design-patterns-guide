/**
 * Factory Pattern - Real World Example
 * Notification Factory that creates different types of notifications
 * 
 * Use Case: Creating different notification types without knowing exact class
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

class PushNotification extends Notification {
  constructor(title, message, deviceToken) {
    super(title, message);
    this.deviceToken = deviceToken;
    this.type = 'Push';
    this.icon = '🔔';
  }
  
  send() {
    return `${this.icon} Sending PUSH notification to device ${this.deviceToken}`;
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

class EmailNotification extends Notification {
  constructor(title, message, email) {
    super(title, message);
    this.email = email;
    this.type = 'Email';
    this.icon = '📧';
  }
  
  send() {
    return `${this.icon} Sending EMAIL to ${this.email}`;
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

class SMSNotification extends Notification {
  constructor(title, message, phoneNumber) {
    super(title, message);
    this.phoneNumber = phoneNumber;
    this.type = 'SMS';
    this.icon = '📱';
  }
  
  send() {
    return `${this.icon} Sending SMS to ${this.phoneNumber}`;
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

class InAppNotification extends Notification {
  constructor(title, message, userId) {
    super(title, message);
    this.userId = userId;
    this.type = 'In-App';
    this.icon = '💬';
  }
  
  send() {
    return `${this.icon} Showing IN-APP notification to user ${this.userId}`;
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

class NotificationFactory {
  /**
   * Create a notification based on type
   * Client doesn't need to know which class to instantiate
   */
  static create(type, data) {
    const { title, message } = data;
    
    switch (type.toLowerCase()) {
      case 'push':
        return new PushNotification(title, message, data.deviceToken);
      
      case 'email':
        return new EmailNotification(title, message, data.email);
      
      case 'sms':
        return new SMSNotification(title, message, data.phoneNumber);
      
      case 'inapp':
        return new InAppNotification(title, message, data.userId);
      
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
