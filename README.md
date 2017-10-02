# Handorgel

Accessible [W3C](https://www.w3.org/TR/wai-aria-practices/#accordion) conform accordion written in ES6. `Handorgel` is the Swiss German name for accordion.

[Visit the demo](https://oncode.github.io/handorgel/)

## Features

* ARIA accessible
* Keyboard interaction
* Extensive [API](#api)
* Animated collapsing
* Fully customizable via CSS
* No external dependencies
* Lightweight (~3.5kb minified and gziped)

## Installation

### Package manager

Manager | Command
--- | ---
npm | `npm install handorgel --save`
yarn | `yarn add handorgel`


### CDN / Download

File | CDN
--- | ---
CSS | https://unpkg.com/handorgel@0.3/lib/handorgel.css
CSS (minified) | https://unpkg.com/handorgel@0.3/lib/handorgel.min.css
JS | https://unpkg.com/handorgel@0.3/lib/handorgel.js
JS (minified) | https://unpkg.com/handorgel@0.3/lib/handorgel.min.js


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

**Note**: Use the heading tags that fit into your content to output semantic markup.


### CSS

Import the SASS file from your `node_modules` folder to make use of the variables:

```sass
// e.g. changing opening/closing transition times
$handorgel__content--open-transition-height-time: .1s;
$handorgel__content--open-transition-opacity-time: .2s;
$handorgel__content-transition-height-time: .05s
$handorgel__content-transition-opacity-time: .05s
//...

@import '~handorgel/src/style';
```

Alternatively you can just include the built CSS file inside the `/lib` folder file or from the CDN.


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

  // header class if fold has been opened (transition finished)
  headerOpenedClass: 'handorgel__header--opened',
  // content class if fold has been opened (transition finished)
  contentOpenedClass: 'handorgel__content--opened',

  // header class if fold has been focused
  headerFocusClass: 'handorgel__header--focus',
  // content class if fold has been focused
  contentFocusClass: 'handorgel__content--focus',

  // header class if fold is disabled
  headerDisabledClass: 'handorgel__header--disabled',
  // content class if fold is disabled
  contentDisabledClass: 'handorgel__content--disabled',

  // header class if no transition should be active (applied on resize)
  headerNoTransitionClass: 'handorgel__header--notransition',
  // content class if no transition should be active (applied on resize)
  contentNoTransitionClass: 'handorgel__content--notransition'

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

Method | Description | Parameters
--- | --- | ---
`update` | Update fold instances (use if you dynamically append/remove DOM nodes). |
`resize` | Resize all fold instances. | `transition`: Whether transition should be active during resizing. (default: `false`)
`focus` | Set focus to a new header button (you can also directly use the native `focus()` method on the button). | `target`: New header button to focus (`next`, `previous`, `last` or `first`)
`destroy` | Destroy fold instances, remove event listeners and ARIA attributes. |


Example:

```javascript
var handorgel = new Handorgel(document.querySelector('.handorgel'))

// resize
handorgel.resize()
```

#### HandorgelFold:

Method | Description | Parameters
--- | --- | ---
`open` | Open content. | `transition`: Whether transition should be active during opening (default: `true`).
`close` | Close content. | `transition`: Whether transition should be active during closing (default: `true`).
`toggle` | Toggle content. | `transition`: Whether transition should be active during toggling (default: `true`).
`resize` | Resize content height. | `transition`: Whether transition should be active during resizing (default: `false`).
`disable` | Disable fold. |
`enable` | Enable fold. |
`focus` | Set focus to fold button. |
`blur` | Remove focus from fold button. |
`destroy` | Remove event listeners and ARIA attributes. |

Example:

```javascript
var handorgel = new Handorgel(document.querySelector('.handorgel'))

// close first fold
handorgel.folds[0].close()
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
