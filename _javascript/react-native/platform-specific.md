### Platform-Specific

There are some components only available on a specific platform as they wrap some kind of underlying platform-specific API.

### Components with Platform-Specific Implementations

In cross-platform application, can include them inside another component with a platform-specific implementation. Common practice is to have parent component that wraps platform-specific behavior and presents a unified API.

#### Using Paltform-Specific File Extensions

React Native packager will look for appropriate file extension to match the platform.

```js
// example.android.js
// example.ios.js

import Example from "./example";
```

#### Platform Module

Platform module API provides information about the OS and OS version.

```js
import { Platform } from "react-native";

console.log("What OS am I using?");
console.log(Platform.OS);
console.log("What version of the OS?");
console.log(Platform.Version); // e.g., 25 for Android Nougat

import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  color: Platform.OS === "ios" ? "#FF6666" : "#DD4444",
});
```
