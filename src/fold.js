import { transitionEndEvent } from './helpers'

var GUID = {}

export var INITIAL_OPEN_DELAY = 200

export default class HandorgelFold {

  constructor(handorgel, header, content) {
    if (header.handorgelFold) {
      return
    }

    this.handorgel = handorgel
    this.header = header
    this.button = header.firstElementChild
    this.content = content
    this.header.handorgelFold = this
    this.content.handorgelFold = this

    if (!GUID[this.handorgel.guid]) {
      GUID[this.handorgel.guid] = 0
    }

    this.guid = `${this.handorgel.guid}-fold${++GUID[this.handorgel.guid]}`

    this.focused = false
    this.expanded = false
    this.disabled = false
    this._ctrlKeyPressed = false

    this._bindEvents()
    this._initAria()
    this._initialOpen()
  }

  open(transition = true) {
    this.expanded = true
    this.handorgel.emitEvent('fold:open', [this])

    if (this.handorgel.ariaEnabled) {
      this.button.setAttribute('aria-expanded', 'true')

      if (!this.handorgel.collapsible) {
        this.disable()
      }
    }

    this.header.classList.add(this.handorgel.headerOpenClass)
    this.content.classList.add(this.handorgel.contentOpenClass)

    this.resize(transition)
    if (!transition) this.handorgel.emitEvent('fold:opened', [this])
  }

  close(transition = true) {
    this.expanded = false
    this.handorgel.emitEvent('fold:close', [this])

    if (this.handorgel.ariaEnabled) {
      this.button.setAttribute('aria-expanded', 'false')
      this.enable()
    }

    this.header.classList.remove(this.handorgel.headerOpenClass)
    this.content.classList.remove(this.handorgel.contentOpenClass)

    this.resize(transition)
    if (!transition) this.handorgel.emitEvent('fold:closed', [this])
  }

  disable() {
    this.disabled = true
    this.button.setAttribute('aria-disabled', 'true')
    this.header.classList.add(this.handorgel.headerDisabledClass)
    this.content.classList.add(this.handorgel.contentDisabledClass)
  }

  enable() {
    this.disabled = false
    this.button.setAttribute('aria-disabled', 'false')
    this.header.classList.remove(this.handorgel.headerDisabledClass)
    this.content.classList.remove(this.handorgel.contentDisabledClass)
  }

  focus() {
    this.button.focus()
  }

  blur() {
    this.button.blur()
  }

  toggle(transition = true) {
    if (this.expanded) {
      this.close()
    } else {
      this.open()
    }
  }

  resize(transition = false) {
    var height = 0

    if (!transition) {
      this.header.classList.add(this.handorgel.headerNoTransitionClass)
      this.content.classList.add(this.handorgel.contentNoTransitionClass)
    }

    if (this.expanded) {
      height = this.content.firstElementChild.offsetHeight
    }

    this.content.style.height = height +'px'

    window.setTimeout(() => {
      this.header.classList.remove(this.handorgel.headerNoTransitionClass)
      this.content.classList.remove(this.handorgel.contentNoTransitionClass)
    }, 0)
  }

  destroy() {
    this._unbindEvents()
    this._cleanAria()

    // clean classes
    this.header.classList.remove(this.handorgel.headerOpenClass)
    this.header.classList.remove(this.handorgel.headerNoTransitionClass)
    this.content.classList.remove(this.handorgel.contentOpenClass)
    this.content.classList.remove(this.handorgel.contentNoTransitionClass)

    // hide content
    this.content.style.height = '0px'

    // clean reference to this instance
    this.header.handorgelFold = null
    this.content.handorgelFold = null

    // clean reference to handorgel instance
    this.handorgel = null
  }

  _initialOpen() {
    if (this.header.getAttribute(this.handorgel.initialOpenAttribute) !== null
        || this.content.getAttribute(this.handorgel.initialOpenAttribute) !== null
    ) {
      if (this.handorgel.initialOpenTransition) {
        window.setTimeout(() => {
          this.open()
        }, INITIAL_OPEN_DELAY)
      } else {
        this.open(false)
      }
    }
  }

  _initAria() {
    if (!this.handorgel.ariaEnabled) {
      return
    }

    this.content.setAttribute('id', `${this.guid}-content`)
    this.content.setAttribute('role', 'region')
    this.content.setAttribute('aria-labelledby', `${this.guid}-header`)

    this.button.setAttribute('id', `${this.guid}-header`)
    this.button.setAttribute('aria-controls', `${this.guid}-content`)
    this.button.setAttribute('aria-expanded', 'false')
    this.button.setAttribute('aria-disabled', 'false')
  }

