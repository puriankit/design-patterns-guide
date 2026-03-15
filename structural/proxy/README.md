# Proxy Pattern – React Native Example

## Overview

The **Proxy Pattern** is a structural design pattern that provides a **placeholder object to control access to another object**.

Instead of accessing the real object directly, the client interacts with a **proxy**, which can add extra functionality such as:

* Access control
* Logging
* Caching
* **Lazy loading**

In **React Native**, proxy pattern is commonly used in:

* API services
* Image loading
* Authentication guards
* Data caching layers

---

# Structure

```text
Client (Component)
        ↓
      Proxy
        ↓
   Real Service
```

The proxy acts as a **gatekeeper** between the client and the real service.

---

# Example 1 – Proxy for API Access Control

## 1. Real API Service

```javascript
export const UserApiService = {
  async fetchUser() {
    console.log("Fetching user from API...");
    return { name: "John Doe", id: 1 };
  }
};
```

---

## 2. Proxy Service

```javascript
import { UserApiService } from "./UserApiService";

const isAuthenticated = () => {
  return true; // simulate auth check
};

export const UserApiProxy = {

  async fetchUser() {

    if (!isAuthenticated()) {
      console.log("Access denied. User not authenticated.");
      return null;
    }

    console.log("Request logged by proxy");

    return await UserApiService.fetchUser();
  }

};
```

---

## 3. React Native Component

```javascript
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { UserApiProxy } from "./UserApiProxy";

export default function UserScreen() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadUser = async () => {
      const data = await UserApiProxy.fetchUser();
      setUser(data);
    };

    loadUser();

  }, []);

  return (
    <View>
      <Text>{user ? user.name : "Loading..."}</Text>
    </View>
  );
}
```

---

# Example 2 – Proxy with Lazy Loading

Lazy loading means **creating or loading a heavy object only when it is actually needed**.

This improves **performance and memory usage**.

---

## 1. Heavy Image Loader (Real Object)

```javascript
export class ImageLoader {

  constructor(url) {
    this.url = url;
    this.loadImage();
  }

  loadImage() {
    console.log("Loading heavy image from:", this.url);
  }

  display() {
    console.log("Displaying image:", this.url);
  }

}
```

---

## 2. Image Proxy (Lazy Loader)

```javascript
import { ImageLoader } from "./ImageLoader";

export class ImageProxy {

  constructor(url) {
    this.url = url;
    this.realImage = null;
  }

  display() {

    if (!this.realImage) {
      console.log("Lazy loading image...");
      this.realImage = new ImageLoader(this.url);
    }

    this.realImage.display();
  }

}
```

---

## 3. Using Proxy in React Native

```javascript
import React from "react";
import { View, Button } from "react-native";
import { ImageProxy } from "./ImageProxy";

export default function App() {

  const image = new ImageProxy("profile-picture.png");

  const showImage = () => {
    image.display();
  };

  return (
    <View>
      <Button title="Load Image" onPress={showImage} />
    </View>
  );
}
```

---

# Lazy Loading Flow

```text
User clicks button
        ↓
ImageProxy.display()
        ↓
Check if real image exists
        ↓
If not → create ImageLoader
        ↓
Load and display image
```

The **image is only loaded when needed**, which improves performance.

---

# Advantages

* Controls access to real objects
* Improves performance with lazy loading
* Adds logging, caching, or security
* Keeps components clean

---

# Real World React Native Use Cases

### API Request Proxy

```javascript
ApiProxy.fetchUser()
```

Adds authentication and logging.

---

### Image Lazy Loading

```javascript
ImageProxy.display()
```

Loads images only when needed.

---

### Cache Proxy

```javascript
DataProxy.getProducts()
```

Returns cached data instead of calling API repeatedly.

---

# When to Use

Use the **Proxy Pattern** when:

* You want **lazy loading of heavy objects**
* You need **authentication checks before operations**
* You want **logging or caching layer**
* You want **controlled access to services**

---

# Summary

The **Proxy Pattern** introduces an intermediary object that controls access to another object.
It is commonly used for **security, caching, logging, and lazy loading**, helping improve performance and maintainability in React Native applications.
