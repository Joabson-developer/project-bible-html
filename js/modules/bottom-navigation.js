import { LOCAL_PREFIX } from "./consts/local-prefix.js"
import { queryParams } from "./utils/query-params.js"

const bottomNavigation = document.querySelectorAll("[data-callback]")

const actions = {
  home() {
    const homeHref = window.sessionStorage.getItem(`${LOCAL_PREFIX}:home`)
    window.location.href = homeHref || "/"
  },
  favorites() {
    window.sessionStorage.setItem(`${LOCAL_PREFIX}:home`, window.location.href)
    window.location.href = `/favorites.html?version=${
      queryParams.get("version") || "acf"
    }`
  },
  settings() {
    alert("em breve")
  },
  back() {
    history.back()
  }
}

bottomNavigation.forEach((button) => {
  const callback = button.dataset.callback
  button.addEventListener("click", () => {
    actions[callback]()
  })
})
