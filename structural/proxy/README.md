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

Use Proxy when you need to control access to an object or add functionality without changing it.

### Perfect Use Cases:

**1. Lazy Loading (Virtual Proxy)**
- Why: Loading large objects (images, videos) is expensive
- Benefit: Load only when actually needed, faster startup

**2. Access Control (Protection Proxy)**
- Why: Some users shouldn't access certain objects
- Benefit: Centralized permission checking

**3. Caching (Cache Proxy)**
- Why: Repeated operations are expensive
- Benefit: Cache results, serve from cache when possible

**4. Logging (Logging Proxy)**
- Why: Need to track object usage
- Benefit: Log all access without changing original object

**5. Remote Objects (Remote Proxy)**
- Why: Object exists on different server
- Benefit: Local proxy handles network communication

### When NOT to Use:
- ❌ Direct access is sufficient
- ❌ No need for lazy loading or access control
- ❌ Adds unnecessary complexity

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

### 1. **Lazy Initialization**
Create expensive objects only when actually needed.

**Real-World Impact:**
- Faster application startup
- Lower memory usage
- Better resource management
- Improved user experience

**Example:** App has 100 high-res images. Loading all = 500MB, 10 seconds. With Proxy, load on-demand = 5MB, instant startup. 100x faster!

### 2. **Access Control**
Control who can access the object and when.

**Real-World Impact:**
- Security enforcement
- Permission checking
- Audit trail
- Compliance

**Example:** Admin documents need permission check. Proxy verifies user role before allowing access. Unauthorized users blocked automatically!

### 3. **Caching**
Cache expensive operations for better performance.

**Real-World Impact:**
- Faster response times
- Reduced server load
- Lower costs
- Better scalability

**Example:** API call takes 2 seconds. First call: 2s. Cached calls: 0.001s. 2000x faster for repeated requests!

### 4. **Additional Functionality**
Add logging, validation, monitoring without changing original object.

**Real-World Impact:**
- Non-invasive enhancements
- Original object stays clean
- Easy to add/remove features
- Separation of concerns

**Example:** Add logging to database calls. Proxy logs every query. Original database class unchanged. Clean separation!

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
