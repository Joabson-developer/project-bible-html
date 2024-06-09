import { queryParams } from "./utils/query-params.js"

export function setFooterActions(getBook) {
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
}
