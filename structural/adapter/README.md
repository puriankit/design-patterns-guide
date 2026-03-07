# Adapter Pattern 🔌

## What is it?

The Adapter pattern allows incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces, like a power adapter that lets you plug a US device into a European outlet.

## Real-World Analogy 🌍

Think of a **power adapter** when traveling:
- Your phone charger has a US plug (2 flat pins)
- European outlets expect a different plug (2 round pins)
- An adapter makes them compatible!

Another example: **Language translator** - translates between two people who speak different languages.

## When to Use It? 🤔

Use Adapter when you need to make incompatible interfaces work together.

### Perfect Use Cases:

**1. Third-Party Library Integration**
- Why: External libraries have different interfaces than your code
- Benefit: Wrap library with adapter, use consistent interface

**2. Legacy System Integration**
- Why: Old code uses outdated interfaces
- Benefit: Adapt old interface to new standards without rewriting

**3. Multiple Payment Gateways**
- Why: Stripe, PayPal, Square all have different APIs
- Benefit: One adapter per gateway, uniform interface in your app

**4. Database Abstraction**
- Why: MySQL, PostgreSQL, MongoDB have different query methods
- Benefit: Adapt each to common interface, switch databases easily

**5. API Version Migration**
- Why: API v1 and v2 have different structures
- Benefit: Adapt v1 to v2 interface during migration period

### When NOT to Use:
- ❌ Interfaces are already compatible
- ❌ You can modify the original class
- ❌ Simple wrapper is sufficient

## Problem it Solves ❌

Without Adapter:
```javascript
// Old payment system
const oldPayment = new LegacyPaymentSystem();
oldPayment.makePayment(100);

// New payment system expects different interface
const newPayment = new ModernPaymentSystem();
newPayment.processPayment({ amount: 100, currency: 'USD' });

// Can't use them interchangeably!
```

With Adapter:
```javascript
// Adapter makes old system work with new interface
const adapter = new PaymentAdapter(oldPayment);
adapter.processPayment({ amount: 100, currency: 'USD' });

// Now both work the same way!
```

## Key Benefits ✅

### 1. **Reuse Existing Code**
Don't rewrite working code - just adapt it.

**Real-World Impact:**
- Save development time
- Avoid introducing new bugs
- Leverage tested code
- Faster integration

**Example:** Legacy payment system has 10,000 lines of tested code. Instead of rewriting (2 months), create adapter (2 days). 30x time savings!

### 2. **Decouple Client from Implementation**
Client code doesn't know about the adapted class.

**Real-World Impact:**
- Easy to swap implementations
- Client code stays clean
- Better testability
- Flexible architecture

**Example:** Your app uses PaymentAdapter interface. Switch from Stripe to PayPal? Just swap the adapter - zero changes to app code!

### 3. **Single Responsibility**
Adapter's only job is interface conversion.

**Real-World Impact:**
- Clear, focused code
- Easy to understand
- Simple to maintain
- One reason to change

**Example:** StripeAdapter only converts your interface to Stripe's. Payment logic stays in your code. Clear separation!

### 4. **Open/Closed Principle**
Add new adapters without modifying existing code.

**Real-World Impact:**
- No risk to working code
- Easy to extend
- Support multiple systems
- Gradual migration

**Example:** Supporting 3 payment gateways? Add 3 adapters. Each independent. No changes to core payment code!

## Code Example

See the following files for complete working examples:
- `PaymentAdapter.js` - Adapter for legacy payment systems
- `AdapterExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Too many adapters**: Can make code complex
- **Performance overhead**: Extra layer of abstraction
- **Confusion**: Make it clear when using adapters

## Remember This! 💡

**"Make incompatible things work together"** - Like a power adapter for your phone, it bridges the gap between different interfaces!
