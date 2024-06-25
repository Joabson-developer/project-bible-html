Object.defineProperty(window, "getSelectedElements", {
  get: function () {
    const selection = document.getSelection()
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed)
      return []

    const range = selection.getRangeAt(0)
    if (range.toString().trim().length === 0) return []

    return getDirectlySelectedElements(range)
  },
  configurable: true,
  enumerable: true
})

function getDirectlySelectedElements(range) {
  const startContainer = getEnclosingElement(range.startContainer)
  const endContainer = getEnclosingElement(range.endContainer)
  const elements = new Set()

  if (startContainer === endContainer) {
    if (startContainer) elements.add(startContainer)
  } else {
    let currentNode = startContainer
    while (currentNode) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) elements.add(currentNode)
      if (currentNode === endContainer) break
      currentNode =
        currentNode.nextElementSibling || findNextSiblingInParent(currentNode)
    }
  }

  return [...elements]
}

function getEnclosingElement(node) {
  while (node && node.nodeType !== Node.ELEMENT_NODE) {
    node = node.parentNode
  }
  return node
}

function findNextSiblingInParent(node) {
  while (node) {
    if (node.nextElementSibling) return node.nextElementSibling
    node = node.parentNode
  }
  return null
}
