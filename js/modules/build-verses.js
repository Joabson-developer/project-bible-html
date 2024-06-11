import { LOCAL_PREFIX } from "./consts/local-prefix.js"
import { queryParams } from "./utils/query-params.js"

export function buildVerses(getBook) {
  const allFavorites = JSON.parse(
    localStorage.getItem(`${LOCAL_PREFIX}:favorites`)
  )

  const favoriteVerses =
    allFavorites[getBook.abbrev][queryParams.get("chapter")] || []

  const bibleTextElement = `
<h1 class="l-bible__title">${getBook.book_name}</h1>

  ${getBook.verses
    .map(
      ({ verse, text }) => `
  <p class="l-bible__text ${
    favoriteVerses.includes(verse) ? "l-bible__text--selected" : ""
  }">
    <strong class="l-bible__text__number">${verse}</strong> ${text}
  </p>
  `
    )
    .join("")}
`

  document.querySelector(".l-bible").innerHTML = bibleTextElement
}
