import { useCart } from '@hooks/useCart'
import { BiShoppingBag } from 'react-icons/bi'

interface FooterCartProps {
   changeCartDrawer: () => void
}

const FooterCart = ({ changeCartDrawer }: FooterCartProps) => {
   const { somaTotal, cartSize } = useCart()

   console.log(cartSize)

   if (cartSize > 0) {
      return (
         <button
            onClick={changeCartDrawer}
            className="fixed block md:hidden bottom-0 w-full z-50"
         >
            <div className="bg-primary text-base-100 border-base-100 border-t-[1px] w-full p-4">
               <div className="flex justify-between items-center">
                  <BiShoppingBag size={30} className="icon-base-100" />
                  <h2>Ver carrinho</h2>
                  <h2>{somaTotal}</h2>
               </div>
            </div>
         </button>
      )
   } else {
      return <></>
   }
}

export default FooterCart
