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
        <button data-href="/?version=${queryParams.get(
          "version"
        )}&book=${queryParams.get(
          "book"
        )}&chapter=${chapter}" aria-describedby="chapter" class="c-chapter${
          Number(queryParams.get("chapter")) === index + 1
            ? " c-chapter--active"
            : ""
        }">${chapter}</button>
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

    const footerButtonLeft = document.getElementById("footerButtonLeft")
    if (queryParams.get("chapter") === "1") {
      footerButtonLeft.setAttribute("disabled", "true")
      footerButtonLeft.setAttribute(
        "aria-label",
        "Voltar para o capítulo anterior está desabilitado porque você já está no capítulo 1"
      )
      footerButtonLeft.dataset.href = ""
    } else {
      footerButtonLeft.removeAttribute("disabled")
      footerButtonLeft.setAttribute(
        "aria-label",
        `Voltar para o capítulo ${Number(queryParams.get("chapter")) - 1}`
      )
      footerButtonLeft.dataset.href = `/?version=${queryParams.get(
        "version"
      )}&book=${queryParams.get("book")}&chapter=${
        Number(queryParams.get("chapter")) - 1
      }`
    }

    const footerButtonRight = document.getElementById("footerButtonRight")
    if (queryParams.get("chapter") === `${getBook.chapters}`) {
      footerButtonRight.setAttribute("disabled", "true")
      footerButtonRight.setAttribute(
        "aria-label",
        `Avançar para o próximo capítulo está desabilitado porque o capítulo ${getBook.chapters} é o limite`
      )
      footerButtonRight.dataset.href = ""
    } else {
      footerButtonRight.removeAttribute("disabled")
      footerButtonRight.setAttribute(
        "aria-label",
        `Avançar para o capítulo ${Number(queryParams.get("chapter")) + 1}`
      )
      footerButtonRight.dataset.href = `/?version=${queryParams.get(
        "version"
      )}&book=${queryParams.get("book")}&chapter=${
        Number(queryParams.get("chapter")) + 1
      }`
    }

    const FooterBook = document.getElementById("FooterBook")
    FooterBook.innerText = `${getBook.book_name} ${queryParams.get("chapter")}`

    loading(false)

    const bookButtons = document.querySelectorAll(".c-book")
    const chapterButtons = document.querySelectorAll(".c-chapter")

    return {
      bookButtons,
      chapterButtons: [...chapterButtons, footerButtonLeft, footerButtonRight]
    }
  }
}
