### Templating Engines

```
EJS           <p><%= name %></p>
Pug(jade)     p #{name}
Handlebars    <p>{{ name }}</p>

$npm install --save ejs pug express-handlebars
```

### EJS

Can render vanilla JS code.

```js
app.set("view engine", "ejs");
app.set("views", "views");

// shop.js
router.get("/", (req, res, next) => {
  res.render("shop", { prods: products, docTitle: "Shop" });
});
```

```ejs
<main>
  <% if(prods.length > 0) { %>
    <% prods.forEach(prods => { %>
    <div class="grid">
      <h1>prods.title</h1>
    </div>
    <% }) %>
  <% } else { %>
    <h1>No Products Found</h1>
  <% } %>
</main>
```

### Partials

For layout functionality, can use partials and merge them together to render final html template.

```ejs
<!--head.ejs-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= pageTitle %></title>
```

```ejs
<header class="main-header">
  <nav>
    <ul>
      <li class="main-header-list"><a class="<%= path === '/admin/product ? active : '' %>" href="/"></li>
    </ul>
  </nav>
</header>
```

```ejs
<!--404.ejs-->
<%- include('/head.ejs') %>
</head>

<body>
  <%- include('/navigation.ejs') %>
</body>
```

### Handlebars

```javascript
const expressHbs = require("express-handlebars"); // engine not auto installed by express

app.engine("handlebars", expressHbs());
app.set("view engine", "handlebars");
app.set("views", "views");
```

### Pug

Autocomplete with html:5. For CSS classes, can either use dot notation or class=().

```javascript
// app.js
app.set("view engine", "pug");
app.set("views", "views");

//shop.js

router.get("/", (req, res, next) => {
  res.render("shop", { prods: products, docTitle: "Shop" });
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
                a(href="/add-product", class=(path === '/admin/add-product ? active : ''))
        main
            if prods.length > 0
              .grid   <!--this is for <div>-->
                    each product in prods
                        h1.product-title #{product.title}
                          img(src="", alt="test")
            else
              h1 No Products
```

### Extending Templates

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
