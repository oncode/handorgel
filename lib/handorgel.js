(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("handorgel", [], factory);
	else if(typeof exports === 'object')
		exports["handorgel"] = factory();
	else
		root["handorgel"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.helpers = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isUndefined = isUndefined;
  /**
   * Request animation frame polyfill method.
   *
   * @see https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
   * @see https://developer.mozilla.org/de/docs/Web/API/window/requestAnimationFrame
   */
  var rAF = exports.rAF = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
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
   * Transition end event.
   * @type {String}
   */
  var transitionEndEvent = exports.transitionEndEvent = function () {
    var el = document.createElement('div'),
        properties = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (var property in properties) {
      if (properties.hasOwnProperty(property) && el.style[property] !== 'undefined') {
        return properties[property];
      }
    }
  }();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.helpers);
    global.fold = mod.exports;
  }
})(this, function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.INITIAL_OPEN_DELAY = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var GUID = {};

  var INITIAL_OPEN_DELAY = exports.INITIAL_OPEN_DELAY = 200;

  var HandorgelFold = function () {
    function HandorgelFold(handorgel, header, content) {
      _classCallCheck(this, HandorgelFold);

      if (header.handorgelFold) {
        return;
      }

      this.handorgel = handorgel;
      this.header = header;
      this.button = header.firstElementChild;
      this.content = content;
      this.header.handorgelFold = this;
      this.content.handorgelFold = this;

      if (!GUID[this.handorgel.guid]) {
        GUID[this.handorgel.guid] = 0;
      }

      this.guid = this.handorgel.guid + '-fold' + ++GUID[this.handorgel.guid];

      this.focused = false;
      this.expanded = false;
      this.disabled = false;
      this._ctrlKeyPressed = false;

      this._bindEvents();
      this._initAria();
      this._initialOpen();
    }

    _createClass(HandorgelFold, [{
      key: 'open',
      value: function open() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.expanded = true;
        this.handorgel.emitEvent('fold:open', [this]);

        if (this.handorgel.ariaEnabled) {
          this.button.setAttribute('aria-expanded', 'true');

          if (!this.handorgel.collapsible) {
            this.disable();
          }
        }

        this.header.classList.add(this.handorgel.headerOpenClass);
        this.content.classList.add(this.handorgel.contentOpenClass);

        this.resize(transition);
        if (!transition) this.handorgel.emitEvent('fold:opened', [this]);
      }
    }, {
      key: 'close',
      value: function close() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.expanded = false;
        this.handorgel.emitEvent('fold:close', [this]);

        if (this.handorgel.ariaEnabled) {
          this.button.setAttribute('aria-expanded', 'false');
          this.enable();
        }

        this.header.classList.remove(this.handorgel.headerOpenClass);
        this.content.classList.remove(this.handorgel.contentOpenClass);

        this.resize(transition);
        if (!transition) this.handorgel.emitEvent('fold:closed', [this]);
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;
        this.button.setAttribute('aria-disabled', 'true');
        this.header.classList.add(this.handorgel.headerDisabledClass);
        this.content.classList.add(this.handorgel.contentDisabledClass);
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;
        this.button.setAttribute('aria-disabled', 'false');
        this.header.classList.remove(this.handorgel.headerDisabledClass);
        this.content.classList.remove(this.handorgel.contentDisabledClass);
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
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: 'resize',
      value: function resize() {
        var _this = this;

        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var height = 0;

        if (!transition) {
          this.header.classList.add(this.handorgel.headerNoTransitionClass);
          this.content.classList.add(this.handorgel.contentNoTransitionClass);
        }

        if (this.expanded) {
          height = this.content.firstElementChild.offsetHeight;
        }

        this.content.style.height = height + 'px';

        window.setTimeout(function () {
          _this.header.classList.remove(_this.handorgel.headerNoTransitionClass);
          _this.content.classList.remove(_this.handorgel.contentNoTransitionClass);
        }, 0);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._unbindEvents();
        this._cleanAria();

        // clean classes
        this.header.classList.remove(this.handorgel.headerOpenClass);
        this.header.classList.remove(this.handorgel.headerNoTransitionClass);
        this.content.classList.remove(this.handorgel.contentOpenClass);
        this.content.classList.remove(this.handorgel.contentNoTransitionClass);

        // hide content
        this.content.style.height = '0px';

        // clean reference to this instance
        this.header.handorgelFold = null;
        this.content.handorgelFold = null;

        // clean reference to handorgel instance
        this.handorgel = null;
      }
    }, {
      key: '_initialOpen',
      value: function _initialOpen() {
        var _this2 = this;

        if (this.header.getAttribute(this.handorgel.initialOpenAttribute) !== null || this.content.getAttribute(this.handorgel.initialOpenAttribute) !== null) {
          if (this.handorgel.initialOpenTransition) {
            window.setTimeout(function () {
              _this2.open();
            }, INITIAL_OPEN_DELAY);
          } else {
            this.open(false);
          }
        }
      }
    }, {
      key: '_initAria',
      value: function _initAria() {
        if (!this.handorgel.ariaEnabled) {
          return;
        }

        this.content.setAttribute('id', this.guid + '-content');
        this.content.setAttribute('role', 'region');
        this.content.setAttribute('aria-labelledby', this.guid + '-header');

        this.button.setAttribute('id', this.guid + '-header');
        this.button.setAttribute('aria-controls', this.guid + '-content');
        this.button.setAttribute('aria-expanded', 'false');
        this.button.setAttribute('aria-disabled', 'false');
      }
    }, {
      key: '_cleanAria',
      value: function _cleanAria() {
        this.content.removeAttribute('id');
        this.content.removeAttribute('role');
        this.content.removeAttribute('aria-labelledby');

        this.button.removeAttribute('id');
        this.button.removeAttribute('aria-controls');
        this.button.removeAttribute('aria-expanded');
        this.button.removeAttribute('aria-disabled');
      }
    }, {
      key: '_handleTransitionEnd',
      value: function _handleTransitionEnd(e) {
        if (e.propertyName == 'height') {
          this.handorgel.resize(true);

          if (this.expanded) {
            this.handorgel.emitEvent('fold:opened', [this]);
          } else {
            this.handorgel.emitEvent('fold:closed', [this]);
          }
        }
      }
    }, {
      key: '_handleFocus',
      value: function _handleFocus() {
        this.focused = true;
        this.handorgel.emitEvent('fold:focus', [this]);
      }
    }, {
      key: '_handleBlur',
      value: function _handleBlur() {
        this.focused = false;
        this.handorgel.emitEvent('fold:blur', [this]);
      }
    }, {
      key: '_handleButtonClick',
      value: function _handleButtonClick(e) {
        if (this.disabled) {
          return;
        }

        this.toggle();
      }
    }, {
      key: '_handleButtonKeydown',
      value: function _handleButtonKeydown(e) {
        if (!this.handorgel.keyboardInteraction) {
          return;
        }

        switch (e.which) {
          case 40:
            // down arrow
            e.preventDefault();
            this.handorgel.focus('next');
            break;
          case 38:
            // up arrow
            e.preventDefault();
            this.handorgel.focus('prev');
            break;
          case 36:
            // home
            e.preventDefault();
            this.handorgel.focus('first');
            break;
          case 35:
            // end
            e.preventDefault();
            this.handorgel.focus('last');
            break;
          case 34:
            // page down
            if (this._ctrlKeyPressed) {
              e.preventDefault();
              this.handorgel.focus('next');
            }
            break;
          case 33:
            // page up
            if (this._ctrlKeyPressed) {
              e.preventDefault();
              this.handorgel.focus('prev');
            }
            break;
          case 17:
            // ctrl
            this._ctrlKeyPressed = true;
            break;
        }
      }
    }, {
      key: '_handleContentKeydown',
      value: function _handleContentKeydown(e) {
        if (!this.handorgel.keyboardInteraction) {
          return;
        }

        switch (e.which) {
          case 34:
            // page down
            if (this._ctrlKeyPressed) {
              e.preventDefault();
              this.handorgel.focus('next');
            }
            break;
          case 33:
            // page up
            if (this._ctrlKeyPressed) {
              e.preventDefault();
              this.handorgel.focus('prev');
            }
            break;
          case 17:
            // ctrl
            this._ctrlKeyPressed = true;
            break;
        }
      }
    }, {
      key: '_handleKeyup',
      value: function _handleKeyup() {
        this._ctrlKeyPressed = false;
      }
    }, {
      key: '_bindEvents',
      value: function _bindEvents() {
        this._focusListener = this._handleFocus.bind(this);
        this._blurListener = this._handleBlur.bind(this);
        this._keyupListener = this._handleKeyup.bind(this);

        this._buttonClickListener = this._handleButtonClick.bind(this);
        this._buttonKeydownListener = this._handleButtonKeydown.bind(this);
        this.button.addEventListener('focus', this._focusListener);
        this.button.addEventListener('blur', this._blurListener);
        this.button.addEventListener('keyup', this._keyupListener);
        this.button.addEventListener('keydown', this._buttonKeydownListener);
        this.button.addEventListener('click', this._buttonClickListener);

        this._contentKeydownListener = this._handleContentKeydown.bind(this);
        this._contentTransitionListener = this._handleTransitionEnd.bind(this);
        this.content.addEventListener('focus', this._focusListener);
        this.content.addEventListener('blur', this._blurListener);
        this.content.addEventListener('keyup', this._keyupListener);
        this.content.addEventListener('keydown', this._contentKeydownListener);
        this.content.addEventListener(_helpers.transitionEndEvent, this._contentTransitionListener);
      }
    }, {
      key: '_unbindEvents',
      value: function _unbindEvents() {
        this.button.removeEventListener('click', this._buttonClickListener);

        this.button.removeEventListener('focus', this._focusListener);
        this.button.removeEventListener('blur', this._blurListener);
        this.button.removeEventListener('keyup', this._keyupListener);
        this.button.removeEventListener('keydown', this._buttonKeydownListener);

        this.content.removeEventListener(_helpers.transitionEndEvent, this._contentTransitionListener);
        this.content.removeEventListener('focus', this._focusListener);
        this.content.removeEventListener('blur', this._blurListener);
        this.content.removeEventListener('keyup', this._keyupListener);
        this.content.removeEventListener('keydown', this._contentKeydownListener);
      }
    }]);

    return HandorgelFold;
  }();

  exports.default = HandorgelFold;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

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
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
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
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(0), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('ev-emitter'), require('./helpers'), require('./fold'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.evEmitter, global.helpers, global.fold);
    global.index = mod.exports;
  }
})(this, function (exports, _evEmitter, _helpers, _fold) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _evEmitter2 = _interopRequireDefault(_evEmitter);

  var _fold2 = _interopRequireDefault(_fold);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var GUID = 0;

  var Handorgel = function (_EventEmitter) {
    _inherits(Handorgel, _EventEmitter);

    function Handorgel(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Handorgel);

      var _this = _possibleConstructorReturn(this, (Handorgel.__proto__ || Object.getPrototypeOf(Handorgel)).call(this));

      if (element.handorgel) {
        return _possibleConstructorReturn(_this);
      }

      _this.element = element;
      _this.element.handorgel = _this;
      _this.guid = 'handorgel' + ++GUID;
      _this.folds = [];

      _this.initialOpenAttribute = options.initialOpenAttribute || 'data-open';
      _this.headerOpenClass = options.headerOpenClass || 'handorgel__header--open';
      _this.contentOpenClass = options.contentOpenClass || 'handorgel__content--open';
      _this.headerDisabledClass = options.headerDisabledClass || 'handorgel__header--disabled';
      _this.contentDisabledClass = options.contentDisabledClass || 'handorgel__content--disabled';
      _this.headerNoTransitionClass = options.headerNoTransitionClass || 'handorgel__header--notransition';
      _this.contentNoTransitionClass = options.contentNoTransitionClass || 'handorgel__content--notransition';

      _this.initialOpenTransition = !(0, _helpers.isUndefined)(options.initialOpenTransition) ? !!options.initialOpenTransition : true;
      _this.keyboardInteraction = !(0, _helpers.isUndefined)(options.keyboardInteraction) ? !!options.keyboardInteraction : true;
      _this.multiSelectable = !(0, _helpers.isUndefined)(options.multiSelectable) ? !!options.multiSelectable : true;
      _this.ariaEnabled = !(0, _helpers.isUndefined)(options.ariaEnabled) ? !!options.ariaEnabled : true;
      _this.collapsible = !(0, _helpers.isUndefined)(options.collapsible) ? !!options.collapsible : true;
      _this.carouselFocus = !(0, _helpers.isUndefined)(options.carouselFocus) ? !!options.carouselFocus : true;

      _this._resizing = false;

      _this._bindEvents();
      _this._initAria();
      _this.update();

      window.test = _this;
      return _this;
    }

    _createClass(Handorgel, [{
      key: 'update',
      value: function update() {
        this.folds = [];
        var children = this.element.children;

        for (var i = 0, childrenLength = children.length; i < childrenLength; i = i + 2) {
          var header = children[i],
              content = children[i + 1],
              fold = header.handorgelFold;

          if (!fold) {
            fold = new _fold2.default(this, children[i], children[i + 1]);
          }

          this.folds.push(fold);
        }
      }
    }, {
      key: 'resize',
      value: function resize() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.folds.forEach(function (fold) {
          fold.resize(transition);
        });

        this._resizing = false;
      }
    }, {
      key: 'focus',
      value: function focus(type) {
        var currentFocusedIndex = null,
            foldsLength = this.folds.length;

        for (var i = 0; i < foldsLength && currentFocusedIndex === null; i++) {
          if (this.folds[i].focused) currentFocusedIndex = i;
        }

        if ((type == 'prev' || type == 'next') && currentFocusedIndex === null) {
          type = type == 'prev' ? 'last' : 'first';
        }

        if (type == 'prev' && currentFocusedIndex == 0) {
          if (!this.carouselFocus) return;
          type = 'last';
        }

        if (type == 'next' && currentFocusedIndex == foldsLength - 1) {
          if (!this.carouselFocus) return;
          type = 'first';
        }

        switch (type) {
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
        if (this.multiSelectable) return;

        this.folds.forEach(function (fold) {
          if (openFold !== fold) fold.close();
        });
      }
    }, {
      key: '_handleResize',
      value: function _handleResize() {
        var _this2 = this;

        if (!this._resizing) {
          this._resizing = true;

          (0, _helpers.rAF)(function () {
            _this2.resize();
          });
        }
      }
    }, {
      key: '_initAria',
      value: function _initAria() {
        if (!this.ariaEnabled) {
          return;
        }

        this.element.setAttribute('role', 'tablist');

        if (this.multiSelectable) {
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
        this._resizeListener = this._handleResize.bind(this);
        window.addEventListener('resize', this._resizeListener);

        this._foldOpenListener = this._handleFoldOpen.bind(this);
        this.on('fold:open', this._foldOpenListener);
      }
    }, {
      key: '_unbindEvents',
      value: function _unbindEvents() {
        window.removeEventListener('resize', this._resizeListener);
        this.off('open', this._foldOpenListener);
      }
    }]);

    return Handorgel;
  }(_evEmitter2.default);

  exports.default = Handorgel;
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=handorgel.js.map