import Footer from './Footer'
import { NavBar } from './NavBar'

interface LayoutHomeProps {
   children: React.ReactNode
   showCadastroNav?: boolean
}

const LayoutHome = ({ children, showCadastroNav }: LayoutHomeProps) => {
   return (
      <div className="bg-white">
         <NavBar showCadastroNav={showCadastroNav} />

         {children}
         <Footer />
      </div>
   )
}

export default LayoutHome
