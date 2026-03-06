# Factory Pattern 🏭

## What is it?

The Factory pattern provides an interface for creating objects without specifying their exact class. It's like ordering from a menu - you ask for "pizza" without knowing how the kitchen makes it.

## Real-World Analogy 🌍

Think of a **vehicle factory**. You tell the factory "I need a car" or "I need a bike", and the factory handles all the complexity of building it. You don't need to know:
- Which parts to assemble
- In what order
- What tools to use

You just say what you want, and the factory delivers!

## When to Use It? 🤔

Use Factory when:
- You don't know beforehand which exact class you need
- You want to **centralize object creation** logic
- You want to make your code more **flexible and extensible**
- Examples: Creating different types of documents, vehicles, notifications

## Problem it Solves ❌

Without Factory:
```python
# Client code needs to know all the details
if vehicle_type == "car":
    vehicle = Car(4, "gasoline", True)
elif vehicle_type == "bike":
    vehicle = Bike(2, "manual", False)
# Adding new vehicle? Change this code everywhere!
```

With Factory:
```python
# Client just asks for what they want
vehicle = VehicleFactory.create_vehicle("car")
# Adding new vehicle? Just update the factory!
```

## Key Benefits ✅

- **Loose coupling**: Client doesn't depend on concrete classes
- **Single Responsibility**: Creation logic in one place
- **Easy to extend**: Add new types without changing client code
- **Hides complexity**: Client doesn't need to know construction details

## Code Example

See the following files for complete working examples:
- `NotificationFactory.js` - Factory for creating different notification types
- `FactoryExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Over-engineering**: Don't use for simple object creation
- **Too many factories**: Keep it simple, don't create factory for everything

## Remember This! 💡

**"Order from the menu, don't cook yourself"** - Just like ordering at a restaurant, you specify what you want, and the factory (kitchen) handles the creation!
