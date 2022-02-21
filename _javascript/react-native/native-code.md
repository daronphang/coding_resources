### Modules

When APIs needed are not supported/built-in by React Native. However, there are some caveats installing third-party libraries; any methods that touch the DOM will fail as they make assumptions about the environment they will be running in. Hence, integrating with existing packages would require some finagling.

```console
npm install --save lodash
```

### Installing Third-Party Components with Native Code

Link makes modifications to underlying iOS and Android projects. For iOS, might entails edits to AppDelegate.m and Xcode project file. For Android, might include changes to MainApplication.java, settings.gradle, and build.gradle. Only works when projects are generated via react-native init.

```console
npm install react-native-video --save
react-native link
```

### Summary

Four main use cases for native modules:

1. Taking advantage of existing Objective-C or Java code.
2. Writing high performance.
3. Multithreaded code for tasks such as graphics processing.
4. Exposing APIs not yet included in React Native.

Hybrid applications are feasible whereby you can use native modules to share functionality between JS, Objective-C and Java. For cases where performance is critical, often make sense to work in native language of platform you are developing for which should do all heavy-lifting.
