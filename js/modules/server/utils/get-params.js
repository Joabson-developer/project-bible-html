export function getParams(url = "") {
  const matchParams = url.split("?")
  const queryParameters = matchParams[1] || ""

  return queryParameters
    .split("&")
    .map((param) => {
      const [prop, value] = param.split("=")
      return {
        [prop]: value
      }
    })
    .reduce(
      (accumulator, current) => ({
        ...accumulator,
        ...current
      }),
      {}
    )
}
