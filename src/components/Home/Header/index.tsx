import Image from 'next/image'
import { Button, Navbar } from 'react-daisyui'
import logo from '../../../assets/images/logoTeste.png'

export const HeaderComponentHome = () => {
   return (
      <Navbar className="bg-primary p-2 w-full shadow-md fixed top-0 z-50">
         <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
            <div className="flex gap-10">
               <a
                  href="https://flowbite.com/"
                  className="flex items-center gap-2"
               >
                  <Image src={logo} width={50} height={50} />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-base-100">
                     ICARUS LANCHES
                  </span>
               </a>
               <div
                  className="items-center bg-primary justify-between hidden w-full md:flex md:w-auto md:order-1"
                  id="mobile-menu-2"
               >
                  <ul className="flex gap-5 font-medium p-4 bg-primary">
                     <li>
                        <a
                           href="#"
                           className="block py-2 pl-3 pr-4 text-white rounded bg-transparent"
                           aria-current="page"
                        >
                           Promoções
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="block py-2 pl-3 pr-4 text-white rounded bg-transparent"
                        >
                           Funcionamento
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="block py-2 pl-3 pr-4 text-white rounded bg-transparent"
                        >
                           Contato
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
            <Button className="btn bg-base-100 text-primary font-bold border-none">
               Registre-se e ganhe desconto
            </Button>
         </div>
      </Navbar>
   )
}
