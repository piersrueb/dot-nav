### Dot Nav

Add the nav wrapper, as many sections as you like and Dot Nav will do the rest.

See the [demo](https://codepen.io/Rueb/pen/WabbEo).

#### JS

Call the function on all section elements and define your easing method.

```js
dotNav('section', 'easeInOutCubic');
```

Here are the easing methods available.

```js
linear
easeInQuad
easeOutQuad
easeInOutQuad
easeInCubic
easeOutCubic
easeInOutCubic
easeInQuart
easeOutQuart
easeInOutQuart
easeInQuint
easeOutQuint
easeInOutQuint
```

#### HTML

```html
<nav id="dot-nav"></nav>
<section></section>
<section></section>
<section></section>
```

#### CSS

Style the ```nav``` to suit your needs.

```css
nav#dot-nav {
    position: fixed;
    right: 20px;
    top: 20px;
}

nav#dot-nav a {
    border: 1px solid #121212;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    display: block;
    margin: 10px;
}

nav#dot-nav a.active, nav#dot-nav a:first-child {
    background: #121212;
}
```
