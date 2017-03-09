import EventEmitter from 'ev-emitter'
import { rAF, isUndefined } from './helpers'
import Fold from './fold'

var ID_COUNTER = 0

export default class Handorgel extends EventEmitter {

  constructor(element, options = {}) {
    super()

    if (element.handorgel) {
      return
    }

    this.element = element
    this.element.handorgel = this
    this.id = `handorgel${++ID_COUNTER}`
    this.folds = []

    this.initialOpenAttribute = options.initialOpenAttribute || 'data-open'
    this.headerOpenClass = options.headerOpenClass || 'handorgel__header--open'
    this.contentOpenClass = options.contentOpenClass || 'handorgel__content--open'
    this.headerDisabledClass = options.headerDisabledClass || 'handorgel__header--disabled'
    this.contentDisabledClass = options.contentDisabledClass || 'handorgel__content--disabled'
    this.headerNoTransitionClass = options.headerNoTransitionClass || 'handorgel__header--notransition'
    this.contentNoTransitionClass = options.contentNoTransitionClass || 'handorgel__content--notransition'

    this.initialOpenTransition = !isUndefined(options.initialOpenTransition) ? !!options.initialOpenTransition : true
    this.keyboardInteraction = !isUndefined(options.keyboardInteraction) ? !!options.keyboardInteraction : true
    this.multiSelectable = !isUndefined(options.multiSelectable) ? !!options.multiSelectable : true
    this.ariaEnabled = !isUndefined(options.ariaEnabled) ? !!options.ariaEnabled : true
    this.collapsible = !isUndefined(options.collapsible) ? !!options.collapsible : true
    this.carouselFocus = !isUndefined(options.carouselFocus) ? !!options.carouselFocus : true

    this._listeners = {}
    this._resizing = false

    this._bindEvents()
    this._initAria()
    this.update()
  }

  update() {
    this.folds = []
    var children = this.element.children

    for (let i = 0, childrenLength = children.length; i < childrenLength; i = i + 2) {
      var header = children[i],
        content = children[i+1],
        fold = header.handorgelFold

      if (!fold) {
        fold = new Fold(this, children[i], children[i+1])
      }

      this.folds.push(fold)
    }
  }

  resize(transition = false) {
    this.folds.forEach((fold) => {
      fold.resize(transition)
    })

    this._resizing = false
  }

  focus(type) {
    var currentFocusedIndex = null,
      foldsLength = this.folds.length

    for (let i = 0; i < foldsLength && currentFocusedIndex === null; i++) {
      if (this.folds[i].focused) currentFocusedIndex = i
    }

    if ((type == 'prev' || type == 'next')
        && currentFocusedIndex === null
    ) {
      type = type == 'prev' ? 'last' : 'first'
    }

    if (type == 'prev' && currentFocusedIndex == 0) {
      if (!this.carouselFocus) return
      type = 'last'
    }

    if (type == 'next' && currentFocusedIndex == foldsLength - 1) {
      if (!this.carouselFocus) return
      type = 'first'
    }

    switch (type) {
      case 'prev':
        this.folds[--currentFocusedIndex].focus()
        break
      case 'next':
        this.folds[++currentFocusedIndex].focus()
        break
      case 'last':
        this.folds[foldsLength - 1].focus()
        break
      case 'first':
      default:
        this.folds[0].focus()
    }
  }

  destroy() {
    this.emitEvent('destroy')

    this.folds.forEach((fold) => {
      fold.destroy()
    })

    this._unbindEvents()
    this._cleanAria()

    // clean reference to handorgel instance
    this.element.handorgel = null
    this.emitEvent('destroyed')
  }

  _handleFoldOpen(openFold) {
    if (this.multiSelectable) return

    this.folds.forEach((fold) => {
      if (openFold !== fold) fold.close()
    })
  }

  _handleResize() {
    if (!this._resizing) {
      this._resizing = true

      rAF(() => {
        this.resize()
      })
    }
  }

  _initAria() {
    if (!this.ariaEnabled) {
      return
    }

    this.element.setAttribute('role', 'tablist')

    if (this.multiSelectable) {
      this.element.setAttribute('aria-multiselectable', 'true')
    }
  }

  _cleanAria() {
    this.element.removeAttribute('role')
    this.element.removeAttribute('aria-multiselectable')
  }

  _bindEvents() {
    this._listeners.resize = this._handleResize.bind(this)
    window.addEventListener('resize', this._listeners.resize)

    this._listeners.foldOpen = this._handleFoldOpen.bind(this)
    this.on('fold:open', this._listeners.foldOpen)
  }

  _unbindEvents() {
    window.removeEventListener('resize', this._listeners.resize)
    this.off('open', this._listeners.foldOpen)
  }

}
