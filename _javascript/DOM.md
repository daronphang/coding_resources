## DOM (Document Object Model)

A programming interface that allows us to create, change or remove elements from the document. It is the data representation of HTML/XML documents in an object-oriented manner. It is a way to represent the webpage in a structured hierarchical way so that it is easier for programmers to glide through the document. Can also add events to these elements to make page more dynamic.

When a webpage is loaded, browser creates a DOM of the page which is constructed as a tree of objects. With the DOM, JS has the access and power to create dynamic HTML by manipulating HTML/CSS structures, styles, attributes and content.

DOM is written in JS and without it, JS wouldn't have any model or notion of webpages, HTML documents, SVG documents, and etc. DOM is not part of JS but is instead a Web API used to build websites.

DOM is designed to be language agnostic, making the structural representation to be available from a single, consistent API.

### Why is DOM needed?

HTML is used to structure the webpages while JS is used to add behavior to it. However, JS cannot understand HTML directly. Hence, DOM helps to represent the same HTML document in a different format with the use of objects that JS can understand and manipulate.

### DOM Structure

DOM has a logical structure that is represented very much like a tree or forest. Nonetheless, DOM does not specify that the documents must be implemented as a tree/forest. Each branch of the tree ends in a node, and each node contains an object. Event listeners can be added to nodes and triggered upon occurrence of an event.

An important property is structural isomorphism; if any two DOM implementations create a representation of the same document, they will create the same structure model with the same objects and relationships.

### Accessing the DOM

Can use APIs directly in JS from within the 'script' tag, a program that is run by the browser. Additionally, it is not recommended to mix the structure of the page (in HTML) with manipulation of the DOM.

```html
<html>
    <head>
        <script>
            // run this function when the document is loaded
            window.onload = function () {
                // some code
                const heading = document.createElement("h1");
            };
        </script>
    </head>
    <body></body>
</html>
```

### APIs

```js
document.querySelector(selector);
document.querySelectorAll("p.intro"); // Returns a list of all <p> elements with class="intro"
document.getElementById(id).innerHTML;
document.getElementsByClassName(name);
document.getElementsByTagName(name);

document.createElement(element);
document.removeChild(element);
document.appendChild(element);
document.replaceChild(element);

element.innerHTML = "new content"; // Get or replace content of HTML element
element.attribute = "new value";
element.style.property = "new style";
element.setAttribute(attribute, value);

element.insertAdjacentHTML(order, html); // Manipulate HTML content
```

### Event Handling

```js
// syntax
document.addEventListener(event, function, useCapture)

// when user clicks anywhere
document.addEventListener("click", function(){
  document.getElementById("demo").innerHTML = "Hello World";
});

document.querySelector('.check').addEventListener('click', function() {
  console.log();
  this.classlist.add('hidden');
});

// document.removeEventListerner()
```

### Common Events

```
click
copy
cut
dblclick
drag
drop
keydown       When user is pressing a key
keyup         When user releases a key
keypress      When user presses a key
load
mouseover
search
select
```

### Common Attributes

```
.firstChild?.nodeValue
.setAttribute(name, value)
```

### Event Properties

```
currentTarget         Returns the target HTML element
preventDefault()      Prevents the browser's default behavior such as submitting form
stopPropagation()     Prevents same event from bubbling up the DOM i.e. prevents propagation of same event on all of the parent elements

return false;         Prevents both default and propagation
```
