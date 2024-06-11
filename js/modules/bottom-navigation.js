const bottomNavigation = document.querySelectorAll("[data-callback]")

const actions = {
  favorites() {
    alert("em breve")
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
