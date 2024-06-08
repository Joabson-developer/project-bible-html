export const queryParams = {
  get(paramName) {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    return params.get(paramName)
  }
}
