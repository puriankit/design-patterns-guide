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

Use Strategy when you have multiple ways to accomplish the same task and want to switch between them.

### Perfect Use Cases:

**1. Payment Processing**
- Why: Multiple payment methods (credit card, PayPal, crypto)
- Benefit: Switch payment method without changing checkout code

**2. Sorting Algorithms**
- Why: Different algorithms for different data sizes (quicksort, mergesort, bubblesort)
- Benefit: Choose optimal algorithm at runtime

**3. Compression Methods**
- Why: Different compression levels (fast, balanced, maximum)
- Benefit: User selects compression strategy

**4. Validation Rules**
- Why: Different validation for different contexts (strict, lenient, custom)
- Benefit: Apply appropriate validation dynamically

**5. Navigation Routes**
- Why: Fastest, shortest, scenic routes
- Benefit: User switches route preference anytime

### When NOT to Use:
- ❌ Only one algorithm exists
- ❌ Algorithm never changes
- ❌ Simple if/else is clearer

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

### 1. **Eliminates Conditional Statements**
Replace long if/else chains with clean strategy objects.

**Real-World Impact:**
- More readable code
- Easier to maintain
- Less error-prone
- Better code organization

**Example:** Payment processing with 10 methods = 10 if/else blocks (messy!). With Strategy, 10 clean strategy classes. Much clearer!

### 2. **Open/Closed Principle**
Add new strategies without modifying existing code.

**Real-World Impact:**
- No risk to working code
- Easy to extend
- Safe to add features
- Plugin architecture

**Example:** Add cryptocurrency payment? Create CryptoStrategy class. Zero changes to existing payment code. Existing strategies unaffected!

### 3. **Runtime Flexibility**
Switch algorithms on the fly based on context.

**Real-World Impact:**
- User preferences
- Performance optimization
- A/B testing
- Dynamic behavior

**Example:** User starts with credit card, switches to PayPal mid-checkout. One line: `processor.setStrategy(new PayPalStrategy())`. Instant switch!

### 4. **Testability**
Each strategy can be tested in isolation.

**Real-World Impact:**
- Focused unit tests
- Easy to mock
- Better test coverage
- Faster debugging

**Example:** Test CreditCardStrategy independently. No need to test entire payment system. Isolated, fast, reliable tests!

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
