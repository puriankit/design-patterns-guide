# Template Method Pattern 📋

## What is it?

The Template Method pattern defines the skeleton of an algorithm in a base class but lets subclasses override specific steps without changing the algorithm's structure. It's like a recipe - the steps are fixed, but ingredients can vary.

## Real-World Analogy 🌍

Think of **making different types of beverages**:
- All follow same steps: boil water, brew, pour, add condiments
- Coffee: brew coffee grounds, add sugar and milk
- Tea: steep tea bag, add lemon
- Same process, different implementations!

Another example: **Building a house** - foundation, walls, roof, interior (same steps), but materials and styles vary.

## When to Use It? 🤔

Use Template Method when:
- You have an algorithm with **fixed steps** but varying implementations
- You want to avoid **code duplication** in similar classes
- You want to control which parts of algorithm can be customized
- Examples: Data processing pipelines, game AI, document generators

## Problem it Solves ❌

Without Template Method:
```javascript
class CoffeeRecipe {
  make() {
    this.boilWater();
    this.brewCoffee();
    this.pourInCup();
    this.addSugarAndMilk();
  }
}

class TeaRecipe {
  make() {
    this.boilWater();  // Duplicated!
    this.steepTea();
    this.pourInCup();  // Duplicated!
    this.addLemon();
  }
}
```

With Template Method:
```javascript
class BeverageRecipe {
  make() {  // Template method
    this.boilWater();
    this.brew();  // Subclass implements
    this.pourInCup();
    this.addCondiments();  // Subclass implements
  }
}
```

## Key Benefits ✅

- **Code reuse**: Common steps in base class
- **Controlled customization**: Only specific steps can be overridden
- **Inversion of control**: Framework calls your code
- **Consistent structure**: All subclasses follow same algorithm

## Code Example

See the following files for complete working examples:
- `DataProcessor.js` - Template method for data processing
- `TemplateMethodExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Rigid structure**: Hard to add new steps
- **Inheritance coupling**: Tight coupling with base class
- **Limited flexibility**: Can't change algorithm structure

## Remember This! 💡

**"Fixed recipe, flexible ingredients"** - Like following a recipe, the steps are the same, but you can customize the ingredients!
