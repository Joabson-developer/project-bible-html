import { buildBible } from "./modules/build-book-list.js"
import { LOCAL_PREFIX } from "./modules/consts/local-prefix.js"
import { $fetch } from "./modules/server/index.js"
import { scrollToElement } from "./modules/utils/scroll-to-element.js"

const BASE_URL = "http://localhost:3000/api"

function getBible() {
  const url = window.location.href
  const match = url.split("?")
  const queryParameters = `?${match[1] || ""}`

  $fetch(`${BASE_URL}/bible${queryParameters}`)
    .then((response) => response.json())
    .then((response) => {
      buildBible(response)

      scrollToElement(".c-book--active")
      scrollToElement(".c-chapter--active")
    })
    .catch((error) => {
      console.error(`tratar erro: ${JSON.stringify(error)}`)
    })
}
document.addEventListener("DOMContentLoaded", () => {
  getBible()
})

const checkboxBookGroup = document.querySelectorAll('[name="filter-chip"]')
checkboxBookGroup.forEach((checkbox) =>
  checkbox.addEventListener("change", ({ target }) => {
    const group = target.parentElement.innerText

    // if (group === "todos")
    localStorage.setItem(`${LOCAL_PREFIX}:group`, group)

    getBible()
  })
)
