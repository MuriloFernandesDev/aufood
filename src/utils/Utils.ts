import { parseCookies, setCookie } from 'nookies'

export function SaveColors(color: string, name: string) {
   document.documentElement.style.setProperty('--color-' + name, color)
}

export function setCookies(name: string, value: string) {
   setCookie(null, `${name}`, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
   })
}

export function getCookie(name: string) {
   const value = `${name}`

   const { [value]: cookie } = parseCookies()

   return cookie
}

export function formatPrice(price: number) {
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(price)
}

export const campoInvalido = (
   dados?: any,
   erros?: any,
   campo?: any,
   tipo?: any
) => {
   return (
      (erros === null || erros[campo]) &&
      (!dados[campo] ||
         (tipo === 'int' &&
            ((dados[campo] ?? 0) === 0 || isNaN(dados[campo]))) ||
         (!tipo && dados[campo]?.length === 0))
   )
}

export function PaymentStringForNumber(paymentMethod: string) {
   switch (paymentMethod) {
      case 'Dinheiro':
         return 2
      case 'Debito':
         return 1
      case 'Credito':
         return 0
      case 'Pix':
         return 3
      case 'Voucher':
         return 4
   }
}

export function DeliveryStringForNumber(deliveryMethod: string) {
   switch (deliveryMethod) {
      case 'delivery':
         return 0
      case 'pickup':
         return 1
   }
}
