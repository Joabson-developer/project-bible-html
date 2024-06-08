import { getParams } from "./utils/get-params.js"

async function getData(version) {
  try {
    const data = await fetch(`/js/modules/server/bd/${version}.json`).then(
      (response) => response.json()
    )
    return data
  } catch {
    return {
      status: 404,
      message: `A versão "${version}" da bíblia não existe em nossa base de dados. Por favor, selecione uma versão válida!`
    }
  }
}

function buildData(data) {
  const newData = data.map((book, index) => ({
    book_name: book.name,
    abbrev: book.abbrev,
    chapters: book.chapters.length,
    group: index <= 39 - 1 ? "VT" : "NT",
    all_verses: book.chapters.map((chapter) =>
      chapter.map((verse, index) => ({
        verse: `${index + 1}`,
        text: verse
      }))
    )
  }))
  return newData
}

const server = {
  async bible({ version, chapter, book }) {
    const data = await getData(version)
    if (data.status === 404) {
      return data
    }
    const transformedData = buildData(data).map(
      ({ book_name, abbrev, chapters, group, all_verses }) => ({
        book_name,
        abbrev,
        chapters,
        group,
        verses:
          book === abbrev
            ? all_verses.filter((_, index) => index === Number(chapter) - 1)[0]
            : null
      })
    )
    return transformedData
  }
}

const TIMEOUT = 0

export async function $fetch(input, init) {
  const matchEndpoint = /\/api\/(.*?)\?/.exec(input)
  const endpoint = matchEndpoint[1] || null

  const { version, chapter, book } = getParams(input)

  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        if (endpoint in server) {
          const data = await server[endpoint]({ version, chapter, book })

          if (data.status === 404) reject(data)

          resolve({
            json: async () => Promise.resolve(data)
          })
        }

        reject({ status: 404, message: "Not found" })
      }, TIMEOUT)
    } catch {
      reject({ status: 404, message: "Not found" })
    }
  })
}
