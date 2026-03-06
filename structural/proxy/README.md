# Proxy Pattern 🚪

## What is it?

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. It's like a security guard at a building entrance - they control who gets in and when.

## Real-World Analogy 🌍

Think of a **credit card**:
- It's a proxy for your bank account
- You don't carry cash everywhere
- The card controls access to your money
- Adds security (PIN, fraud detection)

Another example: **Virtual assistant** - they screen your calls and schedule, controlling access to your time.

## When to Use It? 🤔

Use Proxy when:
- You need **lazy initialization** (create object only when needed)
- You want to **control access** to an object
- You need **logging, caching, or validation** before accessing object
- Examples: Image lazy loading, access control, caching, logging

## Problem it Solves ❌

Without Proxy:
```javascript
// Load all images immediately (slow!)
const image1 = new HighResImage('photo1.jpg'); // Loads now
const image2 = new HighResImage('photo2.jpg'); // Loads now
const image3 = new HighResImage('photo3.jpg'); // Loads now
// App is slow to start!
```

With Proxy:
```javascript
// Load images only when displayed
const image1 = new ImageProxy('photo1.jpg'); // Doesn't load yet
const image2 = new ImageProxy('photo2.jpg'); // Doesn't load yet
image1.display(); // Loads only when needed!
```

## Key Benefits ✅

- **Lazy initialization**: Create expensive objects only when needed
- **Access control**: Control who can access the object
- **Caching**: Cache results to improve performance
- **Logging**: Track object usage

## Code Example

See the following files for complete working examples:
- `ImageProxy.js` - Proxy for lazy loading images
- `ProxyExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Extra layer**: Adds complexity
- **Performance**: Proxy itself has overhead
- **Confusion**: Make it clear when using proxy

## Remember This! 💡

**"Control access, add features without changing the object"** - Like a security guard, proxy controls access and can add extra functionality!
