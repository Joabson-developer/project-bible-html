let time = 1000
let register = []

export function scrollToElement(element) {
  const activeElement =
    typeof element === "string" ? document.querySelector(element) : element

  if (!register.includes(activeElement.classList[0])) {
    time += 1000
    register.push(activeElement.classList[0])
  }

  if (activeElement) {
    const timeout = setTimeout(() => {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      })

      clearTimeout(timeout)
    }, time)
  }

  const timeout = setTimeout(() => {
    time = 1000
    clearTimeout(timeout)
  }, 2000)
}
