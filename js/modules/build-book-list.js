import { LOCAL_PREFIX } from "./consts/local-prefix.js"
import { loading } from "./loader.js"
import { queryParams } from "./utils/query-params.js"

export function buildBible(data) {
  if (!data) return

  loading(true)

  let group
  try {
    group = localStorage.getItem(`${LOCAL_PREFIX}:group`)
    if (!group) throw new Error("")
    else
      document.querySelectorAll('[name="filter-chip"]').forEach((checkbox) => {
        if (checkbox.parentElement.innerText === group)
          checkbox.setAttribute("checked", "true")
      })
  } catch (error) {
    group = document.querySelector('[name="filter-chip"]:checked').parentElement
      .innerText

    localStorage.setItem(`${LOCAL_PREFIX}:group`, group)
  }

  if (group) {
    const bookElements = (
      group === "todos" ? data : data.filter((book) => book.group === group)
    )
      .map(
        ({ abbrev, book_name, chapters }) => `
      <li>
        <a
          class="c-book${
            queryParams.get("book") === abbrev ? " c-book--active" : ""
          }"
          href="./?version=${queryParams.get(
            "version"
          )}&book=${abbrev}&chapter=1"
        >
          <span class="c-book__title">
            <i class="fa-solid fa-book-bible"></i> <span class="c-book__title__book-name">${book_name}</span>
          </span>
          <span class="c-book__chapters">
            <span class="c-book__chapters__highlight"> ${chapters} </span> &nbsp;
            capítulos
          </span>
        </a>
      </li>
      `
      )
      .join("\n")

    document.querySelector(".l-header__nav__books").innerHTML = bookElements

    const getBook = data.find(
      ({ abbrev }) => queryParams.get("book") === abbrev
    )

    const chapterElements = Array.from(
      { length: getBook.chapters },
      (_, index) => index + 1
    )
      .map(
        (chapter, index) => `
      <li>
        <a href="./?version=${queryParams.get(
          "version"
        )}&book=${queryParams.get(
          "book"
        )}&chapter=${chapter}" aria-describedby="chapter" class="c-chapter${
          Number(queryParams.get("chapter")) === index + 1
            ? " c-chapter--active"
            : ""
        }">${chapter}</a>
      </li>
      `
      )
      .join("")

    document.querySelector(".l-header__nav__chapters").innerHTML =
      chapterElements

    const bibleTextElement = `
    <h1 class="l-main__title">${getBook.book_name}</h1>

      ${getBook.verses
        .map(
          ({ verse, text }) => `
      <p class="l-bible__text">
        <strong class="l-bible__text__number">${verse}</strong> ${text}
      </p>
      `
        )
        .join("")}
    `

    document.querySelector(".l-main").innerHTML = bibleTextElement

    loading(false)
  }
}
