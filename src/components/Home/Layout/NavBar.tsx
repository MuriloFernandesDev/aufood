import { infoApp } from 'configs'
import Link from 'next/link'
import { Navbar } from 'react-daisyui'

interface props {
   showCadastroNav?: boolean
}

export const NavBar = ({ showCadastroNav }: props) => {
   return (
      <Navbar className="w-full bg-base-200 default-text fixed top-0 z-50 shadow-black/5 shadow-lg">
         <div className="flex justify-between items-center w-full max-w-container py-2 p-4 md:p-4 mx-auto">
            <Link href="/">
               <img src={infoApp.logo} alt={infoApp.name} width={80} />
            </Link>

            {showCadastroNav && (
               <Link href="/cadastro-restaurante">
                  <button className="btn-default text-sm">
                     Cadastrar restaurante
                  </button>
               </Link>
            )}
         </div>
      </Navbar>
   )
}
