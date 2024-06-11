import { observeElements } from "./utils/observe-elements.js"
const tooltip = document.querySelector(".c-tooltip")

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

function getSelectedText() {
  const selectedElements = document.querySelectorAll(".l-bible__text--pending")
  const selectedText = Array.from(selectedElements)
    .map((verse) => verse.innerText)
    .join("\n")

  return `${selectedText}\n\n${window.location.href}`
}

const actions = {
  add() {
    alert("em breve")
  },
  share() {
    alert("em breve")
    // const data = {
    //   title: "Person Bible",
    //   text: "text",
    //   url: window.location.href
    // }
    // if (navigator.canShare(data)) {
    //   navigator
    //     .share({
    //       // TODO: alterar o titulo em breve para algo melhor elaborado
    //       title: "Person Bible",
    //       text: "text",
    //       url: window.location.href
    //     })
    //     .then(() => console.log("Compartilhamento realizado com sucesso!"))
    //     .catch((error) => console.error("Erro ao compartilhar:", error))
    // } else {
    //   alert("Compartilhamento não suportado neste navegador.")
    // }
  },
  async copy() {
    try {
      navigator.clipboard.writeText(getSelectedText())
      alert("texto copiado com sucesso!")
    } catch {
      alert("erro ao copiar o texto!")
    }
  },
  cancel() {
    lastSelectedElement.classList.remove("l-bible__text--pending")
    tooltip.setAttribute("aria-hidden", "true")
  }
}

observeElements({ selectorAll: ".l-bible__text" }, (verses) => {
  verses.forEach((verse) => {
    verse.addEventListener("mousedown", holdStart)
    verse.addEventListener("mouseup", holdEnd)
  })
})

document.addEventListener("click", ({ target, clientX, clientY }) => {
  if (target.classList.contains("l-bible__text--pending")) {
    tooltip.style.left = `${clientX - 30}px`
    tooltip.style.top = `${clientY - 50}px`
    tooltip.setAttribute("aria-hidden", "false")
    lastSelectedElement = target
  }
})

const tooltipActions = tooltip.querySelectorAll("button")
tooltipActions.forEach((button) => {
  button.addEventListener("click", ({ currentTarget }) =>
    actions[currentTarget.dataset.action]()
  )
})
