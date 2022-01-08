### Data Fetching for Pre-Rendering

Key functions built into Nextjs. Two forms of pre-rendering:

1. Static Site Generation (SSG).
2. Server-Side Rendering (SSR).

SSR can be disadvantage as have to wait for page to be generated on every incoming request. For SSG, to avoid data being outdated when fetching, use revalidate property; don't have to redeploy/rebuild just because of data changes.

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
export async function getStaticProps(context) {
  // fetch data from API
  // state management can be placed here

  const paramsId = context.params.meetupId;

  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10      // regenerate on server-side every 10s if there are new requests coming in
  };
}

export default Component

```

```javascript
// regenerate page for every incoming request, not during build process
// code will run on server
export async function getServerSideProps(context) {
  const req = context.req;  // request object; useful for authentication
  const res = context.res;  // response object

  return {
    props: {};
  };
}

```
