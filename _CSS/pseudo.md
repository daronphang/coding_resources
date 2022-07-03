## Pseudo Elements

Used to style specific parts of an element without having to write HTML i.e. not an actual DOM element, and hence, **they cannot be found in a HTML file**. For example, it can b used to style the first letter/line of an element, or insert contents before/after. This introduces huge benefits for creating cool effects with minimal markup. **Cannot use an image in pseudo elements.**

For ::before and ::after, they create a child element inside an element only if **content property is defined**. You can only insert them to an element that will accept child elements (elements with a document tree) and hence, elements such as <img>, <video> and <input> **will not work**. To work, cobmbine it with span i.e. input + span, and target the span with pseudo elements.

https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements

```
::before          Inserted before the content
::after           Inserted after the content
::first-letter
::first-line
::backdrop        Styles the space between element and rest of the page
::marker          Style bullet/number for a list item
::selection       Style how selected text looks
::placeholder     Style text of placeholder in input
::cue             Style WebVTT cues
```

### Example

```css
p::before {
    content: "";
    background-color: red;
    display: block;
}

.some-custom-class::before {
    content: "";
    color: red;
}

/* Only supports color, background, font, text */
input::placeholder {
    color: darkcyan;
}
```

## Pseudo Classes

A pseudo-class is a selector that selects elements but under certain conditions i.e. in a certain state. They tend to act as if you had applied a class to some part of your document, often helping you cut down on excess classes in your markup and giving more flexible code.

### Dynamic/User-Action

Applies when the user interacts with the document in some way.

```
:link
:visited
:hover
:active
:focus
```

### UI Element States

```
:enabled
:disabled
:checked
```

### Structural

```
:first-child            Targets the first child element among a group of sibling elements
:nth-child(n)
:nth-last-child(n)
:nth-of-type(n)         2n+1 | 2n | even | odd
:nth-last-of-type(n)
:last-child
:first-of-type
:last-of-type
:only-child
:only-of-type
:root
:empty
```

### Others

```
:not(x)
:target
:lang(language)
```

### Example

```css
p:first-child {
    color: lime;
    background-color: black;
    padding: 5px;
}
```

```html
<!-- first child -->
<div>
    <p>This text is selected!</p>
    <p>This text isn't selected.</p>
</div>

<!-- this doesn't work as h2 is not a 'p'-->

<div>
    <h2>This text isn't selected: it's not a `p`.</h2>
    <p>This text isn't selected.</p>
</div>
```

## Combining Pseudo Classes and Elements

For instance, you can make the first line of first paragraph bold by chaining :first-child and ::first-line selectors together.

```css
article p:first-child::first-line {
    font-size: 120%;
    font-weight: bold;
}
```

## : vs ::

Every browser that supports :: also supports : syntax; nonetheless; it is recommended to use single-colon for best browser support (IE8). :: is the newer format intended to distinguish between pseudo element and class.
