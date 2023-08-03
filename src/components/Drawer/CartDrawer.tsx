import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Divider } from 'react-daisyui'
import { GrFormClose } from 'react-icons/gr'
import Drawer from 'react-modern-drawer'

interface CartDrawerProps {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
   //verifica se o dispositivo é mobile
   const [isMobile, setIsMobile] = useState(false)

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
         className={`${isMobile ? 'rounded-t-3xl' : 'mt-20'} bg-base-100 p-2`}
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
            </div>
         </>
      </Drawer>
   )
}

export default CartDrawer
