import FooterCart from '@components/cart/FooterCart'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Footer from './Footer'
import { NavBar } from './NavBar'
// import CartDrawer from '../Drawer/CartDrawer'
const CartDrawer = dynamic(() => import('@components/Drawer/CartDrawer'), {
   ssr: false,
})

interface LayoutProps {
   children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const handleCartDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   return (
      <>
         <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         <NavBar changeCartDrawer={handleCartDrawer} />
         <FooterCart changeCartDrawer={handleCartDrawer} />
         {children}
         <Footer />
      </>
   )
}

export default Layout
