import { ProductList } from '@types'
import { Fragment, useState } from 'react'
import { Badge } from 'react-daisyui'
import { FaHamburger } from 'react-icons/fa'
import { FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'
import ModalAddProduct from './ModalAddProduct'

const ProductCard = (props: ProductList) => {
   const [openModal, setOpenModal] = useState(false)
   const { name, price, image, category } = props

   return (
      <Fragment>
         <div
            onClick={() =>
               price > 0
                  ? setOpenModal(true)
                  : toast.warn('Produto indisponivel')
            }
            className="card w-full bg-primary text-base-100 shadow-lg md:hover:scale-105 transition-all duration-300 cursor-pointer"
         >
            <picture className="relative">
               <img src={image} width={200} className="mx-auto py-3" />
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
               </div>
            </div>
         </div>

         <ModalAddProduct
            openModal={openModal}
            product={props}
            setOpenModal={setOpenModal}
         />
      </Fragment>
   )
}

export default ProductCard
