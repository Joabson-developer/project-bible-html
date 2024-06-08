export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase()
  const screenWidth = window.innerWidth

  let deviceType

  if (
    /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
      userAgent
    )
  ) {
    deviceType = "Mobile"
  } else if (/macintosh|mac os x/.test(userAgent)) {
    deviceType = "Mac"
  } else if (/windows/.test(userAgent)) {
    deviceType = "Windows"
  } else {
    deviceType = "Unknown"
  }

  return {
    deviceType: deviceType,
    screenWidth: screenWidth
  }
}
