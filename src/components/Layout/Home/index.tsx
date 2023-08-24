import dynamic from 'next/dynamic'
import { useState } from 'react'
import Footer from './Footer'
import { NavBar } from './NavBar'
// import CartDrawer from '../Drawer/CartDrawer'
const CartDrawer = dynamic(() => import('@components/Drawer/CartDrawer'), {
   ssr: false,
})

interface LayoutHomeProps {
   children: React.ReactNode
}

const LayoutHome = ({ children }: LayoutHomeProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const handleCartDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   return (
      <div className="bg-base-100-home">
         <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         <NavBar changeCartDrawer={handleCartDrawer} />
         {children}
         <Footer />
      </div>
   )
}

export default LayoutHome
