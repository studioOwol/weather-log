export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("브라우저가 위치를 지원하지 않음"))

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err)
    )
  })
