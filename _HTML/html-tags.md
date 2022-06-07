## HTML Tags

Link Reference: <https://www.w3schools.com/tags/default.asp>

```
<head>
<style>      internal styling
<base>       base URL and/or target for all relative URLs in current page
<link>       CSS external links
<meta>       metadata for webpage that always goes inside head tag; passed as key value pairs
<script>     client-side Javascript
<noscript>

<a>          anchor tag to attach link i.e. <a href="https://example.com">Input text</a>
<br>         line break in text (return function)
<div>        generic container (block level) that does not represent anything
<span>       similar to <div> but more for inline elements
<img>        defines an image i.e. <img src='' />
<ol>         ordered list
<ul>         unordered list
```

## Example

```html
<label for="phone">Enter a phone number:</label><br /><br />
<input
  type="tel"
  id="phone"
  name="phone"
  placeholder="123-45-678"
  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
/><br /><br />
<!-- placeholder is the light grey text for reference -->
```
