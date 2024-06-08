function pinHeader() {
  const SELECTOR = "l-header__user"
  const headerToPin = document.querySelector(`.${SELECTOR}`)

  const scrollPosition = window.scrollY || document.documentElement.scrollTop

  const scrollThreshold = 100

  if (scrollPosition > scrollThreshold) {
    headerToPin.classList.add(`${SELECTOR}--fixed`)
  } else {
    headerToPin.classList.remove(`${SELECTOR}--fixed`)
  }
}

document.addEventListener("scroll", pinHeader)
