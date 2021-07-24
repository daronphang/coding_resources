## Templating Engines:
```
EJS           <p><%= name %></p>
Pug(jade)     p #{name}
Handlebars    <p>{{ name }}</p>

npm install --save ejs pug express-handlebars
```

## Pug:
Autocomplete with html:5.

```javascript
// app.js
app.set('view engine', 'pug');
app.set('views', 'views');


//shop.js

router.get('/', (req, res, next) => {
  res.render('shop', {prods: products, docTitle: 'Shop'});
});
```

```pug
<!--shop.pug-->
<!DOCTYPE html>
html(lang="en")
  head
        meta(charset="UTF-8")
        meta(name=viewport", content="width=device-width, initial-scale=1.0")
        title #{docTitle}
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
  body
        header.main-header
          nav.main-header-nav
            ul.main-header-item-list
              li.main-header-item
                a.active(href="/") Shop
        main
            if prods.length > 0
              .grid   <!--this is for <div>-->
                    each product in prods
                        h1.product-title #{product.title}
                          img(src="", alt="test")
            else
              h1 No Products
```

## Extending Templates:
```pug
<!--base.pug-->
<!DOCTYPE html>
html(lang="en")
  head
        meta(charset="UTF-8")
        meta(name=viewport", content="width=device-width, initial-scale=1.0")
        title 
        link(rel="stylesheet", href="/css/main.css")
        block styles
  body
      block content
```
```pug
extends layouts/base.pug
block styles
  link(rel="stylesheet", href="/css/product.css")
block content
  h1 page not found
```
