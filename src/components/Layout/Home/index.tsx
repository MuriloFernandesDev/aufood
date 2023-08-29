import dynamic from 'next/dynamic'
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
   return (
      <div className="bg-base-100-home">
         <NavBar />
         {children}
         <Footer />
      </div>
   )
}

export default LayoutHome
