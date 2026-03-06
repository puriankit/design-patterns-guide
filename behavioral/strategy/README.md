# Strategy Pattern 🎯

## What is it?

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it. Think of it as having different routes to reach the same destination.

## Real-World Analogy 🌍

Think of **payment methods** at checkout:
- You can pay with credit card
- Or pay with PayPal
- Or pay with Apple Pay
- Same goal (payment), different strategies!

Another example: **Navigation apps** - you can choose fastest route, shortest route, or scenic route. Same destination, different strategies.

## When to Use It? 🤔

Use Strategy when:
- You have **multiple algorithms** for a specific task
- You want to switch algorithms at **runtime**
- You want to avoid **conditional statements** (if/else chains)
- Examples: Sorting algorithms, payment methods, compression algorithms, validation rules

## Problem it Solves ❌

Without Strategy:
```javascript
class PaymentProcessor {
  processPayment(method, amount) {
    if (method === 'credit') {
      // Credit card logic
    } else if (method === 'paypal') {
      // PayPal logic
    } else if (method === 'crypto') {
      // Crypto logic
    }
    // Adding new method? Modify this class!
  }
}
```

With Strategy:
```javascript
// Each strategy is separate
const processor = new PaymentProcessor(new CreditCardStrategy());
processor.pay(100); // Uses credit card

processor.setStrategy(new PayPalStrategy());
processor.pay(100); // Uses PayPal
```

## Key Benefits ✅

- **Eliminates conditionals**: No more if/else chains
- **Easy to extend**: Add new strategies without modifying existing code
- **Runtime switching**: Change algorithm on the fly
- **Testable**: Each strategy can be tested independently

## Code Example

See the following files for complete working examples:
- `PaymentStrategy.js` - Different payment strategies
- `StrategyExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Too many strategies**: Don't create strategy for everything
- **Client awareness**: Client must know about different strategies
- **Overhead**: More classes to manage

## Remember This! 💡

**"Different ways to achieve the same goal"** - Like choosing between driving, flying, or taking a train to reach your destination!
