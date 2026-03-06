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

Use Adapter when:
- You want to use an existing class but its interface doesn't match what you need
- You need to create a **reusable class** that works with unrelated classes
- You're integrating **third-party libraries** with incompatible interfaces
- Examples: API wrappers, legacy code integration, third-party SDK adapters

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

- **Reuse existing code**: Don't rewrite working code
- **Decouple client from implementation**: Client doesn't know about adapter
- **Single Responsibility**: Adapter handles conversion logic
- **Open/Closed Principle**: Add adapters without modifying existing code

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
