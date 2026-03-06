/**
 * Strategy Pattern - Real World Example
 * Payment processing with different strategies
 * 
 * Use Case: Supporting multiple payment methods interchangeably
 */

// Strategy Interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('pay() must be implemented');
  }
  
  validate(paymentDetails) {
    throw new Error('validate() must be implemented');
  }
}

// Concrete Strategies
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, cvv, expiryDate) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
    this.name = 'Credit Card';
  }
  
  validate(paymentDetails) {
    if (!this.cardNumber || this.cardNumber.length !== 16) {
      return { valid: false, message: 'Invalid card number' };
    }
    if (!this.cvv || this.cvv.length !== 3) {
      return { valid: false, message: 'Invalid CVV' };
    }
    return { valid: true, message: 'Card validated' };
  }
  
  pay(amount) {
    const validation = this.validate();
    if (!validation.valid) {
      return `❌ Payment failed: ${validation.message}`;
    }
    
    return `💳 Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`;
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
    this.name = 'PayPal';
  }
  
  validate(paymentDetails) {
    if (!this.email || !this.email.includes('@')) {
      return { valid: false, message: 'Invalid email' };
    }
    if (!this.password) {
      return { valid: false, message: 'Password required' };
    }
    return { valid: true, message: 'PayPal account validated' };
  }
  
  pay(amount) {
    const validation = this.validate();
    if (!validation.valid) {
      return `❌ Payment failed: ${validation.message}`;
    }
    
    return `💙 Paid $${amount} using PayPal account ${this.email}`;
  }
}

class CryptoStrategy extends PaymentStrategy {
  constructor(walletAddress, cryptoType = 'Bitcoin') {
    super();
    this.walletAddress = walletAddress;
    this.cryptoType = cryptoType;
    this.name = 'Cryptocurrency';
  }
  
  validate(paymentDetails) {
    if (!this.walletAddress || this.walletAddress.length < 26) {
      return { valid: false, message: 'Invalid wallet address' };
    }
    return { valid: true, message: 'Wallet validated' };
  }
  
  pay(amount) {
    const validation = this.validate();
    if (!validation.valid) {
      return `❌ Payment failed: ${validation.message}`;
    }
    
    const cryptoAmount = (amount / 50000).toFixed(8); // Mock conversion
    return `₿ Paid ${cryptoAmount} ${this.cryptoType} from wallet ${this.walletAddress.slice(0, 8)}...`;
  }
}

class ApplePayStrategy extends PaymentStrategy {
  constructor(deviceId) {
    super();
    this.deviceId = deviceId;
    this.name = 'Apple Pay';
  }
  
  validate(paymentDetails) {
    if (!this.deviceId) {
      return { valid: false, message: 'Device not registered' };
    }
    return { valid: true, message: 'Apple Pay ready' };
  }
  
  pay(amount) {
    const validation = this.validate();
    if (!validation.valid) {
      return `❌ Payment failed: ${validation.message}`;
    }
    
    return ` Paid $${amount} using Apple Pay on device ${this.deviceId}`;
  }
}

class BankTransferStrategy extends PaymentStrategy {
  constructor(accountNumber, routingNumber) {
    super();
    this.accountNumber = accountNumber;
    this.routingNumber = routingNumber;
    this.name = 'Bank Transfer';
  }
  
  validate(paymentDetails) {
    if (!this.accountNumber || !this.routingNumber) {
      return { valid: false, message: 'Invalid bank details' };
    }
    return { valid: true, message: 'Bank account validated' };
  }
  
  pay(amount) {
    const validation = this.validate();
    if (!validation.valid) {
      return `❌ Payment failed: ${validation.message}`;
    }
    
    return `🏦 Paid $${amount} via Bank Transfer from account ***${this.accountNumber.slice(-4)}`;
  }
}

// Context - Uses a strategy
class PaymentProcessor {
  constructor(strategy = null) {
    this.strategy = strategy;
    this.transactionHistory = [];
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
    return `✅ Payment method changed to ${strategy.name}`;
  }
  
  processPayment(amount) {
    if (!this.strategy) {
      return '❌ No payment method selected';
    }
    
    const result = this.strategy.pay(amount);
    
    this.transactionHistory.push({
      amount,
      method: this.strategy.name,
      timestamp: new Date().toLocaleTimeString(),
      result
    });
    
    return result;
  }
  
  getTransactionHistory() {
    return this.transactionHistory;
  }
  
  getCurrentMethod() {
    return this.strategy ? this.strategy.name : 'None';
  }
}

export default PaymentProcessor;
export {
  CreditCardStrategy,
  PayPalStrategy,
  CryptoStrategy,
  ApplePayStrategy,
  BankTransferStrategy
};
