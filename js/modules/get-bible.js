import { buildBible } from "./build-bible.js"
import { BASE_URL_API } from "./consts/base-url-api.js"
import { loading } from "./loader.js"
import { observeElements } from "./utils/observe-elements.js"
import { queryParams } from "./utils/query-params.js"
import { scrollToElement } from "./utils/scroll-to-element.js"

function dispatch({ currentTarget }) {
  history.pushState(null, "", currentTarget.dataset.href)
  getBible()
}

export async function getBible() {
  if (!queryParams.get("chapter"))
    window.location.href = "/?version=acf&book=gn&chapter=1"

  const url = window.location.href
  const match = url.split("?")
  const queryParameters = `?${match[1] || ""}`

  loading(true)

  try {
    const response = await fetch(`${BASE_URL_API}/bible${queryParameters}`)
    const responseJson = await response.json()
    buildBible(responseJson)

    const selectors =
      ".c-book, .c-chapter, #footerButtonLeft, #footerButtonRight"

    observeElements({ selectorAll: selectors }, (bookButtons) => {
      bookButtons.forEach((button) =>
        button.addEventListener("click", dispatch)
      )
    })

    scrollToElement(".c-book--active")
    scrollToElement(".c-chapter--active")
  } catch (error) {
    console.error(error)
  } finally {
    loading(false)
  }
}
