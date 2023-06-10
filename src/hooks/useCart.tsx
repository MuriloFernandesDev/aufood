import {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react'
import { toast } from 'react-toastify'

interface CartProviderProps {
   children: ReactNode
}

interface UpdateProductAmount {
   product_id: number
   quantity: number
}

interface CartContextData {
   cart: any[]
   addProduct: (
      product_id: number,
      price: number,
      image: string,
      title: string,
      quantity: number,
      options: any
   ) => Promise<void>
   removeProduct: (product_id: number) => void
   updateProductAmount: ({ product_id, quantity }: UpdateProductAmount) => void
   somaTotal: number
   cartSize: number
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
   const [somaTotal, setSomaTotal] = useState(0)
   const [cartSize, setCartSize] = useState<number>(0)
   const [cart, setCart] = useState<any[]>(() => {
      // Verificando se existe no localstorage o carrinho
      const storagedCart = null
      if (storagedCart) {
         //Se existir configurar o setCart
         return storagedCart
      }
      return []
   })
   /**
    *
    * Verificando alteração do carrinho
    * e atualizando o localstorage
    *
    *
    */
   const prevCartRef = useRef<any[]>()
   useEffect(() => {
      prevCartRef.current = cart
   })
   const cartPreviousValue = prevCartRef.current ?? cart
   useEffect(() => {
      if (cartPreviousValue !== cart) {
         // localStorage.setItem('@IrPlis:cart', JSON.stringify(cart))
      }
   }, [cart, cartPreviousValue])
   /**
    *
    * Add Produto (Função)
    *
    *
    */

   useEffect(() => {
      const total = cart.map((product) => {
         return product.price * product.quantity
      }, 0) //da um map nos produtos e adiciona a const total

      var soma = 0
      for (var i = 0; i < total.length; i++) {
         soma += total[i]
      }
      setSomaTotal(soma)
   }, [cart])

   useEffect(() => {
      if (cart) {
         setCartSize(cart.length)
      }
   }, [cart])

   const addProduct = async (
      product_id: number,
      price: number,
      image: string,
      title: string,
      quantity: number,
      options: any
   ) => {
      try {
         //Criando um novo array para manipular o cart
         const updatedCart = [...cart]

         // Verificando se ja existe o produto no carrinho
         const productExists = updatedCart.find(
            (product) => product.product_id === product_id
         )

         // Verificando a quantidade inserida no carrinho
         const currentAmount = productExists ? productExists.quantity : 0
         // Adicionando mais um item
         const newAmount = currentAmount + quantity

         //verificando se o produto existe no carrinho
         if (productExists) {
            // se sim incrementa a quantidade
            productExists.quantity = newAmount
         } else {
            //se nao, adiciona ao carrinho
            const newProduct = {
               product_id,
               price,
               image,
               title,
               quantity: quantity,
               options: options,
            }
            updatedCart.push(newProduct)
         }
         //Atualizando o Carrinho
         toast.success(`${title} adicionado ao carrinho`)
         setCart(updatedCart)
      } catch {
         //Caso dê algum erro exibir uma notificação
         toast.error('Erro na adição do produto')
      }
   }
   /**
    *
    * Remover Produto (Função)
    *
    *
    */
   const removeProduct = (product_id: number) => {
      try {
         const updatedCart = [...cart]
         const productIndex = updatedCart.findIndex(
            (product) => product.product_id === product_id
         )
         if (productIndex >= 0) {
            updatedCart.splice(productIndex, 1)
            setCart(updatedCart)
         } else {
            throw Error()
         }
      } catch {
         toast.error('Erro na remoção do produto')
      }
   }
   /**
    *
    * Atualizar Quantidade (Função)
    *
    *
    */
   const updateProductAmount = async ({
      product_id,
      quantity,
   }: UpdateProductAmount) => {
      try {
         //Se a quantidade recebida for 0 ou menos finaliza direto
         if (quantity <= 0) {
            return
         }

         const updatedCart = [...cart]
         const productExists = updatedCart.find(
            (product) => product.product_id === product_id
         )
         if (productExists) {
            productExists.quantity = quantity
            setCart(updatedCart)
            return
         } else {
            throw Error()
         }
      } catch {
         toast.error('Erro na alteração de quantidade do produto')
      }
   }

   return (
      <CartContext.Provider
         value={{
            cart,
            addProduct,
            removeProduct,
            updateProductAmount,
            somaTotal,
            cartSize,
         }}
      >
         {children}
      </CartContext.Provider>
   )
}

export function useCart(): CartContextData {
   const context = useContext(CartContext)

   return context
}
