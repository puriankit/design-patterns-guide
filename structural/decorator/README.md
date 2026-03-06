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

Use Decorator when:
- You want to add responsibilities to objects **dynamically**
- Extension by subclassing is **impractical**
- You need **flexible combinations** of features
- Examples: Adding features to UI components, middleware in Express.js, stream wrappers

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

- **More flexible than inheritance**: Add/remove features at runtime
- **Avoid class explosion**: Don't need class for every combination
- **Single Responsibility**: Each decorator has one job
- **Composable**: Stack decorators in any order

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
