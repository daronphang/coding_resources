## Media Queries

Useful when you want to modify your site or app depending on the device's type (print vs screen), or by certain characteristics, features and preferences i.e. viewport width, resolution, orientation.

**Should always design for mobile first before designing for desktop**.

```css
@media screen and (min-width: 600px) {
  .element {
    /* Apply some styles */
  }
}

/* mobile devices */
[class*="col-"] {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  /* For tablets */
  .col-1 {
    width: 8.33%;
  }
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  .col-1 {
    width: 8.33%;
  }
}
```

### Media Types

```
all         Matches all devices
print       Matches documents viewed in a print preview
screen      Matches devices with a screen
speech
```

### Media Features

https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

```
any-hover
any-pointer
aspect-ratio
color
color-gamut
device-width
display-mode
orientation
resolution
width
```

### Logical Operators

```
not
and
only
```

### Complex Queries

```css
@media screen and (min-width: 30em) and (orientation: landscape) {
}

@media (min-height: 680px), screen and (orientation: portrait) {
  /* multiple queries /*/
}
```
