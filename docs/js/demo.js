import Handorgel from '../src/js'

const accordion = new Handorgel(document.querySelector('.default'))

const accordion2 = new Handorgel(document.querySelector('.single-select'), {
  multiSelectable: false
})

const accordion3 = new Handorgel(document.querySelector('.single-select-not-collapsible'), {
  multiSelectable: false,
  collapsible: false
})
