import Image from 'next/image'
import Link from 'next/link'
import { Button, Navbar } from 'react-daisyui'
import { AiOutlineMenu } from 'react-icons/ai'
import { config } from '../../../configs/config'

interface HeaderComponentHomeProps {
   itensHeader: {
      name: string
      link: string
   }[]
}

export const HeaderComponentHome = ({
   itensHeader,
}: HeaderComponentHomeProps) => {
   return (
      <Navbar className="bg-primary p-2 w-full shadow-md fixed top-0 z-50">
         <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
            <div className="flex gap-10 items-center">
               <Link href="/">
                  <div className="flex items-center gap-3 cursor-pointer">
                     <Image
                        src={config.logo}
                        width={100}
                        height={50}
                        layout="fixed"
                     />
                     <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-base-100">
                        {config.title}
                     </span>
                  </div>
               </Link>
               <div className="items-center bg-primary justify-between hidden w-full md:flex md:w-auto md:order-1">
                  <ul className="flex gap-5 font-medium p-4 bg-primary">
                     {itensHeader.map((item, i) => (
                        <li key={i}>
                           <a
                              href={item.link}
                              className="block py-2 pl-3 pr-4 text-white rounded bg-transparent"
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
                  {itensHeader.map((item) => (
                     <li>
                        <a
                           href={item.link}
                           className="block py-2 pl-3 pr-4 text-primary rounded bg-transparent"
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
            <Button className="btn bg-base-100 text-primary font-bold border-none hidden md:block">
               Registre-se e ganhe desconto
            </Button>
         </div>
      </Navbar>
   )
}
