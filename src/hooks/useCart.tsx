import {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react'
import { toast } from 'react-toastify'
import { getCookie, setCookies } from '../utils/Utils'

interface CartProviderProps {
   children: ReactNode
}

interface UpdateProductAmount {
   product_id: number
   quantity: number
}

interface IProduct {
   product_id: number
   name: string
   price: number
   image: string
   quantity: number
}

interface CartContextData {
   cart: IProduct[]
   addProduct: (
      product_id: number,
      price: number,
      image: string,
      title: string,
      quantity: number
   ) => Promise<void>
   removeProduct: (product_id: number) => void
   updateProductAmount: ({ product_id, quantity }: UpdateProductAmount) => void
   somaTotal: number
   cartSize: number
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
   const [somaTotal, setSomaTotal] = useState(0)
   const [cartSize, setCartSize] = useState(0)

   const [cart, setCart] = useState<IProduct[]>(() => {
      const storageCart = getCookie('Cart')
      const storage = storageCart ? JSON.parse(storageCart) : null

      if (storage) {
         return storage
      }
      return []
   })

   useEffect(() => {
      setCartSize(cart.length)
      const total = cart.reduce((sumTotal, product) => {
         return sumTotal + product.price * product.quantity
      }, 0)

      setSomaTotal(total)
   }, [cart])

   const prevCartRef = useRef<IProduct[]>()
   useEffect(() => {
      prevCartRef.current = cart
   })
   const cartPreviousValue = prevCartRef.current ?? cart
   useEffect(() => {
      if (cartPreviousValue !== cart) {
         setCookies('Cart', JSON.stringify(cart))
      }
   }, [cart, cartPreviousValue])

   const addProduct = async (
      product_id: number,
      price: number,
      image: string,
      name: string,
      quantity: number
   ) => {
      try {
         //Criando um novo array para manipular o cart
         const updatedCart = [...cart]

         // Verificando se ja existe o produto no carrinho
         const productExists = updatedCart.find(
            (product) => product.product_id === product_id
         )

         //verificando se o produto existe no carrinho
         if (productExists) {
            //se existe atualiza a quantidade
            productExists.quantity = (productExists.quantity ?? 0) + quantity
         } else {
            //se nao, adiciona ao carrinho
            const newProduct = {
               product_id,
               price,
               image,
               name,
               quantity,
            }
            updatedCart.push(newProduct)
         }

         //Atualizando o Carrinho
         toast.success(`${name} adicionado ao carrinho`)
         setCart(updatedCart)
      } catch {
         //Caso dê algum erro exibir uma notificação
         toast.error('Erro na adição do produto')
      }
   }

   // Função para remover um produto do carrinho
   const removeProduct = (product_id: number) => {
      try {
         setCart(cart.filter((product) => product.product_id !== product_id))
      } catch {
         toast.error('Erro na remoção do produto')
      }
   }

   // Função para atualizar a quantidade de um produto no carrinho
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
