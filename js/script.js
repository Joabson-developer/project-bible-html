import { buildBible } from "./modules/build-book-list.js"
import { LOCAL_PREFIX } from "./modules/consts/local-prefix.js"
import { loading } from "./modules/loader.js"
import { $fetch } from "./modules/server/index.js"
import { scrollToElement } from "./modules/utils/scroll-to-element.js"

const BASE_URL = "http://localhost:3000/api"

function dispatch({ currentTarget }) {
  history.pushState(null, "", currentTarget.dataset.href)
  getBible()
}

function getBible() {
  const url = window.location.href
  const match = url.split("?")
  const queryParameters = `?${match[1] || ""}`

  loading(true)
  $fetch(`${BASE_URL}/bible${queryParameters}`)
    .then((response) => response.json())
    .then((response) => {
      const { bookButtons, chapterButtons } = buildBible(response)

      bookButtons.forEach((button) =>
        button.addEventListener("click", dispatch)
      )

      chapterButtons.forEach((button) =>
        button.addEventListener("click", dispatch)
      )

      scrollToElement(".c-book--active")
      scrollToElement(".c-chapter--active")
    })
    .catch((error) => {
      console.error(`tratar erro: ${JSON.stringify(error)}`)
    })
    .finally(() => loading(false))
}

document.addEventListener("DOMContentLoaded", getBible)
window.addEventListener("popstate", getBible)

const checkboxBookGroup = document.querySelectorAll('[name="filter-chip"]')
checkboxBookGroup.forEach((checkbox) =>
  checkbox.addEventListener("change", ({ target }) => {
    const group = target.parentElement.innerText

    localStorage.setItem(`${LOCAL_PREFIX}:group`, group)

    getBible()
  })
)
