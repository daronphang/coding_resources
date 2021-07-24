## Templating Engines:
```
EJS           <p><%= name %></p>
Pug(jade)     p #{name}
Handlebars    <p>{{ name }}</p>

npm install --save ejs pug express-handlebars
```

## Pug:
```javascript
// app.js
app.set('view engine', 'pug');
app.set('views', 'views');


//shop.js

router.get('/', (req, res, next) => {
  res.render('shop');
});
```

```html
<!--shop.pug-->
<!DOCTYPE html>
html(lang="en")
  head
        meta(charset="UTF-8")
        meta(name=viewport", content="width=device-width, initial-scale=1.0")
        title Document
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
  body
        header.main-header
          nav.main-header-nav
            ul.main-header-item-list
              li.main-header-item
                a.active(href="/") Shop
```
