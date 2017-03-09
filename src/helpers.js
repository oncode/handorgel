/**
 * Request animation frame polyfill method.
 *
 * @see https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see https://developer.mozilla.org/de/docs/Web/API/window/requestAnimationFrame
 */
export var rAF = (function() {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

/**
 * Check if given value is undefined.
 *
 * @param   {*} value - Value to check.
 * @returns {Boolean}
 */
export function isUndefined(value) {
  return typeof value === 'undefined'
}
