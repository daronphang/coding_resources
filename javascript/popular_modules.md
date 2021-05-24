## Popular Modules:
```
leaflet
lodash-es                 Collection of functions for objects, dates, arrays, etc.
```

## Parcel:
```
-Creates 'dist' folder containing codes that will be sent to user for live production.

npx parcel index.html     Starts live-server with index.html as entry point

// Hot module replacement: page will not reload when saving to maintain state in page
if(module.hot) {
  module.hot.accept()
}

// Importing libraries
//Old way
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// parcel
import cloneDeep from 'lodash-es';
```
