import { LOCAL_PREFIX } from "./modules/consts/local-prefix.js"

try {
  const data = window.localStorage.getItem(`${LOCAL_PREFIX}:favorites`)

  if (data) {
    const favorites = JSON.parse(data)
    console.log(favorites)
  } else throw new Error("No data")
} catch (error) {
  console.error(error)
}
