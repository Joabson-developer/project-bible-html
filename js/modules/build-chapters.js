import { queryParams } from "./utils/query-params.js"

export function buildChapters(getBook) {
  const chapterElements = Array.from(
    { length: getBook.chapters },
    (_, index) => index + 1
  )
    .map(
      (chapter, index) => `
      <li>
        <button data-href="/?version=${queryParams.get(
          "version"
        )}&book=${queryParams.get(
        "book"
      )}&chapter=${chapter}" aria-label="capítulo ${chapter}" class="c-chapter${
        Number(queryParams.get("chapter")) === index + 1
          ? " c-chapter--active"
          : ""
      }">${chapter}</button>
      </li>
      `
    )
    .join("")

  document.querySelector(".l-header__nav__chapters").innerHTML = chapterElements
}
