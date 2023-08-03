import { useState } from 'react'
import CartDrawer from '../Drawer/CartDrawer'
import FooterCart from '../cart/FooterCart'
import Footer from './Footer'
import { NavBar } from './NavBar'

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
         <FooterCart />
         {children}
         <Footer />
      </>
   )
}

export default Layout
