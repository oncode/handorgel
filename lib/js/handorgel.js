/** handorgel v0.5.0, @license MIT */
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var evEmitter = createCommonjsModule(function (module) {
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : commonjsGlobal, function() {

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i];
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));
});

/**
 * Request animation frame polyfill method.
 *
 * @see https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see https://developer.mozilla.org/de/docs/Web/API/window/requestAnimationFrame
 */
let rAF = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
}();

/**
 * Check if given value is undefined.
 *
 * @param   {*} value - Value to check.
 * @returns {Boolean}
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Check if an object's property could be overridden.
 *
 * @source riot.js
 * @see https://github.com/riot/riot/blob/master/lib/browser/common/util/check.js
 *
 * @param   {Object} obj -
 * @param   {String} key -
 * @returns {Boolean}
 */
function isWritable(obj, key) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable;
}

/**
 * Extend any object with other properties.
 *
 * @source riot.js
 * @see https://github.com/riot/riot/blob/master/lib/browser/common/util/misc.js
 *
 * @param   {Object} src - Source object.
 * @returns {Object} The resulting extended object.
 *
 * @example
 * let obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  let obj;
  let args = arguments;
  for (let i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (let key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key)) src[key] = obj[key];
      }
    }
  }
  return src;
}

let ID_COUNTER = {};
const ARIA_ATTRIBUTES = {
  button: {
    'aria-controls': function () {
      return this.id + '-content';
    },
    'aria-expanded': function () {
      return this.expanded ? 'true' : 'false';
    },
    'aria-disabled': function () {
      return this.disabled ? 'true' : 'false';
    }
  },
  content: {
    role: function () {
      return 'region';
    },
    'aria-labelledby': function () {
      return this.id + '-header';
    }
  }
};
const KEYS = {
  arrowDown: 40,
  arrowUp: 38,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36
};
class HandorgelFold {
  constructor(handorgel, header, content) {
    if (header.handorgelFold) {
      return;
    }
    this.handorgel = handorgel;
    this.header = header;
    this.button = header.firstElementChild;
    this.content = content;
    this.header.handorgelFold = this;
    this.content.handorgelFold = this;
    if (!ID_COUNTER[this.handorgel.id]) {
      ID_COUNTER[this.handorgel.id] = 0;
    }
    this.id = `${this.handorgel.id}-fold${++ID_COUNTER[this.handorgel.id]}`;
    this.header.setAttribute('id', this.id + '-header');
    this.content.setAttribute('id', this.id + '-content');
    this.focused = false;
    this.expanded = false;
    this.disabled = false;
    this._listeners = {};
    this._bindEvents();
    this._initAria();
    this._initialOpen();
    this._initialFocus();
  }
  open(transition = true) {
    if (this.expanded) {
      return;
    }
    this.handorgel.emitEvent('fold:open', [this]);
    this.expanded = true;
    if (!this.handorgel.options.collapsible) {
      this.disable();
    }
    this._updateAria('button', 'aria-expanded');
    this.header.classList.add(this.handorgel.options.headerOpenClass);
    this.content.classList.add(this.handorgel.options.contentOpenClass);
    if (!transition) {
      this._opened();
    } else {
      const height = this.content.firstElementChild.offsetHeight;
      this.content.style.height = `${height}px`;
    }
  }
  close(transition = true) {
    if (!this.expanded) {
      return;
    }
    this.handorgel.emitEvent('fold:close', [this]);
    this.expanded = false;
    if (!this.handorgel.options.collapsible) {
      this.enable();
    }
    this._updateAria('button', 'aria-expanded');
    this.header.classList.remove(this.handorgel.options.headerOpenedClass);
    this.content.classList.remove(this.handorgel.options.contentOpenedClass);
    if (!transition) {
      this._closed();
    } else {
      // if we want to transition when closing we
      // have to set the current height and replace auto
      const height = this.content.firstElementChild.offsetHeight;
      this.content.style.height = `${height}px`;
      rAF(() => {
        this.content.style.height = '0px';
      });
    }
  }
  disable() {
    this.disabled = true;
    this._updateAria('button', 'aria-disabled');
    this.header.classList.add(this.handorgel.options.headerDisabledClass);
    this.content.classList.add(this.handorgel.options.contentDisabledClass);
  }
  enable() {
    this.disabled = false;
    this._updateAria('button', 'aria-disabled');
    this.header.classList.remove(this.handorgel.options.headerDisabledClass);
    this.content.classList.remove(this.handorgel.options.contentDisabledClass);
  }
  focus() {
    this.button.focus();
  }
  blur() {
    this.button.blur();
  }
  toggle(transition = true) {
    if (this.expanded) {
      this.close(transition);
    } else {
      this.open(transition);
    }
  }
  destroy() {
    this._unbindEvents();
    this._cleanAria();

    // clean classes
    this.header.classList.remove(this.handorgel.options.headerOpenClass);
    this.header.classList.remove(this.handorgel.options.headerOpenedClass);
    this.header.classList.remove(this.handorgel.options.headerFocusClass);
    this.content.classList.remove(this.handorgel.options.contentOpenClass);
    this.content.classList.remove(this.handorgel.options.contentOpenedClass);
    this.content.classList.remove(this.handorgel.options.contentFocusClass);

    // hide content
    this.content.style.height = '0px';

    // clean reference to this instance
    this.header.handorgelFold = null;
    this.content.handorgelFold = null;

    // remove ids
    this.header.removeAttribute('id');
    this.content.removeAttribute('id');

    // clean reference to handorgel instance
    this.handorgel = null;
  }
  _opened() {
    this.content.style.height = 'auto';
    this.header.classList.add(this.handorgel.options.headerOpenedClass);
    this.content.classList.add(this.handorgel.options.contentOpenedClass);
    this.handorgel.emitEvent('fold:opened', [this]);
  }
  _closed() {
    this.header.classList.remove(this.handorgel.options.headerOpenClass);
    this.content.classList.remove(this.handorgel.options.contentOpenClass);
    this.handorgel.emitEvent('fold:closed', [this]);
  }
  _initialOpen() {
    if (this.header.getAttribute(this.handorgel.options.initialOpenAttribute) !== null || this.content.getAttribute(this.handorgel.options.initialOpenAttribute) !== null) {
      if (this.handorgel.options.initialOpenTransition) {
        window.setTimeout(() => {
          this.open();
        }, this.handorgel.options.initialOpenTransitionDelay);
      } else {
        this.open(false);
      }
    }
  }
  _initialFocus() {
    if (this.button.getAttribute('autofocus') === null) {
      return;
    }

    // to ensure focus styles if autofocus was applied
    // before focus listener was added
    this._handleFocus();
  }
  _initAria() {
    this._updateAria('button');
    this._updateAria('content');
  }
  _cleanAria() {
    this._updateAria('button', null, true);
    this._updateAria('content', null, true);
  }
  _updateAria(element, property = null, remove = false) {
    if (!this.handorgel.options.ariaEnabled) {
      return;
    }
    if (property) {
      const newValue = ARIA_ATTRIBUTES[element][property].call(this);
      this[element].setAttribute(property, newValue);
    } else {
      for (let property in ARIA_ATTRIBUTES[element]) {
        if (ARIA_ATTRIBUTES[element].hasOwnProperty(property)) {
          if (remove) {
            this[element].removeAttribute(property);
          } else {
            const newValue = ARIA_ATTRIBUTES[element][property].call(this);
            this[element].setAttribute(property, newValue);
          }
        }
      }
    }
  }
  _handleContentTransitionEnd(e) {
    if (e.target === e.currentTarget && e.propertyName === 'height') {
      if (this.expanded) {
        this._opened();
      } else {
        this._closed();
      }
    }
  }
  _handleFocus() {
    this.focused = true;
    this.header.classList.add(this.handorgel.options.headerFocusClass);
    this.content.classList.add(this.handorgel.options.contentFocusClass);
    this.handorgel.emitEvent('fold:focus', [this]);
  }
  _handleBlur() {
    this.focused = false;
    this.header.classList.remove(this.handorgel.options.headerFocusClass);
    this.content.classList.remove(this.handorgel.options.contentFocusClass);
    this.handorgel.emitEvent('fold:blur', [this]);
  }
  _handleButtonClick(e) {
    // ensure focus is on button (click is not seting focus on firefox mac)
    this.focus();
    if (this.disabled) {
      return;
    }
    this.toggle();
  }
  _handleButtonKeydown(e) {
    if (!this.handorgel.options.keyboardInteraction) {
      return;
    }
    let action = null;
    switch (e.which) {
      case KEYS.arrowDown:
        action = 'next';
        break;
      case KEYS.arrowUp:
        action = 'prev';
        break;
      case KEYS.home:
        action = 'first';
        break;
      case KEYS.end:
        action = 'last';
        break;
      case KEYS.pageDown:
        if (e.ctrlKey) {
          action = 'next';
        }
        break;
      case KEYS.pageUp:
        if (e.ctrlKey) {
          action = 'prev';
        }
        break;
    }
    if (action) {
      e.preventDefault();
      this.handorgel.focus(action);
    }
  }
  _handleContentKeydown(e) {
    if (!this.handorgel.options.keyboardInteraction || !e.ctrlKey) {
      return;
    }
    let action = null;
    switch (e.which) {
      case KEYS.pageDown:
        action = 'next';
        break;
      case KEYS.pageUp:
        action = 'prev';
        break;
    }
    if (action) {
      e.preventDefault();
      this.handorgel.focus(action);
    }
  }
  _bindEvents() {
    this._listeners = {
      // button listeners
      bFocus: ['focus', this.button, this._handleFocus.bind(this)],
      bBlur: ['blur', this.button, this._handleBlur.bind(this)],
      bClick: ['click', this.button, this._handleButtonClick.bind(this)],
      bKeydown: ['keydown', this.button, this._handleButtonKeydown.bind(this)],
      // content listeners
      cKeydown: ['keydown', this.content, this._handleContentKeydown.bind(this)],
      cTransition: ['transitionend', this.content, this._handleContentTransitionEnd.bind(this)]
    };
    for (let key in this._listeners) {
      if (this._listeners.hasOwnProperty(key)) {
        const listener = this._listeners[key];
        listener[1].addEventListener(listener[0], listener[2]);
      }
    }
  }
  _unbindEvents() {
    for (let key in this._listeners) {
      if (this._listeners.hasOwnProperty(key)) {
        const listener = this._listeners[key];
        listener[1].removeEventListener(listener[0], listener[2]);
      }
    }
  }
}

let ID_COUNTER$1 = 0;
class Handorgel {
  constructor(element, options = {}) {
    if (element.handorgel) {
      return;
    }
    this.element = element;
    this.element.handorgel = this;
    this.id = `handorgel${++ID_COUNTER$1}`;
    this.element.setAttribute('id', this.id);
    this.folds = [];
    this.options = extend({}, Handorgel.defaultOptions, options);
    this._listeners = {};
    this._bindEvents();
    this._initAria();
    this.update();
  }
  update() {
    this.folds = [];
    const children = this.element.children;
    for (let i = 0, childrenLength = children.length; i < childrenLength; i = i + 2) {
      const header = children[i];
      const content = children[i + 1];

      // get fold instance if there is already one
      let fold = header.handorgelFold;

      // create new one when header and content exist
      if (!fold && header && content) {
        fold = new HandorgelFold(this, header, content);
      }
      if (fold) {
        this.folds.push(fold);
      }
    }
  }
  focus(target) {
    const foldsLength = this.folds.length;
    let currentFocusedIndex = null;
    for (let i = 0; i < foldsLength && currentFocusedIndex === null; i++) {
      if (this.folds[i].focused) currentFocusedIndex = i;
    }
    if ((target === 'prev' || target === 'next') && currentFocusedIndex === null) {
      target = target === 'prev' ? 'last' : 'first';
    }
    if (target === 'prev' && currentFocusedIndex === 0) {
      if (!this.options.carouselFocus) return;
      target = 'last';
    }
    if (target === 'next' && currentFocusedIndex === foldsLength - 1) {
      if (!this.options.carouselFocus) return;
      target = 'first';
    }
    switch (target) {
      case 'prev':
        this.folds[--currentFocusedIndex].focus();
        break;
      case 'next':
        this.folds[++currentFocusedIndex].focus();
        break;
      case 'last':
        this.folds[foldsLength - 1].focus();
        break;
      case 'first':
      default:
        this.folds[0].focus();
    }
  }
  destroy() {
    this.emitEvent('destroy');
    this.element.removeAttribute('id');
    this.folds.forEach(fold => {
      fold.destroy();
    });
    this._unbindEvents();
    this._cleanAria();

    // clean reference to handorgel instance
    this.element.handorgel = null;
    this.emitEvent('destroyed');
  }
  _handleFoldOpen(openFold) {
    if (this.options.multiSelectable) {
      return;
    }
    this.folds.forEach(fold => {
      if (openFold !== fold) {
        fold.close();
      }
    });
  }
  _initAria() {
    if (!this.options.ariaEnabled) {
      return;
    }
    if (this.options.multiSelectable) {
      this.element.setAttribute('aria-multiselectable', 'true');
    }
  }
  _cleanAria() {
    this.element.removeAttribute('aria-multiselectable');
  }
  _bindEvents() {
    this._listeners.foldOpen = this._handleFoldOpen.bind(this);
    this.on('fold:open', this._listeners.foldOpen);
  }
  _unbindEvents() {
    this.off('fold:open', this._listeners.foldOpen);
  }
}

// extend the prototype manually to fix IE10
extend(Handorgel.prototype, evEmitter.prototype);
Handorgel.defaultOptions = {
  keyboardInteraction: true,
  multiSelectable: true,
  ariaEnabled: true,
  collapsible: true,
  carouselFocus: true,
  initialOpenAttribute: 'data-open',
  initialOpenTransition: true,
  initialOpenTransitionDelay: 200,
  headerOpenClass: 'handorgel__header--open',
  contentOpenClass: 'handorgel__content--open',
  headerOpenedClass: 'handorgel__header--opened',
  contentOpenedClass: 'handorgel__content--opened',
  headerDisabledClass: 'handorgel__header--disabled',
  contentDisabledClass: 'handorgel__content--disabled',
  headerFocusClass: 'handorgel__header--focus',
  contentFocusClass: 'handorgel__content--focus'
};

export default Handorgel;
