import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Divider } from 'react-daisyui'
import { GrFormClose } from 'react-icons/gr'
import { IoTicketOutline } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Drawer from 'react-modern-drawer'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/Utils'
import ItemCart from '../cart/itemCart'

interface CartDrawerProps {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
   //verifica se o dispositivo é mobile
   const [isMobile, setIsMobile] = useState(false)
   const { cart, somaTotal } = useCart()

   //função para abrir e fechar o drawer
   const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   useEffect(() => {
      const handleResize = () => {
         const width = window.innerWidth
         if (width <= 640) {
            setIsMobile(true)
         } else {
            setIsMobile(false)
         }
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   return (
      <Drawer
         open={isOpen}
         onClose={toggleDrawer}
         overlayOpacity={0.2}
         direction={isMobile ? 'bottom' : 'right'}
         className={`${
            isMobile ? 'rounded-t-3xl' : 'mt-[8vh]'
         } bg-base-100 p-2 max-h-[92vh]`}
         size={isMobile ? 450 : '40vw'}
      >
         <>
            <GrFormClose
               size={30}
               className="cursor-pointer"
               onClick={toggleDrawer}
            />
            <div className="px-2">
               <h3>Acompanhar meu pedido</h3>

               <span>Mcdonald's - Araçatuba Drive (vsa)</span>
               <Divider />

               <div className="flex flex-col gap-4">
                  {cart &&
                     cart.map((item) => (
                        <ItemCart
                           key={item.product_id}
                           price={item.price}
                           id={item.product_id}
                           name={item.name}
                           description="2x Duplo Burger com Queijo,2x McFritas Media,2x Coca-Cola Original 400ml,2x Não quero levar"
                        />
                     ))}
               </div>

               <div className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                     <IoTicketOutline size={40} />
                     <div className="flex flex-col">
                        <span>Cupom</span>
                        <span>Código do cupom</span>
                     </div>
                  </div>
                  <MdKeyboardArrowRight size={30} />
               </div>
               <Divider />

               <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <span>Subtotal</span>
                     <span>R$ 50,00</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span>Taxa de entrega</span>
                     <span>R$ 5,00</span>
                  </div>
               </div>

               <div className="flex flex-col gap-2 absolute w-[95%] bottom-0 mb-3">
                  <div className="flex justify-between items-center">
                     <span>Total</span>
                     <span>{formatPrice(somaTotal)}</span>
                  </div>
                  <button className="btn btn-primary w-full">
                     Escolher como pagar
                  </button>
               </div>
            </div>
         </>
      </Drawer>
   )
}

export default CartDrawer
