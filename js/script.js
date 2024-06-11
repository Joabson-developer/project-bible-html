import "./modules/bottom-navigation.js"
import { LOCAL_PREFIX } from "./modules/consts/local-prefix.js"
import { getBible } from "./modules/get-bible.js"
import { hideScrollbar } from "./modules/hide-scrollbar.js"
import "./modules/pin-header.js"
import "./modules/toggle-selection.js"
import { detectDevice } from "./modules/utils/detect-device.js"

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
