import { LOCAL_PREFIX } from "./consts/local-prefix.js"
import { queryParams } from "./utils/query-params.js"

export function buildVerses(getBook) {
  const allFavorites =
    JSON.parse(localStorage.getItem(`${LOCAL_PREFIX}:favorites`)) || []

  const bibleTextElement = `
<h1 class="l-bible__title">${getBook.book_name}</h1>

  ${getBook.verses
    .map(
      ({ verse, text }) => `
  <p class="l-bible__text ${
    allFavorites.some(
      ({ href }) =>
        href ===
        `/?version=${queryParams.get("version")}&book=${
          getBook.abbrev
        }&chapter=${queryParams.get("chapter")}&verse=${verse}`
    )
      ? "l-bible__text--selected"
      : ""
  }" data-favorite="${text} \n ${getBook.book_name} ${queryParams.get(
        "chapter"
      )}:${verse}" data-href="/?version=${queryParams.get("version")}&book=${
        getBook.abbrev
      }&chapter=${queryParams.get("chapter")}&verse=${verse}">
    <strong class="l-bible__text__number">${verse}</strong> ${text}
  </p>
  `
    )
    .join("")}
`

  document.querySelector(".l-bible").innerHTML = bibleTextElement
}
