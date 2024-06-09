import { LOCAL_PREFIX } from "./consts/local-prefix.js"

export function getGroup() {
  let group = localStorage.getItem(`${LOCAL_PREFIX}:group`)

  if (group) {
    document.querySelectorAll('[name="filter-chip"]').forEach((checkbox) => {
      if (checkbox.parentElement.innerText.trim() === group)
        checkbox.setAttribute("checked", "true")
    })
  } else {
    group = document.querySelector('[name="filter-chip"]:checked').parentElement
      .innerText

    localStorage.setItem(`${LOCAL_PREFIX}:group`, group)
  }

  return group
}
