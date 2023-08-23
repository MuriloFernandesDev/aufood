import Link from 'next/link'
import { Navbar } from 'react-daisyui'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoLocationOutline } from 'react-icons/io5'

interface NavBarProps {
   changeCartDrawer: () => void
}

export const NavBar = ({ changeCartDrawer }: NavBarProps) => {
   const navItens = [
      {
         name: 'Início',
         link: '#',
      },
      {
         name: 'Restaurantes',
         link: '#',
      },
      {
         name: 'Frete Grátis',
         link: '#',
      },
      {
         name: 'Promoções',
         link: '#',
      },
   ]

   return (
      <Navbar className="text-black w-full bg-white flex justify-center items-center fixed top-0 z-50 md:h-[100px] border-b-[1px] border-secondary/70">
         <div className="flex justify-between items-center w-full max-w-container px-4 py-2 bg-white mx-auto">
            <div className="flex gap-10 items-center">
               <Link href="/">
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IFood_logo.svg/1200px-IFood_logo.svg.png"
                     width={80}
                     height={30}
                  />
               </Link>
               <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                  <ul className="flex gap-5 font-medium p-3">
                     {navItens.map((item, i) => (
                        <li key={i}>
                           <a
                              href={item.link}
                              className="block px-2 rounded bg-transparent text-black"
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
                  <AiOutlineMenu size={20} />
               </label>
               <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {navItens.map((item) => (
                     <li>
                        <a
                           href={item.link}
                           className="block py-2 px-2 rounded bg-transparent"
                           aria-current="page"
                        >
                           {item.name}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="hidden md:block">
               <div className="flex items-center gap-1">
                  <IoLocationOutline /> <h3>Rua Gilberto Trivelato, 502</h3>
               </div>
            </div>
         </div>
      </Navbar>
   )
}
