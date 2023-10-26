import { IStore } from '@types'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import FooterCart from '../cart/FooterCart'
import Footer from './Footer'
import { NavBar } from './NavBar'
// import CartDrawer from '../Drawer/CartDrawer'
const CartDrawer = dynamic(() => import('../Drawer/CartDrawer'), {
   ssr: false,
})

interface LayoutProps {
   children: React.ReactNode
   store: IStore
}

const LayoutStore = ({ children, store }: LayoutProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const handleCartDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   return (
      <>
         <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         <NavBar store={store} changeCartDrawer={handleCartDrawer} />
         <FooterCart changeCartDrawer={handleCartDrawer} />
         {children}
         <Footer store={store} />
      </>
   )
}

export default LayoutStore
