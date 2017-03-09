/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
  exports.isWritable = isWritable;
  exports.extend = extend;
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
   * var obj = { foo: 'baz' }
   * extend(obj, {bar: 'bar', foo: 'bar'})
   * console.log(obj) => {bar: 'bar', foo: 'bar'}
   *
   */
  function extend(src) {
    var obj,
        args = arguments;

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
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(0), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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

  var ID_COUNTER = 0;

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
      _this.id = 'handorgel' + ++ID_COUNTER;
      _this.folds = [];
      _this.options = (0, _helpers.extend)({}, Handorgel.defaultOptions, options);

      _this._listeners = {};
      _this._resizing = false;

      _this._bindEvents();
      _this._initAria();
      _this.update();
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
          if (!this.options.carouselFocus) return;
          type = 'last';
        }

        if (type == 'next' && currentFocusedIndex == foldsLength - 1) {
          if (!this.options.carouselFocus) return;
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
        if (this.options.multiSelectable) {
          return;
        }

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
        if (!this.options.ariaEnabled) {
          return;
        }

        this.element.setAttribute('role', 'tablist');

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
        this.off('open', this._listeners.foldOpen);
      }
    }]);

    return Handorgel;
  }(_evEmitter2.default);

  exports.default = Handorgel;


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
    headerOpenedClass: 'handorgel__header--opened',
    contentOpenClass: 'handorgel__content--open',
    contentOpenedClass: 'handorgel__content--opened',

    headerDisabledClass: 'handorgel__header--disabled',
    contentDisabledClass: 'handorgel__content--disabled',
    headerNoTransitionClass: 'handorgel__header--notransition',
    contentNoTransitionClass: 'handorgel__content--notransition'
  };
});

