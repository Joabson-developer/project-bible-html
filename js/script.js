import { buildBible } from "./modules/build-bible.js"
import { LOCAL_PREFIX } from "./modules/consts/local-prefix.js"
import { hideScrollbar } from "./modules/hide-scrollbar.js"
import { loading } from "./modules/loader.js"
import "./modules/pin-header.js"
import { $fetch } from "./modules/server/index.js"
import { detectDevice } from "./modules/utils/detect-device.js"
import { queryParams } from "./modules/utils/query-params.js"
import { scrollToElement } from "./modules/utils/scroll-to-element.js"

const BASE_URL = "http://localhost:3000/api"

function dispatch({ currentTarget }) {
  history.pushState(null, "", currentTarget.dataset.href)
  getBible()
}

function getBible() {
  if (!queryParams.get("chapter"))
    window.location.href = "/?version=acf&book=gn&chapter=1"

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

document.addEventListener("DOMContentLoaded", () => {
  getBible()

  if (detectDevice() === "Mobile") hideScrollbar()
})
window.addEventListener("popstate", getBible)

const checkboxBookGroup = document.querySelectorAll('[name="filter-chip"]')
checkboxBookGroup.forEach((checkbox) =>
  checkbox.addEventListener("change", ({ target }) => {
    const group = target.parentElement.innerText

    localStorage.setItem(`${LOCAL_PREFIX}:group`, group)

    getBible()
  })
)
