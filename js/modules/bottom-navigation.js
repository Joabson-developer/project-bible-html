import { queryParams } from "./utils/query-params.js"

const bottomNavigation = document.querySelectorAll("[data-callback]")

const actions = {
  favorites() {
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
