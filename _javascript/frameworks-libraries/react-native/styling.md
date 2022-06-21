### Declaring and Manipulating Styles

React Native forces you to link style objects explicitly to components and represents significant departure from CSS-based styling norms. Objects help keep JS code modular/organized.

### Inline Styles/Objects

Should avoid as they are less efficient and dirty. Inline style objects must be recreated during each render pass.

```js
const italic = { fontStyle: "italic" };

<Text>
  The quick <Text style={italic}>brown</Text> fox jumped over the lazy{" "}
  <Text style={{ fontWeight: "bold" }}>dog</Text>.
</Text>;
```

### StyleSheet.create

Syntactic sugar with added perks such as reducing number of allocations and encourages you to organize code more cleanly. StyleSheets are immutable. Recommended way of styling if mutability is not needed.

### Concatenating Styles

Style attribute can take in either an object or an array of style objects. In case of conflict where two object specify the same property, rightmost elements in array will take precedence.

Can leverage this pattern to apply conditional styles.

```js
const styles = StyleSheet.create({
  button: {
    borderRadius: "8px",
    backgroundColor: "#99CCFF",
  },
  accentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

class AccentButton extends Component {
  render() {
    return (
      <Text style={[styles.button, styles.accentText, { color: "#FFFFFF" }]}>
        {this.props.children}
      </Text>
    );
  }
}
```

```js
<View style={[styles.button, this.state.touching && styles.highlight]} />
```

### Organization and Inheritance

#### Exporting Style Objects

As styles grow more complex, should keep them separate from components' JS files.

```
- ComponentName
    |- index.js
    |- styles.js
```

```js
// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "#FF00FF",
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default styles;
```

### Passing Styles as Props

```js
import React, { Component } from "react";
import { View, Text } from "react-native";

class CustomizableText extends Component {
  render() {
    return (
      <Text style={[{ fontSize: 18 }, this.props.style]}>Hello, world</Text>
    );
  }
}
```

### Sharing Styles

Common pattern is to organize project by having separate directories for components and for shared styles.

```
- js
    |- components
        |- Button
            |- index.js
            |- styles.js
    |- styles
        |- styles.js
        |- colors.js
        |- fonts.js
```

### Positioning Layouts

React Native's approach to positionining is more focused, relying primarily on flexbox as well as absolute positioning.

#### Flexbox

```
flex
flexDirection
flexWrap
alignSelf
alignItems
```

```
height
width
margin
border
padding
```
