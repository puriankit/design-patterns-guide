# Builder Pattern 🏗️

## What is it?

The Builder pattern lets you construct complex objects step by step. It allows you to produce different types and representations of an object using the same construction process.

## Real-World Analogy 🌍

Think of **building a custom burger at a restaurant**:
- Choose bun type (sesame, whole wheat, gluten-free)
- Add patty (beef, chicken, veggie)
- Add cheese (cheddar, swiss, no cheese)
- Add toppings (lettuce, tomato, onions, pickles)
- Add sauce (ketchup, mayo, mustard)

You build it step by step, and each customer can customize their burger differently!

Another example: **Configuring a smartphone** - you choose storage, color, accessories, warranty, etc.

## When to Use It? 🤔

Use Builder when you need to construct complex objects with many optional parameters.

### Perfect Use Cases:

**1. User Profile Creation**
- Why: Users have many optional fields (bio, avatar, preferences, settings)
- Benefit: Clear, readable code instead of massive constructors

**2. Query Builders (SQL, API)**
- Why: Queries have many optional parts (WHERE, ORDER BY, LIMIT, JOIN)
- Benefit: Build queries step-by-step, easy to understand

**3. Form Builders**
- Why: Forms have many fields, validations, and configurations
- Benefit: Fluent interface makes form creation intuitive

**4. HTTP Request Configuration**
- Why: Requests have headers, params, body, timeout, etc.
- Benefit: Chain methods to configure complex requests

**5. UI Component Configuration**
- Why: Components have many props (style, behavior, content)
- Benefit: Readable component setup

### When NOT to Use:
- ❌ Objects with only 2-3 parameters (use constructor)
- ❌ All parameters are required (no optional fields)
- ❌ Simple data structures (use object literals)

## Problem it Solves ❌

Without Builder:
```javascript
// Constructor with too many parameters - confusing!
const user = new User(
  'John',
  'Doe',
  'john@example.com',
  25,
  'USA',
  'New York',
  '12345',
  true,
  false,
  'premium'
);
// What does each parameter mean? Hard to remember!
```

With Builder:
```javascript
// Clear and readable!
const user = new UserBuilder()
  .setFirstName('John')
  .setLastName('Doe')
  .setEmail('john@example.com')
  .setAge(25)
  .setCountry('USA')
  .setCity('New York')
  .build();
```

## Key Benefits ✅

### 1. **Readable and Self-Documenting Code**
Method names make it crystal clear what each parameter does.

**Real-World Impact:**
- No need to remember parameter order
- Code reads like English sentences
- New developers understand immediately

**Example:** Compare `new User('John', 'Doe', 25, true, false, 'premium')` vs `new UserBuilder().setFirstName('John').setLastName('Doe').setAge(25).build()` - second is obvious!

### 2. **Flexible Construction**
Build objects step-by-step, only setting what you need.

**Real-World Impact:**
- Handle optional parameters elegantly
- No need for multiple constructors
- Easy to add new optional fields

**Example:** One user needs just name and email, another needs full profile with 15 fields. Same builder handles both!

### 3. **Immutability Support**
Create immutable objects that can't be changed after construction.

**Real-World Impact:**
- Thread-safe objects
- Predictable behavior
- Easier debugging

**Example:** Once `build()` is called, the object is locked. No accidental modifications!

### 4. **Validation at Build Time**
Validate the complete object before creation.

**Real-World Impact:**
- Catch errors early
- Ensure object is always in valid state
- Better error messages

**Example:** Builder can check "email is required" or "age must be 18+" before creating the object.

## Code Example

See the following files for complete working examples:
- `UserProfileBuilder.js` - Builder for creating user profiles
- `BuilderExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Over-engineering**: Don't use for simple objects with few parameters
- **Verbosity**: More code than simple constructor (but more readable!)

## Remember This! 💡

**"Build it your way, step by step"** - Like building with LEGO blocks, you add one piece at a time to create exactly what you want!
