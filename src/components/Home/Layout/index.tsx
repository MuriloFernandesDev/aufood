import Footer from './Footer'
import { NavBar } from './NavBar'

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
