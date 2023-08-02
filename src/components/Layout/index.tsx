import CartComponent from '../cart'
import Footer from './Footer'
import { NavBar } from './NavBar'

interface LayoutProps {
   children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
   return (
      <>
         <CartComponent />
         <NavBar />
         {children}
         <Footer />
      </>
   )
}

export default Layout
