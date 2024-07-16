import { useStore } from '@hooks/useStore'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import Footer from './Footer'
import { NavBar } from './NavBar'
const CartDrawer = dynamic(() => import('../Drawer/CartDrawer'), {
   ssr: false,
})

interface LayoutProps {
   children: React.ReactNode
}

const LayoutStore = ({ children }: LayoutProps) => {
   const [isOpen, setIsOpen] = useState(false)
   const [scroll, setScroll] = useState(0)

   const { store } = useStore()

   const handleCartDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   useEffect(() => {
      const handleScroll = () => {
         setScroll(window.scrollY)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return (
      <>
         <NavBar store={store} changeCartDrawer={handleCartDrawer} />

         <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         <button
            onClick={handleCartDrawer}
            className="fixed block md:hidden bottom-0 w-full z-50"
         >
            <div className="bg-primary text-base-100 text-center p-4 border-t-2 border-base-100">
               <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                  <BiShoppingBag /> Finalizar Pedido
               </h3>
            </div>
         </button>

         <section
            className={`px-[1.1rem] max-w-container pt-[70px] md:pt-[140px] mx-auto transition-all duration-300 md:opacity-100 ${
               scroll >= 270 ? 'opacity-0' : 'opacity-100'
            }`}
         >
            <div
               className="rounded-[4px] h-[100px] md:h-[250px] w-full text-[#f7f7f7] bg-cover bg-center bg-no-repeat"
               style={{
                  backgroundImage: `url(${store?.background_image})`,
               }}
            />
         </section>

         <div className="max-w-container px-4 mx-auto mb-10 lg:pt-0 z-20">
            {children}
         </div>

         <Footer store={store} />
      </>
   )
}

export default LayoutStore
