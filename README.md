# Handorgel

[![NPM version][npm-image]][npm-url]
[![Coding Style][style-image]][style-url]
[![MIT License][license-image]][license-url]

Accessible [W3C](https://www.w3.org/TR/wai-aria-practices/#accordion) conform accordion written in ES6. `Handorgel` is the Swiss German name for accordion.

[Visit the demo](https://oncode.github.io/handorgel/)

## Features

* ARIA accessible
* Keyboard interaction
* Extensive [API](#api)
* Animated collapsing
* Fully customizable via CSS
* No external dependencies
* Lightweight (~3kb minified and gziped)

## Installation

### Package manager

Manager | Command
--- | ---
npm | `npm install handorgel`
yarn | `yarn add handorgel`

### CDN / Download

File | CDN
--- | ---
CSS | [handorgel.css](https://unpkg.com/handorgel@1.0/lib/css/handorgel.css)
CSS (minified) | [handorgel.min.css](https://unpkg.com/handorgel@1.0/lib/css/handorgel.min.css)
JS | [handorgel.js](https://unpkg.com/handorgel@1.0/lib/js/umd/handorgel.js)
JS (minified) | [handorgel.min.js](https://unpkg.com/handorgel@1.0/lib/js/umd/handorgel.min.js)

## Usage

### Markup

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

**Note**: Use the [heading tags](https://developer.paciellogroup.com/blog/2013/10/html5-document-outline/) that fit into your content to output semantic markup.

### CSS

Import the SASS file from your `node_modules` folder to make use of the variables:

```sass
// e.g. changing opening/closing transition times
$handorgel__content--open-transition-height-time: .1s;
$handorgel__content--open-transition-opacity-time: .2s;
$handorgel__content-transition-height-time: .05s;
$handorgel__content-transition-opacity-time: .05s;
//...

@import '~handorgel/src/scss/style';
```

Alternatively you can just include the built CSS file inside the `/lib` folder file or from the CDN.

### Javascript

Initialization (with all options and their defaults):

```javascript
var accordion = new handorgel(document.querySelector('.handorgel'), {

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
  initialOpenTransitionDelay: 200,

  // header/content element selectors or array of elements
  headerElements: '.handorgel__header',
  contentElements: '.handorgel__content',

  // header/content class if fold is open
  headerOpenClass: 'handorgel__header--open',
  contentOpenClass: 'handorgel__content--open',

  // header/content class if fold has been opened (transition finished)
  headerOpenedClass: 'handorgel__header--opened',
  contentOpenedClass: 'handorgel__content--opened',

  // header/content class if fold has been focused
  headerFocusClass: 'handorgel__header--focus',
  contentFocusClass: 'handorgel__content--focus',

  // header/content class if fold is disabled
  headerDisabledClass: 'handorgel__header--disabled',
  contentDisabledClass: 'handorgel__content--disabled',

})
```

## API

### Events

Event | Description | Parameters
--- | --- | ---
`destroy` | Accordeon is about to be destroyed. |
`destroyed` | Accordeon has been destroyed. |
`fold:open` | Fold is about to be opened. | `HandorgelFold`: Fold instance
`fold:opened` | Fold has opened. | `HandorgelFold`: Fold instance
`fold:close` |  Fold is about to be closed. | `HandorgelFold`: Fold instance
`fold:closed` | Fold has closed. | `HandorgelFold`: Fold instance
`fold:focus` | Fold button has been focused. | `HandorgelFold`: Fold instance
`fold:blur` | Fold button has lost focus. | `HandorgelFold`: Fold instance

How to listen for events:

```javascript
var accordion = new handorgel(document.querySelector('.handorgel'))

// listen for event
accordion.on('fold:open', (fold) => {
  // ...
})

// listen for event once
accordion.once('fold:open', (fold) => {
  // ...
})

// remove event listener
accordion.off('fold:open', fn)
```

### Methods

#### Handorgel Class

Method | Description | Parameters
--- | --- | ---
`update` | Update fold instances (use if you dynamically append/remove DOM nodes). |
`focus` | Set focus to a new header button (you can also directly use the native `focus()` method on the button). | `target`: New header button to focus (`next`, `previous`, `last` or `first`)
`destroy` | Destroy fold instances, remove event listeners and ARIA attributes. |

Example:

```javascript
var accordion = new handorgel(document.querySelector('.handorgel'))

// destroy
accordion.destroy()
```

#### HandorgelFold Class

Method | Description | Parameters
--- | --- | ---
`open` | Open content. | `transition`: Whether transition should be active during opening (default: `true`).
`close` | Close content. | `transition`: Whether transition should be active during closing (default: `true`).
`toggle` | Toggle content. | `transition`: Whether transition should be active during toggling (default: `true`).
`disable` | Disable fold. |
`enable` | Enable fold. |
`focus` | Set focus to fold button. |
`blur` | Remove focus from fold button. |
`destroy` | Remove event listeners and ARIA attributes. |

Example:

```javascript
var accordion = new handorgel(document.querySelector('.handorgel'))

// close first fold
accordion.folds[0].close()
```

## Browser compatibility

* Newest two browser versions of Chrome, Firefox, Safari and Edge

## Development

* `npm run build` - Build production version of the feature.
* `npm run demo` - Build demo of the feature, run watchers and start browser-sync.
* `npm run test` - Test the feature.

## License

[MIT LICENSE](http://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/handorgel.svg
[npm-url]: https://npmjs.com/package/handorgel

[style-image]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[license-image]: http://img.shields.io/badge/license-MIT-000000.svg
[license-url]: LICENSE
