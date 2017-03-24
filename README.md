# Handorgel

Accessible [W3C](https://www.w3.org/TR/wai-aria-practices/#accordion) conform accordion written in ES6. `Handorgel` is the Swiss German name for accordion.

[Demo](https://oncode.github.io/handorgel/)

## Features

* ARIA accessible
* Keyboard interaction
* Animated collapsing
* Fully customizable via CSS
* No external dependencies
* Lightweight (~3.5kb minified and gziped)

## Installation

### Package manager

yarn: `yarn add handorgel`

npm: `npm install handorgel --save-dev`

### Download

* CSS:
  - [handorgel.min.css](https://unpkg.com/handorgel@0.2/lib/handorgel.min.css) minified, or
  - [handorgel.css](https://unpkg.com/handorgel@0.2/lib/handorgel.css) un-minified
* JavaScript:
  - [handorgel.min.js](https://unpkg.com/handorgel@0.2/lib/handorgel.min.js) minified, or
  - [handorgel.js](https://unpkg.com/handorgel@0.2/lib/handorgel.js) un-minified

### CDN

Link directly to Handorgel files on [unpkg](https://unpkg.com).

``` html
<link rel="stylesheet" href="https://unpkg.com/handorgel@0.2/lib/handorgel.min.css">
<!-- or -->
<link rel="stylesheet" href="https://unpkg.com/handorgel@0.2/lib/handorgel.css">
```

``` html
<script src="https://unpkg.com/handorgel@0.2/lib/handorgel.min.js"></script>
<!-- or -->
<script src="https://unpkg.com/handorgel@0.2/lib/handorgel.js"></script>
```

## Usage

### Markup

Use the heading tags that fit into your content:

```html
<div class="handorgel">
  <h3 class="handorgel__header">
    <button class="handorgel__header__button">
      Title
    </button>
  </h3>
  <div class="handorgel__content" data-open>
    <div class="handorgel__content__inner">
      Content openened by default
    </div>
  </div>
  <h3 class="handorgel__header">
    <button class="handorgel__header__button">
      Title 2
    </button>
  </h3>
  <div class="handorgel__content">
    <div class="handorgel__content__inner">
      Content closed by default
    </div>
  </div>

  ...

</div>
```

### CSS

Import SASS file:

```sass
@import 'NODE_MODULES_PATH/handorgel/src/style';
```

Alternatively you can just include the built CSS file inside the `/lib` folder file.

### Javascript

Initialization (with all options and their defaults):

```javascript
var accordion = new Handorgel(document.querySelector('.accordon'), {

  // whether multiple folds can be opened at once
  multiSelectable: true,
  // whether the folds are collapsible
  collapsible: true,

  // whether ARIA attributes are enabled
  ariaEnabled: true,
  // whether W3C keyboard shortcuts are enabled
  keyboardInteraction: true,
  // whether to loop header focus (sets focus back to first/last header when end/start reached)
  carouselFocus: true,

  // attribute for the header or content to open folds at initialization
  initialOpenAttribute: 'data-open',
  // whether to use transition at initial open
  initialOpenTransition: true,
  // delay used to show initial transition
  initialOpenTransitionDelay: 200

  // header class if fold is open
  headerOpenClass: 'handorgel__header--open',
  // content class if fold is open
  contentOpenClass: 'handorgel__content--open',

  // content class if fold has been opened (transition finished)
  headerOpenedClass: 'handorgel__header--opened',
  // content class if fold has been opened (transition finished)
  contentOpenedClass: 'handorgel__content--opened',

  // header class if fold is disabled
  headerDisabledClass: 'handorgel__header--disabled',
  // content class if fold is disabled
  contentDisabledClass: 'handorgel__content--disabled',

  // header class if no transition is active
  headerNoTransitionClass: 'handorgel__header--notransition'
  // content class if no transition is active
  contentDisabledClass: 'handorgel__content--notransition'

})
```

## API

### Events

* `fold:open`: Accordeon fold is about to be opened.
  - `HandorgelFold`: Fold instance
* `fold:opened`: Accordeon fold has opened.
  - `HandorgelFold`: Fold instance
* `fold:close`:  Accordeon fold is about to be closed.
  - `HandorgelFold`: Fold instance
* `fold:closed`: Accordeon fold has closed.
  - `HandorgelFold`: Fold instance
* `fold:focus`: Accordeon fold button has been focused.
  - `HandorgelFold`: Fold instance
* `fold:blur`: Accordeon fold button has lost focus.
  - `HandorgelFold`: Fold instance
* `destroy`: Accordeon is about to be destroyed.
* `destroyed`: Accordeon has been destroyed.

```javascript
var handorgel = new Handorgel(document.querySelector('.handorgel'))

// listen for event
handorgel.on('fold:open', (fold) => {
  // ...
})

// listen for event once
handorgel.once('fold:open', (fold) => {
  // ...
})

// remove event listener
handorgel.off('fold:open', fn)
```

### Methods

#### Handorgel:

* `update`: Update fold instances (use if you dynamically append/remove DOM nodes).
* `resize`: Resize all fold instances.
  - `transition=false`: If transition should be active during resizing.
* `focus`: Set focus to a new header button (you can also directly use the native `focus()` method on the button)
  - `type`: `next`, `previous`, `last` or `first`
* `destroy`: Destroy fold instances and removes event listeners and ARIA attributes. 

```javascript
var handorgel = new Handorgel(document.querySelector('.handorgel'))

// resize
handorgel.resize()
```

#### HandorgelFold:

* `open`: Open content.
  - `transition=true`: If transition should be active during resizing.
* `close`: Open content.
  - `transition=true`: If transition should be active during resizing.
* `toggle`: Toggle content.
  - `transition=true`: If transition should be active during resizing.
* `resize`: Resize content height.
  - `transition=false`: If transition should be active during resizing.
* `disable`: Disable fold.
* `enable`: Enable fold.
* `focus`: Set focus to fold button.
* `blur`: Remove focus from fold button.
* `destroy`: Removes event listeners and ARIA attributes.

```javascript
var handorgel = new Handorgel(document.querySelector('.handorgel'))

// resize
handorgel.folds[0].resize()
```

## Browser compatibility

* Newest two browser versions of Chrome, Firefox, Safari and Edge
* IE 10 and IE 11

## Development

* `make build` or `npm run build` - Build production version of the feature.
* `make dev` or `npm run dev` - Build demo of the feature, run a watcher and start browser-sync.
* `make test` or `npm run test` - Test the feature.
* `make jsdoc` - Update documentation inside the `docs` folder.

## License

© 2016 [Manuel Sommerhalder](https://github.com/oncode)  
Released under the [MIT LICENSE](http://opensource.org/licenses/MIT)
