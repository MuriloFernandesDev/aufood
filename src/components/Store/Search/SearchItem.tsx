import { ProductList } from '@pages/[loja_nome]'
import { useState } from 'react'
import ModalAddProduct from '../Product/ModalAddProduct'

interface SearchItemProps {
   props: ProductList
}

const SearchItem = ({ props }: SearchItemProps) => {
   const [openModal, setOpenModal] = useState(false)
   const { category, id, image, name, price, timeDelivery } = props

   return (
      <>
         <li
            onClick={() => setOpenModal(true)}
            className="pl-2 pr-2 py-1 relative cursor-pointer hover:bg-primary/30 hover:text-primary-content flex items-center gap-2"
         >
            <svg
               className="w-4 h-4"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
            >
               <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
               />
            </svg>
            <img width={60} src={image} className="rounded-md" />
            <b>{name}</b>
         </li>

         <ModalAddProduct
            openModal={openModal}
            propsProduct={{
               category,
               id,
               image,
               name,
               price,
               timeDelivery,
            }}
            setOpenModal={setOpenModal}
         />
      </>
   )
}

export default SearchItem
