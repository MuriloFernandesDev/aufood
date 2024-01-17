import { api } from '@api'
import { IProductCart, ProductList } from '@types'
import { getCookie, setCookies } from '@utils'
import { useRouter } from 'next/router'
import {
   ReactNode,
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useStore } from './useStore'

interface CartProviderProps {
   children: ReactNode
}

interface IProductQuantity extends ProductList {
   quantity: number
}

interface CartContextData {
   cart: IProductCart[]
   addProduct: (props: IProductQuantity) => Promise<void>
   removeProduct: (id: number) => void
   somaTotal: number
   cartSize: number
   ClearCart: () => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
   const [somaTotal, setSomaTotal] = useState(0)
   const [cartSize, setCartSize] = useState(0)
   const { store } = useStore()
   const [cart, setCart] = useState<IProductCart[]>([])
   const route = useRouter()

   const prevCartRef = useRef<IProductCart[]>()
   const cartPreviousValue = prevCartRef.current ?? cart

   useEffect(() => {
      if (store) {
         const storageCart = getCookie(
            `@Cart_${store?.name?.replace(/ /g, '_')}`
         )
         const storage: IProductCart[] | null = storageCart
            ? JSON.parse(storageCart)
            : null

         if (storage) {
            api.get(`/product/list_product_cart/${store.id}`, {
               params: {
                  list_id: JSON.stringify(
                     storage.map((product) => product.product_id).flat()
                  ),
               },
            }).then((res) => {
               setCart(
                  res.data.map((w: any) => {
                     return {
                        ...w,
                        id: Math.random(),
                        product_id: w.id,
                     }
                  })
               )
            })
         }
      }
   }, [store, route.asPath])

   useEffect(() => {
      setCartSize(cart.length)
      const total = cart.reduce((sumTotal, product) => {
         return sumTotal + product.price
      }, 0)

      setSomaTotal(total)
   }, [cart])

   useEffect(() => {
      prevCartRef.current = cart
   })

   useEffect(() => {
      if (cartPreviousValue !== cart) {
         setCookies(
            `@Cart_${store.name.replace(/ /g, '_')}`,
            JSON.stringify(cart)
         )
      }
   }, [cart, cartPreviousValue])

   // Função para adicionar um produto ao carrinho
   const addProduct = async (props: IProductQuantity) => {
      const { id, quantity } = props

      try {
         //Criando um novo array para manipular o cart
         const updatedCart = [...cart]

         //percorrer quantidade de produtos no carrinho e criar um objeto para cada produto
         for (let i = 0; i < quantity; i++) {
            updatedCart.push({
               ...props,
               id: Math.random(),
               product_id: id,
            })
         }

         toast.success(`${props.name} adicionado ao carrinho`, {
            autoClose: 1500,
         })

         //Atualizando o Carrinho
         setCart(updatedCart)
      } catch {
         //Caso dê algum erro exibir uma notificação
         toast.error('Erro na adição do produto')
      }
   }

   // Função para remover um produto do carrinho
   const removeProduct = (id: number) => {
      try {
         const MySwal = withReactContent(Swal)
         MySwal.fire({
            title: 'Tem certeza?',
            text: 'Quer remover este produto do carrinho?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true,
         }).then((result) => {
            if (result.isConfirmed) {
               setCart(cart.filter((product) => product.id !== id))
               toast.warning('Produto removido do carrinho', {
                  autoClose: 2000,
               })
            }
         })
      } catch {
         toast.error('Erro na remoção do produto')
      }
   }

   // Função para limpar o carrinho
   const ClearCart = () => {
      setCart([])
   }

   return (
      <CartContext.Provider
         value={{
            cart,
            addProduct,
            removeProduct,
            somaTotal,
            cartSize,
            ClearCart,
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
