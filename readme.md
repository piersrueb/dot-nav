### Dot Nav

Add the nav wrapper, as many sections as you like and Dot Nav will do the rest.

#### HTML

```html
<nav id="dot-nav"></nav>
<section></section>
<section></section>
<section></section>
```

#### CSS

Style the nave to suit your needs.

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
    -webkit-transition: all 0.4;
    transition: all 0.4;
}

nav#dot-nav a.active, nav#dot-nav a:first-child {
    background: #121212;
}
```
