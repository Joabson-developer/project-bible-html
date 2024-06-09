export function observeElements(
  { selector, selectorAll },
  callback,
  timeout = 5000
) {
  // Função auxiliar para verificar a presença de elementos
  function checkForElements() {
    let elements

    if (selectorAll) {
      elements = document.querySelectorAll(selectorAll)
    } else {
      elements = document.querySelector(selector)
    }

    return selectorAll ? elements.length > 0 : elements
  }

  // Verificação inicial antes de configurar o observer
  if (checkForElements()) {
    callback(
      selectorAll
        ? document.querySelectorAll(selectorAll)
        : document.querySelector(selector)
    )
    return
  }

  // Criar o observer
  const observer = new MutationObserver((_, observer) => {
    if (checkForElements()) {
      observer.disconnect()
      clearTimeout(timeoutId)
      callback(
        selectorAll
          ? document.querySelectorAll(selectorAll)
          : document.querySelector(selector)
      )
    }
  })

  // Configurações do observer para observar a árvore de DOM inteira
  observer.observe(document.body, { childList: true, subtree: true })

  // Configurar o timeout
  const timeoutId = setTimeout(() => {
    observer.disconnect()
    console.warn(
      `Elemento ${
        selector || selectorAll
      } não foi encontrado dentro do tempo especificado.`
    )
  }, timeout)
}
