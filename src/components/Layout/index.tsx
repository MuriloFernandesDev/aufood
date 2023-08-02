import { Container } from 'reactstrap'
import CartComponent from '../cart/ButtonCart'
import FooterCart from '../cart/FooterCart'
import Footer from './Footer'
import { NavBar } from './NavBar'

interface LayoutProps {
   children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
   return (
      <Container className="relative">
         <CartComponent />
         <NavBar />
         {children}
         <Footer />
         <FooterCart />
      </Container>
   )
}

export default Layout
