# Facade Pattern – React Native Example

## Overview

The **Facade Pattern** is a structural design pattern that provides a **simple interface to a complex system of classes, APIs, or modules**.

Instead of interacting with multiple subsystems directly, the client communicates with a **single facade class** that handles all the complexity internally.

In **React Native**, the Facade pattern is commonly used to simplify interactions with:

* Multiple APIs
* Authentication flows
* Payment systems
* Device services (storage, notifications, analytics)

---

# Structure

```
Client (Component / Screen)
          ↓
       Facade
          ↓
   Multiple Subsystems
(API Service, Storage, Analytics)
```

The **facade acts as a single entry point** for the application.

---

# Example Scenario

Suppose a screen needs to:

1. Call an API
2. Save data to local storage
3. Log analytics

Without a facade, the component would need to manage all these services.

With a facade, the component calls **one simple method**.

---

# Implementation

## 1. Subsystem Services

### API Service

```javascript
export const ApiService = {
  fetchUser: async () => {
    console.log("Fetching user from API...");
    return { name: "John Doe" };
  }
};
```

### Storage Service

```javascript
export const StorageService = {
  saveUser: (user) => {
    console.log("Saving user to local storage");
  }
};
```

### Analytics Service

```javascript
export const AnalyticsService = {
  logEvent: (event) => {
    console.log("Logging event:", event);
  }
};
```

---

# 2. Facade Layer

The facade coordinates all subsystems.

```javascript
import { ApiService } from './ApiService';
import { StorageService } from './StorageService';
import { AnalyticsService } from './AnalyticsService';

export const UserFacade = {

  async loadUser() {

    const user = await ApiService.fetchUser();

    StorageService.saveUser(user);

    AnalyticsService.logEvent("USER_LOADED");

    return user;
  }

};
```

---

# 3. React Native Component Using the Facade

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { UserFacade } from './UserFacade';

export default function UserScreen() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {
      const data = await UserFacade.loadUser();
      setUser(data);
    };

    getUser();

  }, []);

  return (
    <View>
      <Text>{user ? user.name : "Loading..."}</Text>
    </View>
  );
}
```

---

# Flow

```
UserScreen
     ↓
UserFacade.loadUser()
     ↓
ApiService.fetchUser()
     ↓
StorageService.saveUser()
     ↓
AnalyticsService.logEvent()
```

The component **does not know about the internal complexity**.

---

# Advantages

* Simplifies complex systems
* Reduces dependency between components and services
* Centralizes business logic
* Improves maintainability

---

# Real World React Native Use Cases

Facade pattern is commonly used for:

### Authentication

```
AuthFacade.login()
AuthFacade.logout()
AuthFacade.refreshToken()
```

### Payment Flow

```
PaymentFacade.createPayment()
PaymentFacade.confirmPayment()
```

### Device Services

```
DeviceFacade.getLocation()
DeviceFacade.getContacts()
DeviceFacade.getPermissions()
```

---

# When to Use

Use the **Facade Pattern** when:

* Your component interacts with **multiple services**
* You want to **hide complex logic**
* You want **cleaner and more maintainable components**

---

# Summary

The **Facade Pattern** provides a **single simplified interface to a complex subsystem**, allowing React Native components to interact with multiple services through a single entry point.
