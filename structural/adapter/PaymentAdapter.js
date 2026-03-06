/**
 * Adapter Pattern - Real World Example
 * Payment system adapter for integrating legacy payment systems
 * 
 * Use Case: Making incompatible payment interfaces work together
 */

// Legacy Payment System (old interface)
class LegacyPaymentSystem {
  constructor() {
    this.name = 'Legacy Payment Gateway';
  }
  
  makePayment(amount) {
    return {
      success: true,
      message: `💳 Legacy system processed $${amount}`,
      transactionId: `LEG-${Date.now()}`
    };
  }
  
  refundPayment(transactionId, amount) {
    return {
      success: true,
      message: `💰 Legacy system refunded $${amount}`,
      refundId: `REF-${Date.now()}`
    };
  }
}

// Third-party Payment System (different interface)
class StripePaymentSystem {
  constructor() {
    this.name = 'Stripe Payment Gateway';
  }
  
  charge(paymentData) {
    return {
      status: 'succeeded',
      info: `💳 Stripe charged ${paymentData.amount} ${paymentData.currency}`,
      id: `stripe_${Date.now()}`
    };
  }
  
  createRefund(chargeId, refundData) {
    return {
      status: 'succeeded',
      info: `💰 Stripe refunded ${refundData.amount}`,
      refundId: `refund_${Date.now()}`
    };
  }
}

// Modern Payment Interface (what our app expects)
class PaymentProcessor {
  processPayment(paymentData) {
    throw new Error('processPayment() must be implemented');
  }
  
  processRefund(transactionId, refundData) {
    throw new Error('processRefund() must be implemented');
  }
}

// Adapter for Legacy System
class LegacyPaymentAdapter extends PaymentProcessor {
  constructor(legacySystem) {
    super();
    this.legacySystem = legacySystem;
    this.name = `${legacySystem.name} (Adapted)`;
  }
  
  processPayment(paymentData) {
    // Convert modern interface to legacy interface
    const result = this.legacySystem.makePayment(paymentData.amount);
    
    // Convert legacy response to modern format
    return {
      success: result.success,
      message: result.message,
      transactionId: result.transactionId,
      amount: paymentData.amount,
      currency: paymentData.currency || 'USD'
    };
  }
  
  processRefund(transactionId, refundData) {
    const result = this.legacySystem.refundPayment(transactionId, refundData.amount);
    
    return {
      success: result.success,
      message: result.message,
      refundId: result.refundId,
      amount: refundData.amount
    };
  }
}

// Adapter for Stripe
class StripePaymentAdapter extends PaymentProcessor {
  constructor(stripeSystem) {
    super();
    this.stripeSystem = stripeSystem;
    this.name = `${stripeSystem.name} (Adapted)`;
  }
  
  processPayment(paymentData) {
    // Convert modern interface to Stripe interface
    const result = this.stripeSystem.charge({
      amount: paymentData.amount,
      currency: paymentData.currency || 'USD'
    });
    
    // Convert Stripe response to modern format
    return {
      success: result.status === 'succeeded',
      message: result.info,
      transactionId: result.id,
      amount: paymentData.amount,
      currency: paymentData.currency || 'USD'
    };
  }
  
  processRefund(transactionId, refundData) {
    const result = this.stripeSystem.createRefund(transactionId, {
      amount: refundData.amount
    });
    
    return {
      success: result.status === 'succeeded',
      message: result.info,
      refundId: result.refundId,
      amount: refundData.amount
    };
  }
}

// Modern Payment System (already compatible)
class ModernPaymentSystem extends PaymentProcessor {
  constructor() {
    super();
    this.name = 'Modern Payment Gateway';
  }
  
  processPayment(paymentData) {
    return {
      success: true,
      message: `💳 Modern system processed ${paymentData.amount} ${paymentData.currency}`,
      transactionId: `MOD-${Date.now()}`,
      amount: paymentData.amount,
      currency: paymentData.currency
    };
  }
  
  processRefund(transactionId, refundData) {
    return {
      success: true,
      message: `💰 Modern system refunded ${refundData.amount}`,
      refundId: `MREF-${Date.now()}`,
      amount: refundData.amount
    };
  }
}

export {
  LegacyPaymentSystem,
  StripePaymentSystem,
  ModernPaymentSystem,
  LegacyPaymentAdapter,
  StripePaymentAdapter,
  PaymentProcessor
};
