import { observeElements } from "./utils/observe-elements.js"

let holdTimeout
const TIMEOUT = 1000
let lastSelectedElement

function holdStart({ currentTarget }) {
  holdTimeout = setTimeout(() => {
    currentTarget.classList.add("l-bible__text--pending")
    lastSelectedElement = currentTarget
  }, TIMEOUT)
}

function holdEnd() {
  clearTimeout(holdTimeout)
}

observeElements({ selectorAll: ".l-bible__text" }, (verses) => {
  verses.forEach((verse) => {
    // verse.addEventListener("click", ({ currentTarget }) => {
    //   currentTarget.classList.toggle("l-bible__text--selected")
    // })
    verse.addEventListener("mousedown", holdStart)
    verse.addEventListener("mouseup", holdEnd)
  })
})

// TODO: evoluir a ação pending para ser cancelada
// document.addEventListener("click", ({ target }) => {
//   const pendingSelectedElements = document.querySelectorAll(
//     ".l-bible__text--pending"
//   )
//   console.log(pendingSelectedElements)
// })
