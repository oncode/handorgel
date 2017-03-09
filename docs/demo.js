import Handorgel from '../src'

var accordeon = new Handorgel(document.querySelector('.default'))

var accordeon2 = new Handorgel(document.querySelector('.single-select'), {
  multiSelectable: false
})

var accordeon3 = new Handorgel(document.querySelector('.single-select-not-collapsible'), {
  multiSelectable: false,
  collapsible: false
})
