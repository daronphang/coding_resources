### NextJS

React fullstack framework for production. Key features and benefits:

- Built-in server-side rendering and pre-rendering; great for search engine optimization.
- Simplified routing with file-based routing.
- Fullstack capabilities i.e. ability to add backend API code.

### Nested Paths

Need create new folders for nested paths i.e. /home/news/[newsId]. Dynamic routes are identified with []. To extract the params,

```javascript
import { useRouter } from "next/router";

function DetailPage() {
  const router = useRouter();
  const newsId = router.query.newsId;

  return <h1>The Detail Page</h1>;
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

### Linking Between Pages

Use Link for SPA.

```javascript
import Link from "next/link";

function NewsPage() {
  return (
    <Fragment>
      <ul>
        <li>
          <Link href="/news/etc">Hello World Link</Link>
        </li>
      </ul>
    </Fragment>
  );
}
```

### CSS

If file is named module.css and imported into a component, the CSS styles will be scoped to that component.

```javascript
import classes from './example.module.css';

function Component = (props) => {
  return (
    <div className={classes.detail}></div>    // detail is css class defined
  )
}
```

### API Routes

Need to create folder called 'api' inside 'pages' folder.

```javascript
// frontend
function MeetupPage() {
  ...
  const response = await fetch('/api/new-meetup',
    method: 'POST',
    body: JSON.stringify(meetupData),
    headers: {
      'Content-Type': 'application/json'
    };

    const data = await response,json();
}

// backend api
function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    // write your code here...

    const client = await MongoClient.connect('');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    client.close();

    res.status(201).json({message: 'meetup inserted'});
  }
}

export default handler;
```
