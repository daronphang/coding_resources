## Code Splitting

If you are using Create React App, Next.js, Gatsby, will have Webpack setup out of the box to bundle your app. However, as your app grows, need to keep an eye on the code you are including so that you don't make it so large that your app takes a long time to load.

Code splitting involves splitting up your bundle so that they can be loaded dynamically at runtime i.e. lazy load.

```js
// before
import { add } from "./math";
console.log(add(16, 26));

// after
import("./math").then((math) => {
    console.log(math.add(16, 26));
});
```

### Lazy Loading

React.lazy takes a function that must call a dynamic import() which returns a Promise. The lazy component should then be rendered inside a Suspense component.

The fallback prop accepts React elements that you want to render while waiting for the component to load.

```js
// before
import OtherComponent from "./OtherComponent";

// after
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
        </div>
    );
}
```

### Avoiding Fallbacks

Any component may suspend as a result of rendering, even components that were already shown to the user. In order for the screen content to always be consistent, can use startTransition API to ensure React shows the "old" UI while the new UI is being prepared.

```js
import React, { Suspense } from "react";
import Tabs from "./Tabs";
import Glimmer from "./Glimmer";

const Comments = React.lazy(() => import("./Comments"));
const Photos = React.lazy(() => import("./Photos"));

function MyComponent() {
    const [tab, setTab] = React.useState("photos");

    function handleTabSelect(tab) {
        setTab(tab);
    }

    // if user switches from photos to comments, glimmer will be shown as Comments is not
    // ready to render yet (suspended)

    return (
        <div>
            <Tabs onTabSelect={handleTabSelect} />
            <Suspense fallback={<Glimmer />}>{tab === "photos" ? <Photos /> : <Comments />}</Suspense>
        </div>
    );
}
```

```js
function handleTabSelect(tab) {
    startTransition(() => {
        setTab(tab);
    });
}
```

### Error Boundaries

If a suspended module fails to load, can use error boundaries to show a nice user experience and manage recovery.

```js
import React, { Suspense } from "react";
import MyErrorBoundary from "./MyErrorBoundary";

const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

const MyComponent = () => (
    <div>
        <MyErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <section>
                    <OtherComponent />
                    <AnotherComponent />
                </section>
            </Suspense>
        </MyErrorBoundary>
    </div>
);
```
