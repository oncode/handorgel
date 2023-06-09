import Handorgel from '../../src/js'

window.accordion = new Handorgel(document.querySelector('.default'))

window.accordion2 = new Handorgel(document.querySelector('.single-select'), {
  multiSelectable: false
})

window.accordion3 = new Handorgel(document.querySelector('.single-select-not-collapsible'), {
  multiSelectable: false,
  collapsible: false
})
