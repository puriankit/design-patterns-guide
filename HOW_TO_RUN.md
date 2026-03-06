# How to Run the Examples 🚀

This guide explains how to run and test the design pattern examples in this repository.

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Running Individual Patterns](#running-individual-patterns)
3. [Using in React Native App](#using-in-react-native-app)
4. [Using in Node.js](#using-in-nodejs)
5. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Option 1: Test in Node.js (Fastest)

The simplest way to test the patterns is using Node.js:

```bash
# Navigate to the project
cd design-patterns-guide

# Run any pattern's main file
node creational/singleton/ApiService.js
node creational/factory/NotificationFactory.js
node behavioral/observer/NewsPublisher.js
```

### Option 2: Integrate into React Native App

Copy the pattern files into your React Native project and use them as components.

---

## Running Individual Patterns

### 1. **Singleton Pattern**

```bash
# Test the Singleton class
node creational/singleton/ApiService.js
```

**What you'll see:**
- Instance creation logs
- Proof that only one instance exists
- Shared state demonstration

**Use in your app:**
```javascript
import ApiService from './creational/singleton/ApiService';

// Get the singleton instance
const api = ApiService.getInstance();
api.setAuthToken('your-token');
await api.get('/users');
```

---

### 2. **Factory Pattern**

```bash
# Test the Factory
node creational/factory/NotificationFactory.js
```

**Use in your app:**
```javascript
import NotificationFactory from './creational/factory/NotificationFactory';

// Create different notification types
const pushNotif = NotificationFactory.create('push', {
  title: 'New Message',
  message: 'You have a new message!',
  deviceToken: 'device-123'
});

pushNotif.send();
```

---

### 3. **Builder Pattern**

```bash
# Test the Builder
node creational/builder/UserProfileBuilder.js
```

**Use in your app:**
```javascript
import UserProfileBuilder from './creational/builder/UserProfileBuilder';

// Build a user profile step by step
const user = new UserProfileBuilder()
  .setFirstName('John')
  .setLastName('Doe')
  .setEmail('john@example.com')
  .setAge(30)
  .build();
```

---

### 4. **Prototype Pattern**

```bash
# Test the Prototype
node creational/prototype/DocumentPrototype.js
```

**Use in your app:**
```javascript
import Document from './creational/prototype/DocumentPrototype';

// Create a template
const template = new Document('Template', 'Content here');

// Clone it
const doc1 = template.clone();
const doc2 = template.clone();
```

---

### 5. **Adapter Pattern**

```bash
# Test the Adapter
node structural/adapter/PaymentAdapter.js
```

**Use in your app:**
```javascript
import { LegacyPaymentSystem, LegacyPaymentAdapter } from './structural/adapter/PaymentAdapter';

// Wrap legacy system with adapter
const legacySystem = new LegacyPaymentSystem();
const adapter = new LegacyPaymentAdapter(legacySystem);

// Use modern interface
adapter.processPayment({ amount: 100, currency: 'USD' });
```

---

### 6. **Decorator Pattern**

```bash
# Test the Decorator
node structural/decorator/TextDecorator.js
```

**Use in your app:**
```javascript
import { TextComponent, BoldDecorator, ItalicDecorator } from './structural/decorator/TextDecorator';

// Stack decorators
let text = new TextComponent('Hello World');
text = new BoldDecorator(text);
text = new ItalicDecorator(text);

console.log(text.render()); // **_Hello World_**
```

---

### 7. **Facade Pattern**

```bash
# Test the Facade
node structural/facade/VideoRecorderFacade.js
```

**Use in your app:**
```javascript
import VideoRecorderFacade from './structural/facade/VideoRecorderFacade';

// Simple interface to complex system
const recorder = new VideoRecorderFacade();
recorder.startRecording('my-video.mp4');
// ... later
recorder.stopRecording();
```

---

### 8. **Proxy Pattern**

```bash
# Test the Proxy
node structural/proxy/ImageProxy.js
```

**Use in your app:**
```javascript
import ImageProxy from './structural/proxy/ImageProxy';

// Lazy loading with proxy
const image = new ImageProxy('large-image.jpg');
// Image not loaded yet!

image.display(); // Now it loads
```

---

### 9. **Observer Pattern**

```bash
# Test the Observer
node behavioral/observer/NewsPublisher.js
```

**Use in your app:**
```javascript
import NewsPublisher, { EmailSubscriber } from './behavioral/observer/NewsPublisher';

// Create publisher
const publisher = new NewsPublisher('Tech News');

// Add subscribers
const subscriber = new EmailSubscriber('user@example.com');
publisher.subscribe(subscriber);

// Publish news (all subscribers notified)
publisher.publishNews('Breaking News!', 'Content here...');
```

---

### 10. **Strategy Pattern**

```bash
# Test the Strategy
node behavioral/strategy/PaymentStrategy.js
```

**Use in your app:**
```javascript
import PaymentProcessor, { CreditCardStrategy, PayPalStrategy } from './behavioral/strategy/PaymentStrategy';

// Create processor
const processor = new PaymentProcessor();

// Switch strategies at runtime
processor.setStrategy(new CreditCardStrategy('1234...', '123', '12/25'));
processor.processPayment(99.99);

processor.setStrategy(new PayPalStrategy('user@email.com', 'pass'));
processor.processPayment(99.99);
```

---

### 11. **Command Pattern**

```bash
# Test the Command
node behavioral/command/TextEditorCommands.js
```

**Use in your app:**
```javascript
import CommandManager, { TextEditor, WriteCommand } from './behavioral/command/TextEditorCommands';

// Create editor and manager
const editor = new TextEditor();
const manager = new CommandManager();

// Execute commands
manager.executeCommand(new WriteCommand(editor, 'Hello'));
manager.executeCommand(new WriteCommand(editor, ' World'));

// Undo/Redo
manager.undo();
manager.redo();
```

---

### 12. **Template Method Pattern**

```bash
# Test the Template Method
node behavioral/template_method/DataProcessor.js
```

**Use in your app:**
```javascript
import { CSVProcessor, JSONProcessor } from './behavioral/template_method/DataProcessor';

// Use different processors with same algorithm
const csvProcessor = new CSVProcessor();
csvProcessor.process('data here');

const jsonProcessor = new JSONProcessor();
jsonProcessor.process('data here');
```

---

## Using in React Native App

### Step 1: Copy Pattern Files

Copy the pattern folder you want to use into your React Native project:

```bash
# Example: Copy Singleton pattern
cp -r creational/singleton /path/to/your/react-native-app/src/patterns/
```

### Step 2: Import and Use

```javascript
// In your React Native component
import React from 'react';
import { View, Text, Button } from 'react-native';
import ApiService from './patterns/singleton/ApiService';

const MyComponent = () => {
  const handlePress = async () => {
    const api = ApiService.getInstance();
    const result = await api.get('/users');
    console.log(result);
  };

  return (
    <View>
      <Button title="Fetch Users" onPress={handlePress} />
    </View>
  );
};

export default MyComponent;
```

### Step 3: Use the Example Components

The `*Example.js` files are full React Native components you can use directly:

```javascript
// In your App.js or navigation
import SingletonExample from './patterns/singleton/SingletonExample';

export default function App() {
  return <SingletonExample />;
}
```

---

## Using in Node.js

### Create Test Files

Create a test file for any pattern:

```javascript
// test-singleton.js
const ApiService = require('./creational/singleton/ApiService').default;

// Test 1: Create multiple instances
console.log('Creating first instance...');
const api1 = new ApiService();

console.log('Creating second instance...');
const api2 = new ApiService();

console.log('Are they the same?', api1 === api2); // true

// Test 2: Shared state
api1.setAuthToken('token-123');
console.log('Token set on api1');

console.log('Getting token from api2:', api2.token); // token-123
console.log('Shared state works!');
```

Run it:
```bash
node test-singleton.js
```

---

## Adding Export Statements for Node.js

If you want to run the files directly in Node.js, add this at the end of each main file:

```javascript
// At the end of ApiService.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiService;
}
```

Or use ES modules:

```javascript
// package.json
{
  "type": "module"
}
```

Then run:
```bash
node creational/singleton/ApiService.js
```

---

## Interactive Testing

### Create a Test Script

```javascript
// test-all-patterns.js
import ApiService from './creational/singleton/ApiService.js';
import NotificationFactory from './creational/factory/NotificationFactory.js';
// ... import other patterns

console.log('=== Testing Singleton ===');
const api1 = ApiService.getInstance();
const api2 = ApiService.getInstance();
console.log('Same instance?', api1 === api2);

console.log('\n=== Testing Factory ===');
const notification = NotificationFactory.create('push', {
  title: 'Test',
  message: 'Hello',
  deviceToken: 'device-123'
});
console.log(notification.send());

// ... test other patterns
```

---

## Troubleshooting

### Issue: "Cannot use import statement outside a module"

**Solution 1:** Add to package.json:
```json
{
  "type": "module"
}
```

**Solution 2:** Use `.mjs` extension:
```bash
mv file.js file.mjs
node file.mjs
```

**Solution 3:** Use CommonJS (require):
```javascript
const ApiService = require('./ApiService');
```

### Issue: "React Native components don't work in Node.js"

**Solution:** The `*Example.js` files are React Native components and need React Native to run. Use the main pattern files (like `ApiService.js`) for Node.js testing.

### Issue: "Module not found"

**Solution:** Make sure you're running from the correct directory:
```bash
cd design-patterns-guide
node creational/singleton/ApiService.js
```

---

## Best Practices

### 1. **Start Simple**
Test patterns in Node.js first before integrating into React Native.

### 2. **Read the README First**
Each pattern has a README explaining the concept.

### 3. **Modify and Experiment**
Change the code to understand how it works.

### 4. **Use in Real Projects**
The best way to learn is to use patterns in actual projects.

### 5. **Check Console Logs**
All examples have detailed console logs explaining what's happening.

---

## Quick Reference

| Pattern | Main File | Example Component |
|---------|-----------|-------------------|
| Singleton | `ApiService.js` | `SingletonExample.js` |
| Factory | `NotificationFactory.js` | `FactoryExample.js` |
| Builder | `UserProfileBuilder.js` | `BuilderExample.js` |
| Prototype | `DocumentPrototype.js` | `PrototypeExample.js` |
| Adapter | `PaymentAdapter.js` | `AdapterExample.js` |
| Decorator | `TextDecorator.js` | `DecoratorExample.js` |
| Facade | `VideoRecorderFacade.js` | `FacadeExample.js` |
| Proxy | `ImageProxy.js` | `ProxyExample.js` |
| Observer | `NewsPublisher.js` | `ObserverExample.js` |
| Strategy | `PaymentStrategy.js` | `StrategyExample.js` |
| Command | `TextEditorCommands.js` | `CommandExample.js` |
| Template Method | `DataProcessor.js` | `TemplateMethodExample.js` |

---

## Need Help?

- Check the pattern's README for detailed explanation
- Look at the code comments (every line is explained)
- Try the interactive example component
- Experiment by modifying the code

**Happy Learning! 🎉**
