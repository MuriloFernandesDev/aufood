import { parseCookies, setCookie } from 'nookies'

export function SaveColors(color: string, name: string) {
   document.documentElement.style.setProperty('--color-' + name, color)
}

export function setCookies(name: string, value: string) {
   setCookie(null, `@AuFood:${name}`, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
   })
}

export function getCookie(name: string) {
   const value = `@AuFood:${name}`

   const { [value]: cookie } = parseCookies()

   return cookie
}

export function formatPrice(price: number) {
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(price)
}
