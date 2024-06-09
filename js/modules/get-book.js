import { queryParams } from "./utils/query-params.js"

export function getBook(data) {
  return data.find(({ abbrev }) => queryParams.get("book") === abbrev)
}
