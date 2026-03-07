# Decorator Pattern 🎨

## What is it?

The Decorator pattern lets you attach new behaviors to objects by placing them inside wrapper objects that contain these behaviors. It's like adding toppings to a pizza - each topping adds new features without changing the base pizza.

## Real-World Analogy 🌍

Think of **coffee at Starbucks**:
- Start with basic coffee ($2)
- Add milk (+$0.50)
- Add whipped cream (+$0.70)
- Add caramel (+$0.60)
- Final price: $3.80

Each addition "decorates" the coffee with new features and cost!

Another example: **Dressing up** - you start with basic clothes and add accessories (watch, hat, scarf) to enhance your look.

## When to Use It? 🤔

Use Decorator when you need to add features to objects dynamically without changing their structure.

### Perfect Use Cases:

**1. UI Component Enhancement**
- Why: Components need different combinations of features (borders, shadows, animations)
- Benefit: Stack decorators instead of creating subclasses for each combination

**2. Text Formatting**
- Why: Text needs various formats (bold, italic, underline, color)
- Benefit: Apply any combination at runtime

**3. Middleware/Interceptors**
- Why: HTTP requests need logging, auth, caching, compression
- Benefit: Chain middleware in any order

**4. Stream Processing**
- Why: Data streams need encryption, compression, buffering
- Benefit: Wrap streams with any combination of features

**5. Notification Enhancement**
- Why: Notifications need different delivery methods and formatting
- Benefit: Decorate with SMS, email, push dynamically

### When NOT to Use:
- ❌ Simple feature addition (just extend the class)
- ❌ Only one combination needed
- ❌ Order of decorators doesn't matter

## Problem it Solves ❌

Without Decorator:
```javascript
// Need separate class for each combination!
class CoffeeWithMilk extends Coffee { }
class CoffeeWithMilkAndSugar extends Coffee { }
class CoffeeWithMilkAndSugarAndCream extends Coffee { }
// Explosion of classes!
```

With Decorator:
```javascript
let coffee = new BasicCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new CreamDecorator(coffee);
// Flexible combinations!
```

## Key Benefits ✅

### 1. **More Flexible Than Inheritance**
Add or remove features at runtime, not compile time.

**Real-World Impact:**
- Change behavior dynamically
- User preferences control features
- A/B testing different combinations
- Runtime configuration

**Example:** User toggles "bold" on/off. With inheritance, you'd need BoldText and NormalText classes. With Decorator, wrap/unwrap BoldDecorator at runtime!

### 2. **Avoid Class Explosion**
No need for a class for every feature combination.

**Real-World Impact:**
- Fewer classes to maintain
- Cleaner codebase
- Easy to add new features
- Scalable architecture

**Example:** 5 text features = 32 possible combinations = 32 classes! With Decorator, 5 decorator classes handle all combinations.

### 3. **Single Responsibility Principle**
Each decorator does one thing well.

**Real-World Impact:**
- Easy to understand
- Simple to test
- Reusable decorators
- Clear code organization

**Example:** BoldDecorator only makes text bold. ItalicDecorator only makes text italic. Each focused, each reusable.

### 4. **Composable and Stackable**
Combine decorators in any order to create complex behavior.

**Real-World Impact:**
- Unlimited combinations
- Order can matter (encryption then compression)
- Mix and match features
- Flexible architecture

**Example:** Text can be bold + italic + underlined + colored. Stack 4 decorators. Need different combo? Rearrange the stack!

## Code Example

See the following files for complete working examples:
- `TextDecorator.js` - Decorator for text formatting
- `DecoratorExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Too many small objects**: Can be hard to debug
- **Order matters**: Decorators may depend on order
- **Complexity**: Can make code harder to understand

## Remember This! 💡

**"Wrap it up, add features on the fly"** - Like wrapping a gift with multiple layers, each decorator adds something new!
