import Handorgel from '../src/js'

let accordion = new Handorgel(document.querySelector('.default'))

let accordion2 = new Handorgel(document.querySelector('.single-select'), {
  multiSelectable: false
})

let accordion3 = new Handorgel(document.querySelector('.single-select-not-collapsible'), {
  multiSelectable: false,
  collapsible: false
})
