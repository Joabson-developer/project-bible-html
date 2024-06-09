export function loading(condition) {
  const loader = document.getElementById("loader")
  const element = document.querySelector('[data="loading-wrapper"]')

  if (condition) {
    const loaderElement = `
    <div
      id="loader"
      class="l-loader"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="c-loader" aria-hidden="true"></div>
      <span>Carregando, por favor aguarde...</span>
    </div>
    `
    if (!loader) document.body.insertAdjacentHTML("beforeend", loaderElement)
  } else {
    if (loader) loader.remove()

    if (element) element.classList.remove("s-is-loading")
  }
}
