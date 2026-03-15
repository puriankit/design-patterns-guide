# Observer Pattern – React Native Context Example

## Overview

The **Observer Pattern** is a behavioral design pattern where **multiple objects (observers) automatically get notified when the state of another object (subject) changes**.

Instead of manually updating every component, the subject **broadcasts changes to all subscribed observers**.

In **React Native**, this pattern is naturally implemented using:

* **React Context**
* **State updates**
* **Hooks (useContext)**

When the context value changes, **all subscribed components automatically re-render**, acting like observers.

---

# Structure

```text
Subject (Context Provider)
        ↓
Observers (Components using useContext)
        ↓
Automatic updates when state changes
```

* **Subject** → Context Provider
* **Observers** → Components consuming context

---

# Example Scenario

We create a **Theme System** where multiple components react when the theme changes.

Components such as:

* Header
* Button
* Screen

should automatically update when the theme changes.

---

# 1. Create Theme Context (Subject)

```javascript
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

The **ThemeProvider acts as the Subject**.

When the theme changes, all observers are notified.

---

# 2. Observer Component – Header

```javascript
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "./ThemeContext";

export default function Header() {

  const { theme } = useContext(ThemeContext);

  return (
    <View>
      <Text>Current Theme: {theme}</Text>
    </View>
  );
}
```

This component **subscribes to the subject**.

---

# 3. Observer Component – Button

```javascript
import React, { useContext } from "react";
import { Button } from "react-native";
import { ThemeContext } from "./ThemeContext";

export default function ThemeButton() {

  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Button title="Toggle Theme" onPress={toggleTheme} />
  );
}
```

---

# 4. App Integration

```javascript
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Header from "./Header";
import ThemeButton from "./ThemeButton";

export default function App() {

  return (
    <ThemeProvider>
      <Header />
      <ThemeButton />
    </ThemeProvider>
  );
}
```

---

# Flow

```text
User presses Toggle Button
        ↓
ThemeProvider updates state
        ↓
Context value changes
        ↓
All observers re-render automatically
        ↓
Header updates theme UI
```

---

# Advantages

* Automatic UI updates
* Decouples components from each other
* Centralized state management
* Simplifies communication between components

---

# Real World React Native Use Cases

### Theme System

```javascript
ThemeContext
```

All components react when theme changes.

---

### Authentication State

```javascript
AuthContext
```

Observers update when user logs in or out.

---

### Global App State

```javascript
UserContext
CartContext
NotificationContext
```

Multiple screens react to shared state changes.

---

# Observer Pattern Mapping

| Design Pattern Role | React Native Equivalent       |
| ------------------- | ----------------------------- |
| Subject             | Context Provider              |
| Observer            | Components using `useContext` |
| Notify Observers    | State change in Provider      |

---

# Summary

The **Observer Pattern** allows objects to subscribe to state changes and automatically update when the state changes.

In **React Native**, this pattern is naturally implemented using **React Context**, where the **Provider acts as the subject** and **components consuming the context act as observers**.
