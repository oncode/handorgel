/** handorgel v0.4.5, @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.handorgel = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





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
  if ( typeof undefined == 'function' && undefined.amd ) {
    // AMD - RequireJS
    undefined( factory );
  } else if ( 'object' == 'object' && module.exports ) {
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
var rAF = function () {
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
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
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
  var obj = void 0;
  var args = arguments;

  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key)) src[key] = obj[key];
      }
    }
  }

  return src;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var ID_COUNTER = {};

var ARIA_ATTRIBUTES = {
  button: {
    'aria-controls': function ariaControls() {
      return this.id + '-content';
    },
    'aria-expanded': function ariaExpanded() {
      return this.expanded ? 'true' : 'false';
    },
    'aria-disabled': function ariaDisabled() {
      return this.disabled ? 'true' : 'false';
    }
  },
  content: {
    role: function role() {
      return 'region';
    },
    'aria-labelledby': function ariaLabelledby() {
      return this.id + '-header';
    }
  }
};

var KEYS = {
  arrowDown: 40,
  arrowUp: 38,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36
};

var HandorgelFold = function () {
  function HandorgelFold(handorgel, header, content) {
    classCallCheck(this, HandorgelFold);

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

    this.id = this.handorgel.id + '-fold' + ++ID_COUNTER[this.handorgel.id];

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

  createClass(HandorgelFold, [{
    key: 'open',
    value: function open() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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

      this.resize(transition);

      if (!transition) {
        this._opened();
      }
    }
  }, {
    key: 'close',
    value: function close() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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

      this.resize(transition);

      if (!transition) {
        this._closed();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;
      this._updateAria('button', 'aria-disabled');
      this.header.classList.add(this.handorgel.options.headerDisabledClass);
      this.content.classList.add(this.handorgel.options.contentDisabledClass);
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;
      this._updateAria('button', 'aria-disabled');
      this.header.classList.remove(this.handorgel.options.headerDisabledClass);
      this.content.classList.remove(this.handorgel.options.contentDisabledClass);
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.button.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.button.blur();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.expanded) {
        this.close(transition);
      } else {
        this.open(transition);
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      var _this = this;

      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var height = 0;

      if (!transition) {
        this.header.classList.add(this.handorgel.options.headerNoTransitionClass);
        this.content.classList.add(this.handorgel.options.contentNoTransitionClass);
      }

      if (this.expanded) {
        height = this.content.firstElementChild.offsetHeight;
      }

      this.content.style.height = height + 'px';

      if (!transition) {
        rAF(function () {
          _this.header.classList.remove(_this.handorgel.options.headerNoTransitionClass);
          _this.content.classList.remove(_this.handorgel.options.contentNoTransitionClass);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._unbindEvents();
      this._cleanAria();

      // clean classes
      this.header.classList.remove(this.handorgel.options.headerOpenClass);
      this.header.classList.remove(this.handorgel.options.headerOpenedClass);
      this.header.classList.remove(this.handorgel.options.headerFocusClass);
      this.header.classList.remove(this.handorgel.options.headerNoTransitionClass);

      this.content.classList.remove(this.handorgel.options.contentOpenClass);
      this.content.classList.remove(this.handorgel.options.contentOpenedClass);
      this.content.classList.remove(this.handorgel.options.contentFocusClass);
      this.content.classList.remove(this.handorgel.options.contentNoTransitionClass);

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
  }, {
    key: '_opened',
    value: function _opened() {
      this.header.classList.add(this.handorgel.options.headerOpenedClass);
      this.content.classList.add(this.handorgel.options.contentOpenedClass);
      this.handorgel.emitEvent('fold:opened', [this]);
    }
  }, {
    key: '_closed',
    value: function _closed() {
      this.header.classList.remove(this.handorgel.options.headerOpenClass);
      this.content.classList.remove(this.handorgel.options.contentOpenClass);
      this.handorgel.emitEvent('fold:closed', [this]);
    }
  }, {
    key: '_initialOpen',
    value: function _initialOpen() {
      var _this2 = this;

      if (this.header.getAttribute(this.handorgel.options.initialOpenAttribute) !== null || this.content.getAttribute(this.handorgel.options.initialOpenAttribute) !== null) {
        if (this.handorgel.options.initialOpenTransition) {
          window.setTimeout(function () {
            _this2.open();
          }, this.handorgel.options.initialOpenTransitionDelay);
        } else {
          this.open(false);
        }
      }
    }
  }, {
    key: '_initialFocus',
    value: function _initialFocus() {
      if (this.button.getAttribute('autofocus') === null) {
        return;
      }

      // to ensure focus styles if autofocus was applied
      // before focus listener was added
      this._handleFocus();
    }
  }, {
    key: '_initAria',
    value: function _initAria() {
      this._updateAria('button');
      this._updateAria('content');
    }
  }, {
    key: '_cleanAria',
    value: function _cleanAria() {
      this._updateAria('button', null, true);
      this._updateAria('content', null, true);
    }
  }, {
    key: '_updateAria',
    value: function _updateAria(element) {
      var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.handorgel.options.ariaEnabled) {
        return;
      }

      if (property) {
        var newValue = ARIA_ATTRIBUTES[element][property].call(this);
        this[element].setAttribute(property, newValue);
      } else {
        for (var _property in ARIA_ATTRIBUTES[element]) {
          if (ARIA_ATTRIBUTES[element].hasOwnProperty(_property)) {
            if (remove) {
              this[element].removeAttribute(_property);
            } else {
              var _newValue = ARIA_ATTRIBUTES[element][_property].call(this);
              this[element].setAttribute(_property, _newValue);
            }
          }
        }
      }
    }
  }, {
    key: '_handleContentTransitionEnd',
    value: function _handleContentTransitionEnd(e) {
      if (e.target === e.currentTarget && e.propertyName === 'height') {
        this.handorgel.resize(true);

        if (this.expanded) {
          this._opened();
        } else {
          this._closed();
        }
      }
    }
  }, {
    key: '_handleFocus',
    value: function _handleFocus() {
      this.focused = true;
      this.header.classList.add(this.handorgel.options.headerFocusClass);
      this.content.classList.add(this.handorgel.options.contentFocusClass);
      this.handorgel.emitEvent('fold:focus', [this]);
    }
  }, {
    key: '_handleBlur',
    value: function _handleBlur() {
      this.focused = false;
      this.header.classList.remove(this.handorgel.options.headerFocusClass);
      this.content.classList.remove(this.handorgel.options.contentFocusClass);
      this.handorgel.emitEvent('fold:blur', [this]);
    }
  }, {
    key: '_handleButtonClick',
    value: function _handleButtonClick(e) {
      // ensure focus is on button (click is not seting focus on firefox mac)
      this.focus();

      if (this.disabled) {
        return;
      }

      this.toggle();
    }
  }, {
    key: '_handleButtonKeydown',
    value: function _handleButtonKeydown(e) {
      if (!this.handorgel.options.keyboardInteraction) {
        return;
      }

      var action = null;

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
  }, {
    key: '_handleContentKeydown',
    value: function _handleContentKeydown(e) {
      if (!this.handorgel.options.keyboardInteraction || !e.ctrlKey) {
        return;
      }

      var action = null;

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
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
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

      for (var key in this._listeners) {
        if (this._listeners.hasOwnProperty(key)) {
          var listener = this._listeners[key];
          listener[1].addEventListener(listener[0], listener[2]);
        }
      }
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      for (var key in this._listeners) {
        if (this._listeners.hasOwnProperty(key)) {
          var listener = this._listeners[key];
          listener[1].removeEventListener(listener[0], listener[2]);
        }
      }
    }
  }]);
  return HandorgelFold;
}();

var ID_COUNTER$1 = 0;

var Handorgel = function (_EventEmitter) {
  inherits(Handorgel, _EventEmitter);

  function Handorgel(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Handorgel);

    var _this = possibleConstructorReturn(this, (Handorgel.__proto__ || Object.getPrototypeOf(Handorgel)).call(this));

    if (element.handorgel) {
      return possibleConstructorReturn(_this);
    }

    _this.element = element;
    _this.element.handorgel = _this;
    _this.id = 'handorgel' + ++ID_COUNTER$1;
    _this.element.setAttribute('id', _this.id);
    _this.folds = [];
    _this.options = extend({}, Handorgel.defaultOptions, options);

    _this._listeners = {};
    _this._resizing = false;

    _this._bindEvents();
    _this._initAria();
    _this.update();
    return _this;
  }

  createClass(Handorgel, [{
    key: 'update',
    value: function update() {
      this.folds = [];
      var children = this.element.children;

      for (var i = 0, childrenLength = children.length; i < childrenLength; i = i + 2) {
        var header = children[i];
        var content = children[i + 1];
        var fold = header.handorgelFold;

        if (!fold) {
          fold = new HandorgelFold(this, header, content);
        }

        this.folds.push(fold);
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // resize each fold
      this.folds.forEach(function (fold) {
        fold.resize(transition);
      });

      this._resizing = false;
    }
  }, {
    key: 'focus',
    value: function focus(target) {
      var foldsLength = this.folds.length;
      var currentFocusedIndex = null;

      for (var i = 0; i < foldsLength && currentFocusedIndex === null; i++) {
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
  }, {
    key: 'destroy',
    value: function destroy() {
      this.emitEvent('destroy');
      this.element.removeAttribute('id');

      this.folds.forEach(function (fold) {
        fold.destroy();
      });

      this._unbindEvents();
      this._cleanAria();

      // clean reference to handorgel instance
      this.element.handorgel = null;
      this.emitEvent('destroyed');
    }
  }, {
    key: '_handleFoldOpen',
    value: function _handleFoldOpen(openFold) {
      if (this.options.multiSelectable) {
        return;
      }

      this.folds.forEach(function (fold) {
        if (openFold !== fold) {
          fold.close();
        }
      });
    }
  }, {
    key: '_handleResize',
    value: function _handleResize() {
      var _this2 = this;

      if (!this._resizing) {
        this._resizing = true;

        rAF(function () {
          _this2.resize();
        });
      }
    }
  }, {
    key: '_initAria',
    value: function _initAria() {
      if (!this.options.ariaEnabled) {
        return;
      }

      this.element.setAttribute('role', 'presentation');

      if (this.options.multiSelectable) {
        this.element.setAttribute('aria-multiselectable', 'true');
      }
    }
  }, {
    key: '_cleanAria',
    value: function _cleanAria() {
      this.element.removeAttribute('role');
      this.element.removeAttribute('aria-multiselectable');
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      this._listeners.resize = this._handleResize.bind(this);
      window.addEventListener('resize', this._listeners.resize);

      this._listeners.foldOpen = this._handleFoldOpen.bind(this);
      this.on('fold:open', this._listeners.foldOpen);
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      window.removeEventListener('resize', this._listeners.resize);
      this.off('fold:open', this._listeners.foldOpen);
    }
  }]);
  return Handorgel;
}(evEmitter);

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
  contentFocusClass: 'handorgel__content--focus',

  headerNoTransitionClass: 'handorgel__header--notransition',
  contentNoTransitionClass: 'handorgel__content--notransition'
};

return Handorgel;

})));
