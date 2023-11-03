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

export function PaymentNumberForString(paymentMethod: number) {
   switch (paymentMethod) {
      case 2:
         return 'Dinheiro'
      case 1:
         return 'Debito'
      case 0:
         return 'Credito'
      case 3:
         return 'Pix'
      case 4:
         return 'Voucher'
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
