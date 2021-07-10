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
