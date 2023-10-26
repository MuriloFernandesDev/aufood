import { IStore } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Navbar } from 'react-daisyui'
import { AiOutlineMenu } from 'react-icons/ai'
import ButtonCart from '../cart/ButtonCart'

interface NavBarProps {
   changeCartDrawer: () => void
   store: IStore
}

export const NavBar = ({ changeCartDrawer, store }: NavBarProps) => {
   const navItens = [
      {
         name: 'Início',
         link: '#',
      },
      {
         name: 'Promoções',
         link: '#',
      },
      {
         name: 'Funcionamento',
         link: '#',
      },
      {
         name: 'Contato',
         link: '#',
      },
   ]

   return (
      <Navbar className="bg-primary w-full flex justify-center items-center fixed top-0 z-50 md:h-[100px] border-b-[1px] border-secondary/70">
         <div className="flex justify-between items-center w-full max-w-container px-4 mx-auto">
            <div className="flex gap-10 items-center">
               <Link href="/">
                  <div>
                     <Image
                        src={store.logo}
                        width={100}
                        height={40}
                        layout="fixed"
                     />
                  </div>
               </Link>
               <div className="items-center bg-primary justify-between hidden w-full md:flex md:w-auto md:order-1">
                  <ul className="flex gap-5 font-medium p-3 bg-primary">
                     {navItens.map((item, i) => (
                        <li key={i}>
                           <a
                              href={item.link}
                              className="block px-2 text-base-100 rounded bg-transparent"
                              aria-current="page"
                           >
                              {item.name}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="dropdown dropdown-end block md:hidden">
               <label tabIndex={0}>
                  <AiOutlineMenu size={20} className="text-base-100" />
               </label>
               <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {navItens.map((item) => (
                     <li>
                        <a
                           href={item.link}
                           className="block py-2 px-2 text-primary rounded bg-transparent"
                           aria-current="page"
                        >
                           {item.name}
                        </a>
                     </li>
                  ))}
                  <li>
                     <Button className="btn bg-primary text-base-100 font-bold border-none">
                        Registre-se e ganhe desconto
                     </Button>
                  </li>
               </ul>
            </div>
            <div className="hidden md:block">
               <ButtonCart changeCartDrawer={changeCartDrawer} />
            </div>
         </div>
      </Navbar>
   )
}
