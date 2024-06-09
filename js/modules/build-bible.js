import { buildBooks } from "./build-books.js"
import { buildChapters } from "./build-chapters.js"
import { buildVerses } from "./build-verses.js"
import { getBook } from "./get-book.js"
import { getGroup } from "./get-group.js"
import { loading } from "./loader.js"
import { setDataCopy } from "./set-data-copy.js"
import { setFooterActions } from "./set-footer-actions.js"

export function buildBible(data) {
  if (!data) return

  loading(true)

  const group = getGroup()

  if (group) {
    buildBooks(data, group)

    const getActiveBook = getBook(data)

    buildChapters(getActiveBook)

    buildVerses(getActiveBook)

    setFooterActions(getActiveBook)

    setDataCopy()

    loading(false)
  }
}
