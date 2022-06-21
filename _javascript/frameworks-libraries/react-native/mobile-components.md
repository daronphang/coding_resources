### Text

In React Native, <Text> components may have plain-text nodes as children. Do not access to subtags such as <strong> and <em> in web; can achieve this using fontWeight and fontStyle.

When dealing with consistent styled text, React recommends to create styled components and using it throughout the app as style inheritance is limited.

```js
<View>
  <Text>Hello </Text>
</View>
```

#### Styled Components

```js
const styles = Stylesheet.create({
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

class Strong extends Component {
  render() {
    return <Text style={styles.bold}>{this.props.children}</Text>;
  }
}

<Text>
  <Strong>Hello</Strong>
</Text>;
```

### Images

To change device's screen density, use suffixes @2x and @3x. For utilizing web resources, need to specify dimensions manually. Often make use of resizeMode prop which can be set to contain, cover or stretch.

```js
<Image source={require("./flowers.png")} />
<Image
    source={{url: "https://example.com/logo.png"}}
    style={{width: 400, height: 400}}
/>

<Image source={require("./flowers.ios.png")} />
<Image source={require("./flowers.android.png")} />

<Image source={require("./flowers.ios.png")}>
    {/*your content here with image as background... */}
</Image>

```

### Buttons

```js
<Button
  onPress={this._onPress}
  title="Press me"
  color="#fff"
  accessibilityLabel="Press this button"
/>
```

### TouchableHighlight

Any interface elements that respond to user touch (buttons, control elements, etc) should usually have a <TouchableHighlight> wrapper. Causes an overlay to appear when view is touched, giving the user visual feedback. General rule of thumb is to use this anywhere there would be a button or link on the web. Also provides hooks for events such as onPressIn, onPressOut, onLongPress, etc.

```js
<TouchableHighlight
  onPressIn={this._onPressIn}
  onPressOut={this._onPressOut}
  accessibilityLabel={"PUSH ME"}
  style={styles.touchable}
>
  <View>
    <Text>{this.state.pressing ? "EEK!" : "PUSH ME"}</Text>
  </View>
</TouchableHighlight>
```

### PanResponder Class

Class provided by React Native whose gestureState object gives access to raw position data as well as information such as velocity and accumulated distance of current gesture.

Creating requires you to register several callbacks. Six functions give access to the full lifecycle of a touch event.

```
onMoveShouldSetPanResponder     Determines whether to respond to a given touch event
onStartShouldSetPanResponder    Determines whether to respond to a given touch event
onPanResponderGrant             Invoked when touch event begins
onPanResponderRelease           Invoked when a touch event ends
onPanResponderTerminate         Invoked when a touch event ends
onPanResponderMove              Able to access data about ongoing touch event
```

```js
import React, { Component } from "react";
import { StyleSheet, PanResponder, View, Text } from "react-native"

const CIRCLE_SIZE = 40;

class PanResponderExmaple extends Component {
    // set initial values
    _panResponder = {};
    _previousLeft = 0;
    _previousTop = 0;
    _circleStyles = {};
    circle = null;

    constructor(props) {
        super(props);
        this.state = {
            numberActiveTouches: 0;
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: { left: this._previousLeft, top: this._previousTop }
        };
    }

    componentDidMount() {
        this._updatePosition();
    }

    _highlight = () => {
        this.circle &&
        this.circle.setNativeProps({
            style: { backgroundColor: CIRCLE_HIGHLIGHT_COLOR }
        });
    };

    _unHighlight = () => {
        this.circle &&
        this.circle.setNativeProps({ style: { backgroundColor: CIRCLE_COLOR } });
    };

    // We're controlling the circle's position directly with setNativeProps.
    _updatePosition = () => {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    };

    _handleStartShouldSetPanResponder = (event, gestureState) => {
        // Should we become active when the user presses down on the circle?
        return true;
    };

    _handleMoveShouldSetPanResponder = (event, gestureState) => {
        // Should we become active when the user moves a touch over the circle?
        return true;
    };

    _handlePanResponderGrant = (event, gestureState) => {
        this._highlight();
    };

    _handlePanResponderMove = (event, gestureState) => {
    this.setState({
        stateID: gestureState.stateID,
        moveX: gestureState.moveX,
        moveY: gestureState.moveY,
        x0: gestureState.x0,
        y0: gestureState.y0,
        dx: gestureState.dx,
        dy: gestureState.dy,
        vx: gestureState.vx,
        vy: gestureState.vy,
        numberActiveTouches: gestureState.numberActiveTouches
    });

    // Calculate current position using deltas
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    render() {
        return (
            <View style={styles.container}>
                <View
                    ref={circle => {
                    this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                    />
                <Text>
                    {this.state.numberActiveTouches} touches,
                    dx: {this.state.dx},
                    dy: {this.state.dy},
                    vx: {this.state.vx},
                    vy: {this.state.vy}
                </Text>
            </View>
        );
    }
}

export default PanResponderExample;
```

### Choosing How to Handle Touch

To provide user with basic feedback and indicate that a button or another element is tappable, use <TouchableHighlight> component.

To implement custom touch interfaces, use PanResponder.

### Lists

This design pattern is integral to many mobile interfaces, whereby the list is just a scrolling container with some child views. React Native provides two components with convenient APIs:

1. <FlatList> is designed to work with long scrolliing lists of changing but similarly structured data.
2. <SectionList> is designed for data that is broken into logical sections.
3. <VirtualizedList> for custom list handling.

Optimizing list-rendering performance is tricky as different use cases call for different approaches i.e. swiping hastily through contacts or slowly perusing feed of images. Pay attention to lists if you hit performance issues.

#### FlatList

RenderItem gets passed an object with actual data accessible via item property. Each element in dat array must have a unique **key** property defined.

```js
data: [{ key: "a" }, { key: "b" }, { key: "c" }];

_renderItem = (data) => {
  return <Text style={styles.row}>{data.item.key}</Text>;
};

// simplified with destructuring
_renderItem = ({ item }) => {
  return <Text style={styles.row}>{item.key}</Text>;
};

_addKeysToBooks = (books) => {
  return books.map((book) => {
    return Object.assign(book, { key: book.title });
  });
};

<FlatList data={this.state.data} renderItem={this._renderItem} />;
```

#### SectionList

Designed fordata sets where you have mostly homogenous items plus optional section headings. Each section object must have **title** and **data** keys.

```js
_renderHeader = ({ section }) => {
  return <Text style={styles.headingText}>{section.title}</Text>;
};

<SectionList
  sections={this.state.sections}
  renderItem={this._renderItem}
  renderSectionHeader={this._renderHeader}
/>;
```

### Navigation

Refers to code that allows users to transition from one screen to another. Commonly used components are <Navigator>, <NavigatorIOS> and <StackNavigator>. Navigation logic is necessary in order to move between screens in mobile application and enables "deep linking" so that users can jump from a URL into a particular screen within your app.

### Organizational Components

Platform-specific including <TabBarIOS>, <SegmentedControlIOS>, <DrawerLayoutAndroid> and <ToolbarAndroid>.
