import { Divider } from 'react-daisyui'
import { GoTrash } from 'react-icons/go'
import { PiPencilSimpleLight } from 'react-icons/pi'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/Utils'

interface ItemCartProps {
   name: string
   price: number
   id: number
   description: string
}

const ItemCart = ({ name, price, id, description }: ItemCartProps) => {
   const { removeProduct } = useCart()
   return (
      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-center">
            <h2>{name}</h2>
            <span>{formatPrice(price)}</span>
         </div>
         <span>{description}</span>
         <div className="flex gap-2">
            <button className="flex gap-[2px] items-center">
               <PiPencilSimpleLight /> Alterar
            </button>
            <button
               onClick={() => removeProduct(id)}
               className="cursor-pointer flex gap-[2px] items-center text-red-800 font-bold opacity-50"
            >
               <GoTrash /> Remover
            </button>
         </div>
         <Divider />
      </div>
   )
}

export default ItemCart
