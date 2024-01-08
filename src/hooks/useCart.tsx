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

interface UpdateProductAmount {
   id: number
   quantity: number
}

interface CartContextData {
   cart: IProduct[]
   addProduct: (
      id: number,
      price: number,
      image: string,
      title: string,
      quantity: number
   ) => Promise<void>
   removeProduct: (id: number) => void
   updateProductAmount: ({ id, quantity }: UpdateProductAmount) => void
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
            api.get(`/product/store/list_product_cart/${store.id}`, {
               params: {
                  list_id: storage.map((product) => product.id),
               },
            })
               .then((res) => {
                  const products = res.data
                  const updatedCart = storage.map((product) => {
                     const productFind = products.find(
                        (p: IProduct) => p.id === product.id
                     )
                     if (productFind) {
                        return {
                           ...productFind,
                           quantity: product.quantity,
                        }
                     } else {
                        return product
                     }
                  })

                  setCart(updatedCart)
               })
               .catch(() => {})
         }
      }
   }, [store, route.asPath])

   useEffect(() => {
      setCartSize(cart.length)
      const total = cart.reduce((sumTotal, product) => {
         return sumTotal + product.price * product.quantity
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
   const addProduct = async (
      id: number,
      price: number,
      image: string,
      name: string,
      quantity: number
   ) => {
      try {
         //Criando um novo array para manipular o cart
         const updatedCart = [...cart]

         // Verificando se ja existe o produto no carrinho
         const productExists = updatedCart.find((product) => product.id === id)

         //verificando se o produto existe no carrinho
         if (productExists) {
            //se existe atualiza a quantidade
            productExists.quantity = (productExists.quantity ?? 0) + quantity

            toast.success(`Mais ${quantity} ${name} adicionado ao carrinho`, {
               autoClose: 2000,
            })
         } else {
            //se nao, adiciona ao carrinho
            const newProduct = {
               id,
               price,
               image,
               name,
               quantity,
            }
            updatedCart.push(newProduct)

            toast.success(`${name} adicionado ao carrinho`, {
               autoClose: 2000,
            })
         }

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
   const updateProductAmount = async ({
      id,
      quantity,
   }: UpdateProductAmount) => {
      try {
         //Se a quantidade recebida for 0 ou menos finaliza direto
         if (quantity <= 0) {
            return
         }

         const updatedCart = [...cart]
         const productExists = updatedCart.find((product) => product.id === id)
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
