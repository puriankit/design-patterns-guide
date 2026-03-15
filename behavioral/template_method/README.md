# Template Method Pattern

## Overview

The **Template Method Pattern** is a behavioral design pattern that **defines the skeleton of an algorithm in a base class while allowing subclasses to override specific steps without changing the overall algorithm structure**.

It ensures that the **algorithm structure remains the same**, while certain steps can be customized by subclasses.

---

# Structure

```text
AbstractClass
   ├── templateMethod()
   │     ├── step1()
   │     ├── step2()
   │     └── step3()
   ↓
ConcreteClassA
ConcreteClassB
```

### Components

**Template Method**

* Defines the sequence of steps of an algorithm.

**Abstract Steps**

* Methods that subclasses must implement.

**Concrete Steps**

* Methods that are already implemented in the base class.

**Subclasses**

* Implement or override specific steps of the algorithm.

---

# Example

Suppose we are preparing different types of beverages.

Steps for making a beverage:

1. Boil water
2. Brew drink
3. Pour into cup
4. Add condiments

The overall process stays the same, but **brewing and condiments differ**.

---

# Step 1 – Abstract Class

```javascript
class Beverage {

  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  boilWater() {
    console.log("Boiling water");
  }

  pourInCup() {
    console.log("Pouring into cup");
  }

  brew() {
    throw new Error("brew() must be implemented");
  }

  addCondiments() {
    throw new Error("addCondiments() must be implemented");
  }

}
```

---

# Step 2 – Concrete Class (Tea)

```javascript
class Tea extends Beverage {

  brew() {
    console.log("Steeping the tea");
  }

  addCondiments() {
    console.log("Adding lemon");
  }

}
```

---

# Step 3 – Concrete Class (Coffee)

```javascript
class Coffee extends Beverage {

  brew() {
    console.log("Brewing coffee grounds");
  }

  addCondiments() {
    console.log("Adding sugar and milk");
  }

}
```

---

# Step 4 – Client Code

```javascript
const tea = new Tea();
tea.prepareRecipe();

const coffee = new Coffee();
coffee.prepareRecipe();
```

---

# Output

```text
Boiling water
Steeping the tea
Pouring into cup
Adding lemon
```

---

# Flow

```text
Client
  ↓
Template Method
  ↓
Common Steps (base class)
  ↓
Custom Steps (subclass)
```

---

# Advantages

* Reuses common code
* Prevents duplication
* Ensures algorithm structure remains consistent
* Allows controlled customization

---

# When to Use

Use the **Template Method Pattern** when:

* Multiple classes follow the **same algorithm structure**
* Some steps **vary between implementations**
* You want to **reuse common steps while allowing customization**

---

# Real World Examples

Common examples include:

* **Data parsing frameworks**
* **Game engines (game loop)**
* **Build pipelines**
* **File processing systems**

Example structure:

```text
ProcessFile()
  ↓
Open File
Parse Content (custom)
Process Data (custom)
Close File
```

---

# Summary

The **Template Method Pattern** defines the **structure of an algorithm in a base class while allowing subclasses to override specific steps**, ensuring consistency while enabling customization.
