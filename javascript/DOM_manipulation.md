## DOM Manipulation:
Document Object Model is the data representation of HTML documents. Allows Javascript to access and manipulate HTML/XML/CSS structure, styles and content.
Examples of DOM include header, tables, elements, etc.

### Common APIs in Web:
```
document.querySelector(selector)
document.querySelectorAll("p.intro")        Returns a list of all <p> elements with class="intro"
document.getElementById(id).innerHTML
document.getElementsByClassName(name)
document.getElementsByTagName(name)

document.createElement(element)
document.removeChild(element)
document.appendChild(element)
document.replaceChild(element)

element.innerHTML = 'new content'           Get or replace content of HTML element
element.attribute = 'new value'
element.style.property = 'new style'
element.setAttribute(attribute, value)
```
## Handling Events:
```javascript
// syntax
document.addEventListener(event, function, useCapture)

// when user clicks anywhere
document.addEventListener("click", function(){
  document.getElementById("demo").innerHTML = "Hello World";
});

document.querySelector('.check').addEventListener('click', function() {
  console.log();
});

// document.removeEventListerner()
```
