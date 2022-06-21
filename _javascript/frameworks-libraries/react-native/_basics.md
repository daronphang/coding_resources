### React Native

Javascript framework for writing real, natively rendering mobile applications for iOS and Android. Enables web developers to write mobile applications that look and feel "native", all from JS library. Under the hood, React Native invokes native rendering APIs in Objective-C (for iOS) or Java (for Android). Hence, application will render mobile UI components and not webviews. Reactive Native exposes JS interfaces for platform APIs so React Native apps can access platform features like phone camera or user's location.

### Benefits

React Native renders using its host platform's standard rendering APIs which distinguishes it from most existing methods of cross-platform applications like Cordona or Ionic, which also do not have access to host platform's set of native UI elements.

In contrast, React Native translates markup to real, native UI elements, leveraging existing means of rendering views on whatever platform you are working with. Additionally, React works separately from main UI thread, so application can maintain high performance without sacrificing capability. Major difference between React Native and React is that Native does renders views by leveraging the UI libraries of its host platform, rather than using HTML and CSS markup. Lastly, provides the benefit of cross-platform development.

Can use Chrome or Safari's developer tools for error debugging and does not reuqire you to work in Xcode or Android Studio. Additionally, Google and Apple both permit you to load JS-only changes to an app's behavior without going through standard review process.

### Drawbacks

React Native introduces another layer to project which can make debugging hairer. Also, which a new version of Android is released, there will be a lag before they are fully supported in React Native. Nonetheless, can implement support for missing APIs yourself.

### How React Native Works (Virtual DOM)

Virtual DOM acts as a layer between developer's description of how things ought to look and the work done to actually render application onto the page. To render interactive user interfaces in a browser, developers must edit the browser's DOM; however, this is an expensive step and excessive writes to DOM have a significant impact on performance. Rather than directly render changes on the page, React computes the necssary changes in-memory and rerenders the minimal amount necessary.

Instead of rendering to browser's DOM, React Native invokes Objective-C APIs to render to iOS components, or Java APIs to render to Android components i.e. acts as a bridge between React and host platform's native UI elements.

### Rendering Lifecycle

React Native does not run on main UI thread and can perform asynchronous calls without impacting user's performance.

1. Page renders HTML markup returned by developer from React component's render method.
2. Mounts React component to the DOM/native host platform.
3. State/props change triggered by user.
4. Virtual DOM computes difference.
5. React component rerendered.

### Differences

Differences between React and React Native components are around rendering and styling. As all UI elements are React components rather than basic HTML elements like <div>, need to explicitly import each component you want to use. Platform-specific components and APIs will have special tags in the documentation, and typicall use platform name as suffix.

To make code reusable, need to structure React components properly by maintaining separation between different types of React components i.e. child components, logic, raw markup, etc. For instance, an IOS date picker cannot be reused for Android.

```js
import { DatePickerIOS } from "react-native";
```

| React     | React Native             |
| --------- | ------------------------ |
| <div>     | <View>                   |
| <span>    | <Text>                   |
| <li>,<ul> | <FlastList>, child items |
| <img>     | <Image>                  |

### JSX

Views are written using JSX, combining markup and JS that controls it into a single file. JSX prioritizes separation of concerns over separation of technologies i.e. CSS, HTML and control logic.

### Styling Native Components

Part of the bridge between React and host platform includes implementation of heavily pruned subset of CSS that relies primarily on flexbox for layout, and focuses on simplicity rather than implementing the full range of CSS rules. React Native is able to senforce consistent support of style rules unlike web where CSS support varies across browsers. React Native insists on the use of inline styles, which exist as JS objects.

```js
const style = {
  backgroundcolor: "white",
  fontSize: "16px",
};

const txt = <Text style={style} />;
```

### Environment Setup

Create React Native App gives quicker installation but supports only pure-JS applications. Second approach involves fully installing React Native and all of its dependencies. Nonetheless, if started with Create React Native App, can still "eject" into a full React Native project.

To view application, need Expo app for iOS or Android. Both phone and computer will need to be on same network in order to communicate with each other.

```console
$ npm install -g create-react-native-app
$ cd first-project
$ npm start
```

```console
$ npm install -g react-native-cli
$ react-native init FirstProject
$ cd FirstProject

$ react-native run-ios
$ react-native run-android
```

#### Create React Native App

```js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class FirstProject extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
```

```js
import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";

export default class FirstProject extends Component {}

AppRegistry.registerComponent("FirstProject", () => FirstProject);
```
