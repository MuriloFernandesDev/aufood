import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../hooks/useCart'

const ButtonCart = () => {
   const { cartSize } = useCart()

   return (
      <div className="fixed right-5 bottom-5 hidden md:block z-10">
         <Link href="/carrinho">
            <a className="btn btn-primary btn-circle btn-lg border-base-100 border-2 gap-1 animate-bounce">
               <FaShoppingCart size={20} />
               <span>{cartSize}</span>
            </a>
         </Link>
      </div>
   )
}

export default ButtonCart
