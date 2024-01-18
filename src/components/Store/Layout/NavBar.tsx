import { useCart } from '@hooks/useCart'
import { IStore } from '@types'
import { formatPrice } from '@utils'
import { Navbar } from 'react-daisyui'
import { HiOutlineShoppingBag } from 'react-icons/hi'

interface NavBarProps {
   changeCartDrawer: () => void
   store: IStore
}

export const NavBar = ({ changeCartDrawer, store }: NavBarProps) => {
   const { somaTotal } = useCart()

   return (
      <Navbar className="bg-primary w-full flex justify-center items-center fixed top-0 z-50 md:h-[100px] border-b-[1px] border-secondary/70">
         <div className="flex justify-between items-center w-full max-w-container px-4 mx-auto">
            <img src={store.logo} className="w-16 md:w-24" />

            <div className="hidden md:block">
               <button
                  className="btn bg-cart hover:bg-cart hover:opacity-80 rounded-full border-none gap-1 font-bold"
                  onClick={changeCartDrawer}
               >
                  <HiOutlineShoppingBag size={30} className="icon-base-100" />
                  <div className="flex flex-col items-start gap-1">
                     <span>{formatPrice(somaTotal)}</span>
                     <span>Finalizar pedido</span>
                  </div>
               </button>
            </div>
         </div>
      </Navbar>
   )
}
