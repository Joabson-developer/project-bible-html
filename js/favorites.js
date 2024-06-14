import "./modules/bottom-navigation.js"
import { LOCAL_PREFIX } from "./modules/consts/local-prefix.js"

try {
  const data = window.localStorage.getItem(`${LOCAL_PREFIX}:favorites`)

  if (data) {
    const favorites = JSON.parse(data) || []
    const elements = favorites
      .map(({ verse, href }) => {
        const [verseText, verseReference] = verse.split("\n")

        return `
        <li class="c-favorite-list__item">
          <a href="${href}">
            <p class="c-favorite-list__item__text">
              <i class="fa-solid fa-book-bible"></i>
              ${verseText}
            </p>
            <span class="c-favorite-list__item__reference">${verseReference}</span>
          </a>
        </li>
      `
      })
      .join("\n")

    document.querySelector(".c-favorite-list").innerHTML = elements
  } else throw new Error("No data")
} catch (error) {
  console.error(error)
}
