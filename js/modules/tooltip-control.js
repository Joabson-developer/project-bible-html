import { LOCAL_PREFIX } from "./consts/local-prefix.js"
const tooltip = document.querySelector(".c-tooltip")

let holdTimeout
const TIMEOUT = 300
let lastSelectedElement

function holdStart({ currentTarget }) {
  holdTimeout = setTimeout(() => {
    // TODO: corrigir o bug dos favorites
    // currentTarget.classList.add("l-bible__text--pending")
    lastSelectedElement = currentTarget
  }, TIMEOUT)
}

function holdEnd() {
  clearTimeout(holdTimeout)
}

function getSelectedText() {
  const selectedElements = document.querySelectorAll(".l-bible__text--pending")
  const selectedText = Array.from(selectedElements)
    .map((verse) => verse.dataset.favorite)
    .join("\n")

  return `${selectedText}\n\n${window.location.href}`
}

const actions = {
  favorite(currentTarget) {
    let allFavorites =
      JSON.parse(localStorage.getItem(`${LOCAL_PREFIX}:favorites`)) || []

    const isRemoving = currentTarget.classList.contains(
      "c-tooltip__favorite--active"
    )
    if (isRemoving) {
      lastSelectedElement.classList.remove("l-bible__text--favorite")
      tooltip.setAttribute("aria-hidden", "true")
      allFavorites = allFavorites.filter(
        ({ href }) => href !== lastSelectedElement.dataset.href
      )
    }

    const selectedElements = document.querySelectorAll(
      ".l-bible__text--pending, .l-bible__text--favorite"
    )
    const selectedToAddFavorites = Array.from(selectedElements)
      .filter(
        (verse) => !allFavorites.some(({ href }) => href === verse.dataset.href)
      )
      .map((verse) => ({
        verse: verse.dataset.favorite,
        href: verse.dataset.href
      }))
    const copyFromAllFavorites = [...allFavorites, ...selectedToAddFavorites]

    localStorage.setItem(
      `${LOCAL_PREFIX}:favorites`,
      JSON.stringify(copyFromAllFavorites)
    )
    selectedElements.forEach((verse) => {
      verse.classList.remove("l-bible__text--pending")
      verse.classList.add("l-bible__text--favorite")
    })
    currentTarget.classList.toggle("c-tooltip__favorite--active")
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

// document.addEventListener("click", ({ target, clientX, clientY }) => {
//   const safeArea = tooltip.getElementsByTagName("*")
//   const clickedOnTheSafeArea = Array.from(safeArea).includes(target)

//   if (
//     target.classList.contains("l-bible__text--pending") ||
//     target.classList.contains("l-bible__text--favorite") ||
//     clickedOnTheSafeArea
//   ) {
//     if (!clickedOnTheSafeArea) {
//       tooltip.style.left = `${clientX - 30}px`
//       tooltip.style.top = `${clientY - 50}px`
//       tooltip.setAttribute("aria-hidden", "false")
//       lastSelectedElement = target

//       const favoriteButton = tooltip.querySelector(".c-tooltip__favorite")
//       if (target.classList.contains("l-bible__text--favorite"))
//         favoriteButton.classList.add("c-tooltip__favorite--active")
//       else favoriteButton.classList.remove("c-tooltip__favorite--active")
//     }
//   } else {
//     tooltip.setAttribute("aria-hidden", "true")
//   }
// })

const tooltipActions = tooltip.querySelectorAll("button")
tooltipActions.forEach((button) => {
  button.addEventListener("click", ({ currentTarget }) => {
    if (currentTarget.dataset.action === "favorite") {
      actions[currentTarget.dataset.action](currentTarget)
      return
    }
    actions[currentTarget.dataset.action]()
  })
})

document.addEventListener("selectionchange", () => {
  const selectedElements = window.getSelectedElements
  const targetElements = Array.from(document.querySelectorAll(".l-bible__text"))
  if (selectedElements.length > 0) {
    const firstElement =
      targetElements.find((element) => selectedElements.includes(element)) ||
      targetElements[0]

    tooltip.style.left = `${window.innerWidth / 2 - 40}px`
    tooltip.style.top = `${firstElement.getBoundingClientRect().top - 20}px`
    tooltip.setAttribute("aria-hidden", "false")

    targetElements.forEach((element) => {
      selectedElements.includes(element)
        ? element.classList.add("l-bible__text--pending")
        : element.classList.remove("l-bible__text--pending")
    })
  } else {
    tooltip.setAttribute("aria-hidden", "true")
    targetElements.forEach((element) =>
      element.classList.remove("l-bible__text--pending")
    )
  }
})
