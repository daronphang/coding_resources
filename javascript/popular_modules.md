## Popular Modules:
```
leaflet
lodash-es                 Collection of functions for objects, dates, arrays, etc.
```

## Parcel:
```
-Module bundler.
-Creates 'dist' folder containing codes that will be sent to user for live production.

// using parcel
npx parcel index.html     Starts live-server with index.html as entry point

// or just add {"start": "parcel index.html", "build": "parcel build index.html"} under scripts in package.json
npm run start
npm run build     // compresses codes for production

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
