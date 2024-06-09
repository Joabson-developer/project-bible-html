export function observeElements(
  { selector, all = false },
  callback,
  timeout = 5000
) {
  const observer = new MutationObserver((_, observer) => {
    const elements = all
      ? document.querySelectorAll(selector)
      : document.querySelector(selector)

    console.log(elements)
    if (elements) {
      observer.disconnect()
      clearTimeout(timeoutId)
      callback(elements)
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })

  const timeoutId = setTimeout(() => {
    observer.disconnect()
    console.warn(
      `Elemento ${selector} não foi encontrado dentro do tempo especificado.`
    )
  }, timeout)
}