  _cleanAria() {
    this.content.removeAttribute('id')
    this.content.removeAttribute('role')
    this.content.removeAttribute('aria-labelledby')

    this.button.removeAttribute('id')
    this.button.removeAttribute('aria-controls')
    this.button.removeAttribute('aria-expanded')
    this.button.removeAttribute('aria-disabled')
  }

  _handleTransitionEnd(e) {
    if (e.propertyName == 'height') {
      this.handorgel.resize(true)

      if (this.expanded) {
        this.handorgel.emitEvent('fold:opened', [this])
      } else {
        this.handorgel.emitEvent('fold:closed', [this])
      }
    }
  }

  _handleFocus() {
    this.focused = true
    this.handorgel.emitEvent('fold:focus', [this])
  }

  _handleBlur() {
    this.focused = false
    this.handorgel.emitEvent('fold:blur', [this])
  }

  _handleButtonClick(e) {
    if (this.disabled) {
      return
    }

    this.toggle()
  }

  _handleButtonKeydown(e) {
    if (!this.handorgel.keyboardInteraction) {
      return
    }

    switch (e.which) {
      case 40: // down arrow
        e.preventDefault()
        this.handorgel.focus('next')
        break
      case 38: // up arrow
        e.preventDefault()
        this.handorgel.focus('prev')
        break
      case 36: // home
        e.preventDefault()
        this.handorgel.focus('first')
        break
      case 35: // end
        e.preventDefault()
        this.handorgel.focus('last')
        break
      case 34: // page down
        if (this._ctrlKeyPressed) {
          e.preventDefault()
          this.handorgel.focus('next')
        }
        break
      case 33: // page up
        if (this._ctrlKeyPressed) {
          e.preventDefault()
          this.handorgel.focus('prev')
        }
        break
      case 17: // ctrl
        this._ctrlKeyPressed = true
        break
    }
  }

  _handleContentKeydown(e) {
    if (!this.handorgel.keyboardInteraction) {
      return
    }

    switch (e.which) {
      case 34: // page down
        if (this._ctrlKeyPressed) {
          e.preventDefault()
          this.handorgel.focus('next')
        }
        break
      case 33: // page up
        if (this._ctrlKeyPressed) {
          e.preventDefault()
          this.handorgel.focus('prev')
        }
        break
      case 17: // ctrl
        this._ctrlKeyPressed = true
        break
    }
  }

  _handleKeyup() {
    this._ctrlKeyPressed = false
  }

  _bindEvents() {
    this._focusListener = this._handleFocus.bind(this)
    this._blurListener = this._handleBlur.bind(this)
    this._keyupListener = this._handleKeyup.bind(this)

    this._buttonClickListener = this._handleButtonClick.bind(this)
    this._buttonKeydownListener = this._handleButtonKeydown.bind(this)
    this.button.addEventListener('focus', this._focusListener)
    this.button.addEventListener('blur', this._blurListener)
    this.button.addEventListener('keyup', this._keyupListener)
    this.button.addEventListener('keydown', this._buttonKeydownListener)
    this.button.addEventListener('click', this._buttonClickListener)

    this._contentKeydownListener = this._handleContentKeydown.bind(this)
    this._contentTransitionListener = this._handleTransitionEnd.bind(this)
    this.content.addEventListener('focus', this._focusListener)
    this.content.addEventListener('blur', this._blurListener)
    this.content.addEventListener('keyup', this._keyupListener)
    this.content.addEventListener('keydown', this._contentKeydownListener)
    this.content.addEventListener(transitionEndEvent, this._contentTransitionListener)
  }

  _unbindEvents() {
    this.button.removeEventListener('click', this._buttonClickListener)

    this.button.removeEventListener('focus', this._focusListener)
    this.button.removeEventListener('blur', this._blurListener)
    this.button.removeEventListener('keyup', this._keyupListener)
    this.button.removeEventListener('keydown', this._buttonKeydownListener)

    this.content.removeEventListener(transitionEndEvent, this._contentTransitionListener)
    this.content.removeEventListener('focus', this._focusListener)
    this.content.removeEventListener('blur', this._blurListener)
    this.content.removeEventListener('keyup', this._keyupListener)
    this.content.removeEventListener('keydown', this._contentKeydownListener)
  }

}
