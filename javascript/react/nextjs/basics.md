## Basics:
React fullstack framework for production. Key features and benefits:
- Built-in server-side rendering and pre-rendering; great for search engine optimization.
- Simplified routing with file-based routing.
- Fullstack capabilities i.e. ability to add backend API code.

## Nested Paths:
Need create new folders for nested paths i.e. /home/news/[newsId]. Dynamic routes are identified with []. To extract the params, 

```javascript
import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();
  const newsId = router.query.newsId;
  
  return <h1>The Detail Page</h1>
}

export default DetailPage;

```

```
-- pages
  |-- news
    |--index.js
    |-- [newsId].js
  |-- index.js
```

## Linking Between Pages:
Use Link for SPA.

```javascript
import Link from 'next/link';

function NewsPage(){
  return (
    <Fragment>
      <ul>
        <li>
          <Link href='/news/etc'>Hello World Link</Link>
        </li>
      </ul>
    </Fragment>
  )
}
```

## CSS:
If file is named module.css and imported into a component, the CSS styles will be scoped to that component.

```javascript
import classes from './example.module.css';

function Component = (props) => {
  return (
    <div className={classes.detail}></div>    // detail is css class defined
  )
}
```

## Data Fetching for Pre-Rendering:
Two forms of pre-rendering:
1) Static Site Generation (SSG).
2) Server-Side Rendering.

To avoid data being outdated when fetching, use revalidate property; don't have to redeploy/rebuild just because of data changes.

```javascript
// component inside pages folder

function Component = (props) => {
  ...
  return <>
}

// nextjs will execute this function first during pre-rendering process
// will not directly call functional component and return JSX as html content
// function is to prepare props for html page
// any code here will not get executed on client side (in build process)
export async function getStaticProps() {
  // fetch data from API
  // state management can be placed here
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10      // regenerate on server-side every 10s if there are new requests coming in
  };
}

export default Component

```
