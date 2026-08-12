// utils/detectLocation.js
export function detectLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported by this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await res.json()
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county

          if (!city) {
            reject(new Error('Could not determine city from location'))
            return
          }
          resolve(city)
        } catch (err) {
          reject(err)
        }
      },
      () => {
        reject(new Error('Location permission denied or unavailable'))
      }
    )
  })
}