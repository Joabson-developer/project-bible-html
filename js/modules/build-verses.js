export function buildVerses(getBook) {
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
}
