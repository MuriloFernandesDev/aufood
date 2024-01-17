import { api } from '@api'
import { IProduct } from '@types'
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

interface IAddProduct {
   id: number
   quantity: number
}

interface CartContextData {
   cart: IProduct[]
   addProduct: ({ id, quantity }: IAddProduct) => Promise<void>
   removeProduct: (id: number) => void
   updateProductAmount: ({ id, quantity }: IAddProduct) => void
   somaTotal: number
   cartSize: number
   ClearCart: () => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
   const [somaTotal, setSomaTotal] = useState(0)
   const [cartSize, setCartSize] = useState(0)
   const { store } = useStore()
   const [cart, setCart] = useState<IProduct[]>([])
   const route = useRouter()

   const prevCartRef = useRef<IProduct[]>()
   const cartPreviousValue = prevCartRef.current ?? cart

   useEffect(() => {
      if (store) {
         const storageCart = getCookie(
            `@Cart_${store?.name?.replace(/ /g, '_')}`
         )
         const storage: IProduct[] | null = storageCart
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
   const addProduct = async ({ id, quantity }: IAddProduct) => {
      try {
         //Criando um novo array para manipular o cart
         const updatedCart = [...cart]

         const response = await api
            .get('/product/info_product/' + id)
            .then(({ data }) => {
               return data
            })

         if (response === null) throw Error()

         //percorrer quantidade de produtos no carrinho e criar um objeto para cada produto
         for (let i = 0; i < quantity; i++) {
            updatedCart.push({
               ...response,
               id: Math.random(),
               product_id: id,
            })
         }

         toast.success(`${response.name} adicionado ao carrinho`, {
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

   // Função para atualizar a quantidade de um produto no carrinho
   const updateProductAmount = async ({ id, quantity }: IAddProduct) => {
      try {
         //Se a quantidade recebida for 0 ou menos finaliza direto
         if (quantity <= 0) {
            return
         }

         const updatedCart = [...cart]
         const productExists = updatedCart.find(
            (product) => product.product_id === id
         )
         if (productExists) {
            updatedCart.push({
               id: Math.random(),
               product_id: id,
               price: productExists.price,
               image: productExists.image,
               name: productExists.name,
            })

            setCart(updatedCart)
            return
         } else {
            throw Error()
         }
      } catch {
         toast.error('Erro na alteração de quantidade do produto')
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
            updateProductAmount,
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
