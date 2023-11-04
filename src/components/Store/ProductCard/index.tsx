import { ProductList } from '@pages/[loja_nome]'
import { useState } from 'react'
import { Badge } from 'react-daisyui'
import { FaHamburger } from 'react-icons/fa'
import { FiAlertCircle, FiClock } from 'react-icons/fi'
import { toast } from 'react-toastify'
import ModalAddProduct from '../Product/ModalAddProduct'

const ProductCard = ({
   name,
   price,
   id,
   image,
   category,
   timeDelivery,
}: ProductList) => {
   const [openModal, setOpenModal] = useState(false)

   return (
      <>
         <div
            onClick={() =>
               price > 0
                  ? setOpenModal(true)
                  : toast.warn('Produto indisponivel')
            }
            className="card w-full bg-primary text-base-100 shadow-lg md:hover:scale-105 transition-all duration-300 cursor-pointer"
         >
            <picture className="relative">
               <img
                  src={image}
                  className="min-h-[150px] max-h-[150px] w-full"
               />
               <Badge className="text-white border-none absolute bottom-0 left-0 m-1 p-3 ml-5 bg-red-600">
                  <FaHamburger size={15} className="mr-1" /> {category}
               </Badge>
            </picture>
            <div className="card-body p-3">
               <div className="flex flex-col gap-1">
                  <h3>{name}</h3>

                  <span className="font-semibold">
                     {price > 0 ? (
                        `R$ ${price}`
                     ) : (
                        <Badge color="warning" className="text-white badge">
                           <FiAlertCircle className="mr-1" /> Indisponivel
                        </Badge>
                     )}
                  </span>

                  <span className="flex items-center gap-1">
                     <FiClock /> {timeDelivery}
                  </span>
               </div>
            </div>
         </div>
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

export default ProductCard
