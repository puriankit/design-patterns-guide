# Strategy Pattern – React Native Context Example

## Overview

The **Strategy Pattern** is a behavioral design pattern that allows you to **define a family of algorithms, encapsulate each one, and make them interchangeable at runtime**.

Instead of hardcoding logic inside a component, we **separate the algorithms (strategies)** and let the application choose which one to use.

In **React Native**, this pattern can be implemented using:

* **React Context**
* **Dynamic function selection**
* **Strategy objects**

---

# Structure

```text
Context (Provider)
      ↓
Select Strategy
      ↓
Execute Selected Algorithm
```

Pattern roles:

* **Context** → React Context Provider
* **Strategy** → Algorithm implementations
* **Client** → React Native components

---

# Example Scenario

An app supports **multiple payment methods**:

* Credit Card
* PayPal
* Apple Pay

Instead of putting all logic in one component, we create **separate strategies** for each payment method.

---

# 1. Create Payment Strategies

### Credit Card Strategy

```javascript
export const CreditCardStrategy = {
  pay(amount) {
    console.log(`Paid $${amount} using Credit Card`);
  }
};
```

---

### PayPal Strategy

```javascript
export const PayPalStrategy = {
  pay(amount) {
    console.log(`Paid $${amount} using PayPal`);
  }
};
```

---

### Apple Pay Strategy

```javascript
export const ApplePayStrategy = {
  pay(amount) {
    console.log(`Paid $${amount} using Apple Pay`);
  }
};
```

---

# 2. Strategy Context

The context manages which strategy is currently selected.

```javascript
import React, { createContext, useState } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {

  const [strategy, setStrategy] = useState(null);

  const executePayment = (amount) => {
    if (!strategy) {
      console.log("No payment strategy selected");
      return;
    }

    strategy.pay(amount);
  };

  return (
    <PaymentContext.Provider
      value={{ setStrategy, executePayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
```

---

# 3. React Native Component Using Strategy

```javascript
import React, { useContext } from "react";
import { View, Button } from "react-native";
import { PaymentContext } from "./PaymentContext";
import { CreditCardStrategy } from "./CreditCardStrategy";
import { PayPalStrategy } from "./PayPalStrategy";

export default function PaymentScreen() {

  const { setStrategy, executePayment } = useContext(PaymentContext);

  return (
    <View>

      <Button
        title="Pay with Credit Card"
        onPress={() => setStrategy(CreditCardStrategy)}
      />

      <Button
        title="Pay with PayPal"
        onPress={() => setStrategy(PayPalStrategy)}
      />

      <Button
        title="Pay $100"
        onPress={() => executePayment(100)}
      />

    </View>
  );
}
```

---

# 4. App Integration

```javascript
import React from "react";
import { PaymentProvider } from "./PaymentContext";
import PaymentScreen from "./PaymentScreen";

export default function App() {

  return (
    <PaymentProvider>
      <PaymentScreen />
    </PaymentProvider>
  );
}
```

---

# Flow

```text
User selects payment method
        ↓
Context sets selected strategy
        ↓
User triggers payment
        ↓
Context executes chosen strategy
```

Example Output:

```text
Paid $100 using Credit Card
```

---

# Advantages

* Removes large conditional logic (`if/else`)
* Makes algorithms interchangeable
* Improves code maintainability
* Follows **Open/Closed Principle**

---

# Real World React Native Use Cases

### Payment Methods

```javascript
CreditCardStrategy
UPIStrategy
PayPalStrategy
```

---

### Sorting Algorithms

```javascript
PriceSortStrategy
RatingSortStrategy
PopularitySortStrategy
```

---

### Authentication Methods

```javascript
EmailLoginStrategy
GoogleLoginStrategy
AppleLoginStrategy
```

---

# Strategy Pattern Mapping

| Design Pattern Role | React Native Equivalent |
| ------------------- | ----------------------- |
| Context             | React Context Provider  |
| Strategy            | Algorithm objects       |
| Client              | React Native components |

---

# Summary

The **Strategy Pattern** allows an application to **select different algorithms at runtime**.

In **React Native**, this pattern can be implemented using **React Context to manage and execute different strategies**, enabling flexible and maintainable application logic.
