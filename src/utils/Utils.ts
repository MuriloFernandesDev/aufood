import { parseCookies, setCookie } from 'nookies'

export function ConvertHexadecimalToRGB(hex: string) {
   const r = parseInt(hex.substring(1, 3), 16)
   const g = parseInt(hex.substring(3, 5), 16)
   const b = parseInt(hex.substring(5, 7), 16)
   return `${r}, ${g}, ${b}`
}

export function SaveColors(color: string, name: string) {
   document.documentElement.style.setProperty('--color-' + name, color)
   document.documentElement.style.setProperty(
      '--color-' + name + '-rgb',
      ConvertHexadecimalToRGB(color)
   )
}

export function saveCookie(name: string, value: string, days: number) {
   setCookie(null, name, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
   })
}

export function getCookie(name: string) {
   const value = `@AuFood:${name}`

   const { [value]: cookie } = parseCookies()

   return cookie
}
