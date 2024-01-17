import { useCart } from '@hooks/useCart'
import { useStore } from '@hooks/useStore'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import Footer from './Footer'
import { NavBar } from './NavBar'
// import CartDrawer from '../Drawer/CartDrawer'
const CartDrawer = dynamic(() => import('../Drawer/CartDrawer'), {
   ssr: false,
})

interface LayoutProps {
   children: React.ReactNode
}

const LayoutStore = ({ children }: LayoutProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const { store } = useStore()
   const { somaTotal } = useCart()

   const handleCartDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   return (
      <>
         <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         <NavBar store={store} changeCartDrawer={handleCartDrawer} />
         <button
            onClick={handleCartDrawer}
            className="fixed block md:hidden bottom-0 w-full z-50"
         >
            <div className="bg-primary text-base-100 border-base-100 border-t-[1px] w-full p-4">
               <div className="flex justify-between items-center">
                  <BiShoppingBag size={30} className="icon-base-100" />
                  <h2>Ver carrinho</h2>
                  <h2>{somaTotal}</h2>
               </div>
            </div>
         </button>
         {children}
         <Footer store={store} />
      </>
   )
}

export default LayoutStore
