import CartComponent from '../cart/ButtonCart'
import FooterCart from '../cart/FooterCart'
import Footer from './Footer'
import { NavBar } from './NavBar'

interface LayoutProps {
   children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
   return (
      <>
         <NavBar />
         <CartComponent />
         <FooterCart />
         {children}
         <Footer />
      </>
   )
}

export default Layout
