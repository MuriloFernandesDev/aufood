import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils'
import { HiOutlineShoppingBag } from 'react-icons/hi'

interface ButtonCartProps {
   changeCartDrawer: () => void
}

const ButtonCart = ({ changeCartDrawer }: ButtonCartProps) => {
   const { cartSize, somaTotal } = useCart()

   return (
      <button className="btn btn-my-cart gap-1" onClick={changeCartDrawer}>
         <span>
            <HiOutlineShoppingBag size={30} className="icon-base-100" />
         </span>
         <span className="flex flex-col items-start gap-1">
            <p>{formatPrice(somaTotal)}</p>
            <p>{`${cartSize} ite${cartSize === 1 ? 'm' : 'ns'}`}</p>
         </span>
      </button>
   )
}

export default ButtonCart
