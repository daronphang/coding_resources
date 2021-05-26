## JQuery:

Advantages of JQuery over raw Javascript:
- Cross-browser (don't have to worry about comptability).
- Easier to use, simplifies and has rich AJAX support.
- Extensible.
- Has large development community and many plugins.
```javascript
const clickHandler = function () {
  alert('Jquery tutorial')
};

window.onload = function () {
  if (document.addEventListener) {
    document.getElementById('button1').addEventListener('click', clickHandler);
  }
  else {
    document.getElementById('Button1').attachEvent('onclick', clickHandler);    // for old IE browsers
  } 
};

// jQuery
<script src='jquery-1.11.2.js'></script>

jQuery(document).ready(function() {
  jQuery('#button1').click(function() {
    alert('jQuery tutorial');
  });
});
```
