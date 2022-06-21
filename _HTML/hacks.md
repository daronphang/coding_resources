## Outputting Form Results

```html
<form>
    <input type="number" id="amount" />
    <input type="number" id="tip" />
    <output name="total" for="amount tip"></output>
</form>
```

## Timed Page Refreshes & Redirects

```html
<meta http-equiv="refresh" content="30" />

<meta http-equiv="refresh" content="30;https://example.com" />
```

## Lazy Loading

Prevents image from loading until the user scrolls down to it.

```html
<img src="example.png" loading="lazy" />
```

## Disable Right Clicking

Disable right clicks for entire webpage and a specific element.

```html
<body oncontextmenu="return false"></body>
<section oncontextmenu="return false">Not Allowed</section>
```
