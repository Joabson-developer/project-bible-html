import { queryParams } from "./utils/query-params.js"

export function buildBooks(data, group) {
  const bookElements = (
    group === "todos" ? data : data.filter((book) => book.group === group)
  )
    .map(
      ({ abbrev, book_name, chapters }) => `
      <li>
        <button
          class="c-book${
            queryParams.get("book") === abbrev ? " c-book--active" : ""
          }"
          data-href="/?version=${queryParams.get(
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
        </button>
      </li>
      `
    )
    .join("\n")

  document.querySelector(".l-header__nav__books").innerHTML = bookElements
}
