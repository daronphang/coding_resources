### Platform APIs

When building mobile applications, naturally want to take advantage of host platform's specific APIs. React Native makes it easy to access things like camera roll, location, and persistent storage.

### Handling Permissions

Some data like location are sensitive and hence, will not be accessible to your application by default. User may opt to block Location Services entirely on iOS, or manage permissions on per-app basis. Therefore, application should always be prepared for a geolocation call to fail. If failed silently, most apps will use an alert dialog to request permissions again.

In order to access the data, application needs to declare that it intends to use it. Proper permissions are added to Info.plist file (for iOS) or AndroidManifest.xml (Android).

```js
// for iOS, need include key NSLocationWhenInUseUsageDescription
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Geolocation

Provided as a platform-agnostic "polyfill". Returns data based on MDN Geolocation API web specification.

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  },
  (error) => {
    alert(error.message);
  },
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);

/* 
{
    coords: {
        speed:-1,
        longitude:-122.03031802,
        latitude:37.33259551999998,
        accuracy:500,
        heading:-1,
        altitude:0,
        altitudeAccuracy:-1
    },
    timestamp:459780747046.605
}
*/
```

#### Testing Geolocation in Emulated Devices

To test app behaving at different locations:

- iOS: navigate to Debug -> Location -> Custom Location
- Android: Can import data and control the playback speed to simulate changing locations.

#### Watching User's Location

Can be used to track a user's location over time, or to ensure that your app receives the most up-to-date position:

```js
this.watchID = navigator.geolocation.watchPosition((position) => {
  this.setState({ position: position });
});

// clear watch when component unmounts
componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
}
```

### Working Around Limitations

As geolocation is based on MDN specification, it leaves out more advanced location-based features such as Geofencing API, which allows your application to receive notifications when the user enters or leaves a designated geographical region. React Native does not expose this API. As workaround, need to port them yourself.

### Accessing Images and Camera

#### GetPhotoParams

```
first         Number of photos wanted in reverse order i.e. most recent
after         String; cursor that matches page_info returned from a previous call
groupTypes    Specifies which group to use to filter results i.e. Album, All, Event
groupName     Specifies a filter on group names i.e. Recent Photos, Album Title
assetType     Specifies a filter on asset type i.e. All, Photos, or Videos
mimeTypes     Array of strings; filters based on mimetype i.e. image, jpeg
```

```js
import { CameraRoll } from "react-native";

CameraRoll.getPhotos(
  { first: 1 },
  (data) => {
    console.log(data);
    // rendering an image from camera roll
    this.setState({
      photoSource: {uri: data.edges[0].node.image.uri}
    })},
  },
  (error) => {
    console.warn(error);
  }
);

<Image source={this.state.photoSource} />
```

#### Uploading Image to Server

React Native ships with built-in image uploading functionality in XHR module (XMLHttpRequest).

```js
let xhr = new XMLHttpRequest();
xhr.open('POST', 'http://posttestserver.com/post.php');
let formdata = new FormData();
formdata.append('image',
```

### Persistent Storage with AsyncStorage

React Native provides us with AsyncStorage, key-value store that is global to your application.

```js
// customary to use @AppName:key
const STORAGE_KEY = "@SmarterWeather:zip";

AsyncStorage.setItem(STORAGE_KEY, zip)
  .then(() => console.log("Saved selection to disk: " + zip))
  .catch((error) => console.log("AsyncStorage error: " + error.message))
  .done();

AsyncStorage.getItem(STORAGE_KEY)
  .then((value) => {
    if (value !== null) {
      this._getForecastForZip(value);
    }
  })
  .catch((error) => console.log("AsyncStorage error: " + error.message))
  .done();
```