/***/ }),
/* 2 */
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
    global.fold = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var ID_COUNTER = {};

  var TAGS_PREVENT_TOGGLE = ['a', 'button', 'input', 'label', 'select', 'textarea'];

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

      if (!ID_COUNTER[this.handorgel.id]) {
        ID_COUNTER[this.handorgel.id] = 0;
      }

      this.id = this.handorgel.id + '-fold' + ++ID_COUNTER[this.handorgel.id];

      this.focused = false;
      this.expanded = false;
      this.disabled = false;

      this._listeners = {};
      this._ctrlKeyPressed = false;

      this._bindEvents();
      this._initAria();
      this._initialOpen();
    }

    _createClass(HandorgelFold, [{
      key: 'open',
      value: function open() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.expanded) {
          return;
        }

        this.expanded = true;
        this.handorgel.emitEvent('fold:open', [this]);

        if (this.handorgel.options.ariaEnabled) {
          this.button.setAttribute('aria-expanded', 'true');

          if (!this.handorgel.options.collapsible) {
            this.disable();
          }
        }

        this.header.classList.add(this.handorgel.options.headerOpenClass);
        this.content.classList.add(this.handorgel.options.contentOpenClass);

        this.resize(transition);

        if (!transition) {
          this.header.classList.add(this.handorgel.options.headerOpenedClass);
          this.content.classList.add(this.handorgel.options.contentOpenedClass);
          this.handorgel.emitEvent('fold:opened', [this]);
        }
      }
    }, {
      key: 'close',
      value: function close() {
        var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!this.expanded) {
          return;
        }

        this.expanded = false;
        this.handorgel.emitEvent('fold:close', [this]);

        if (this.handorgel.options.ariaEnabled) {
          this.button.setAttribute('aria-expanded', 'false');
          this.enable();
        }

        this.header.classList.remove(this.handorgel.options.headerOpenedClass);
        this.content.classList.remove(this.handorgel.options.contentOpenedClass);
        this.header.classList.remove(this.handorgel.options.headerOpenClass);
        this.content.classList.remove(this.handorgel.options.contentOpenClass);

        this.resize(transition);
        if (!transition) this.handorgel.emitEvent('fold:closed', [this]);
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;
        this.button.setAttribute('aria-disabled', 'true');
        this.header.classList.add(this.handorgel.options.headerDisabledClass);
        this.content.classList.add(this.handorgel.options.contentDisabledClass);
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;
        this.button.setAttribute('aria-disabled', 'false');
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
          this.header.classList.add(this.handorgel.options.headerNoTransitionClass);
          this.content.classList.add(this.handorgel.options.contentNoTransitionClass);
        }

        if (this.expanded) {
          height = this.content.firstElementChild.offsetHeight;
        }

        this.content.style.height = height + 'px';

        window.setTimeout(function () {
          _this.header.classList.remove(_this.handorgel.options.headerNoTransitionClass);
          _this.content.classList.remove(_this.handorgel.options.contentNoTransitionClass);
        }, 0);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._unbindEvents();
        this._cleanAria();

        // clean classes
        this.header.classList.remove(this.handorgel.options.headerOpenClass);
        this.header.classList.remove(this.handorgel.options.headerNoTransitionClass);
        this.content.classList.remove(this.handorgel.options.contentOpenClass);
        this.content.classList.remove(this.handorgel.options.contentNoTransitionClass);

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
      key: '_initAria',
      value: function _initAria() {
        if (!this.handorgel.options.ariaEnabled) {
          return;
        }

        this.content.setAttribute('id', this.id + '-content');
        this.content.setAttribute('role', 'region');
        this.content.setAttribute('aria-labelledby', this.id + '-header');

        this.button.setAttribute('id', this.id + '-header');
        this.button.setAttribute('aria-controls', this.id + '-content');
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
            this.header.classList.add(this.handorgel.options.headerOpenedClass);
            this.content.classList.add(this.handorgel.options.contentOpenedClass);
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
        if (this.disabled || e.target != e.currentTarget && TAGS_PREVENT_TOGGLE.indexOf(e.target.nodeName.toLowerCase()) > -1) {
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
        if (!this.handorgel.options.keyboardInteraction) {
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
        this._listeners.focus = this._handleFocus.bind(this);
        this._listeners.blur = this._handleBlur.bind(this);
        this._listeners.keyup = this._handleKeyup.bind(this);

        this._listeners.buttonClick = this._handleButtonClick.bind(this);
        this._listeners.buttonKeydown = this._handleButtonKeydown.bind(this);
        this.button.addEventListener('focus', this._listeners.focus);
        this.button.addEventListener('blur', this._listeners.blur);
        this.button.addEventListener('keyup', this._listeners.keyup);
        this.button.addEventListener('keydown', this._listeners.buttonKeydown);
        this.button.addEventListener('click', this._listeners.buttonClick);

        this._listeners.contentKeydown = this._handleContentKeydown.bind(this);
        this._listeners.contentTransition = this._handleTransitionEnd.bind(this);
        this.content.addEventListener('focus', this._listeners.focus);
        this.content.addEventListener('blur', this._listeners.blur);
        this.content.addEventListener('keyup', this._listeners.keyup);
        this.content.addEventListener('keydown', this._listeners.contentKeydown);
        this.content.addEventListener('transitionend', this._listeners.contentTransition);
      }
    }, {
      key: '_unbindEvents',
      value: function _unbindEvents() {
        this.button.removeEventListener('click', this._listeners.buttonClick);

        this.button.removeEventListener('focus', this._listeners.focus);
        this.button.removeEventListener('blur', this._listeners.blur);
        this.button.removeEventListener('keyup', this._listeners.keyup);
        this.button.removeEventListener('keydown', this._listeners.buttonKeydown);

        this.content.removeEventListener('transitionend', this._listeners.contentTransition);
        this.content.removeEventListener('focus', this._listeners.focus);
        this.content.removeEventListener('blur', this._listeners.blur);
        this.content.removeEventListener('keyup', this._listeners.keyup);
        this.content.removeEventListener('keydown', this._listeners.contentKeydown);
      }
    }]);

    return HandorgelFold;
  }();

  exports.default = HandorgelFold;
});

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(require('../src'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.src);
    global.demo = mod.exports;
  }
})(this, function (_src) {
  'use strict';

  var _src2 = _interopRequireDefault(_src);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var accordeon = new _src2.default(document.querySelector('.default'));

  var accordeon2 = new _src2.default(document.querySelector('.single-select'), {
    multiSelectable: false
  });

  var accordeon3 = new _src2.default(document.querySelector('.single-select-not-collapsible'), {
    multiSelectable: false,
    collapsible: false
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=demo.bundle.js.map