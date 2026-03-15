# Decorator Pattern – React Native Example

## Overview

The **Decorator Pattern** is a structural design pattern that allows behavior to be **added dynamically to a component without modifying its original implementation**.

Instead of changing the base component, we **wrap it with another component** that extends its functionality.

In **React Native**, this pattern is commonly implemented using **Higher Order Components (HOCs)** or **Wrapper Components**.

---

# Structure

```
Base Component
      ↓
Decorator (adds extra behavior)
      ↓
Enhanced Component
```

---

# Example Implementation

## 1. Base Component

```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
```

---

## 2. Decorator – Add Logging Behavior

```javascript
const withLogging = (WrappedComponent) => {
  return (props) => {

    const handlePress = () => {
      console.log("Button Pressed");
      props.onPress && props.onPress();
    };

    return <WrappedComponent {...props} onPress={handlePress} />;
  };
};

export default withLogging;
```

---

## 3. Using the Decorator

```javascript
import Button from './Button';
import withLogging from './withLogging';

const LoggingButton = withLogging(Button);

export default function App() {
  return (
    <LoggingButton
      title="Click Me"
      onPress={() => console.log("Original Button Action")}
    />
  );
}
```

---

# Flow

```
User Clicks Button
        ↓
withLogging Decorator
        ↓
Original Button onPress
```

Output:

```
Button Pressed
Original Button Action
```

---

# Multiple Decorators Example

Decorators can be **stacked together**.

```javascript
const withLoading = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return <WrappedComponent {...props} />;
  };
};

const EnhancedButton = withLoading(withLogging(Button));
```

---

# Advantages

* Adds functionality **without modifying existing code**
* Promotes **code reuse**
* Follows **Open/Closed Principle**
* Multiple decorators can be combined easily

---

# Real World React Native Use Cases

Common scenarios where decorator pattern is used:

* Authentication wrappers
* API loading states
* Analytics tracking
* Permission handling
* Error boundaries

Example:

```javascript
withAuth(ScreenComponent)
withAnalytics(ButtonComponent)
withErrorBoundary(Component)
```

---

# When to Use

Use the **Decorator Pattern** when:

* You want to **extend component behavior dynamically**
* You want to **avoid modifying existing components**
* You want **reusable cross-cutting functionality**

---

# Summary

The **Decorator Pattern** enhances a component by **wrapping it with additional behavior**, allowing flexible and reusable functionality without changing the original component.
