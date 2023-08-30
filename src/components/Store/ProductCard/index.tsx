import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaHamburger } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'
import Lanche from '../../../assets/images/LancheWpp.jpg'
import { useCart } from '../../../hooks/useCart'

interface ProductCardProps {
   name: string
   price: number
   id: number
   image?: string
   category: string
   timeDelivery: string
}

const ProductCard = ({
   name,
   price,
   id,
   image,
   category,
   timeDelivery,
}: ProductCardProps) => {
   const [openModal, setOpenModal] = useState(false)
   const [qtdProduct, setQtdProduct] = useState(1)
   const modalRef = useRef<HTMLDivElement>(null)
   const { addProduct } = useCart()

   const handleModal = () => {
      setOpenModal(!openModal)
   }

   const handleClickOutside = (event: MouseEvent) => {
      if (
         modalRef.current &&
         !modalRef.current.contains(event.target as Node)
      ) {
         setOpenModal(false)
      }
   }

   const handleAddProduct = () => {
      addProduct(id, 100, 'imagem.png', name, qtdProduct)
      setOpenModal(false)
   }

   const changeQtdProduct = (type: string) => {
      if (type === 'add') {
         setQtdProduct(qtdProduct + 1)
      } else {
         if (qtdProduct > 1) {
            setQtdProduct(qtdProduct - 1)
         }
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <>
         <div
            onClick={handleModal}
            className="card w-full bg-primary text-base-100 shadow-lg md:hover:scale-105 transition-all duration-300 cursor-pointer"
         >
            <picture className="relative">
               <Image src={Lanche} layout="responsive" />
               <span className="badge bg-base-100 text-primary absolute bottom-0 left-0 m-1 ml-5">
                  <FaHamburger size={15} className="mr-1" /> {category}
               </span>
            </picture>
            <div className="card-body p-5">
               <div className="flex flex-col gap-1">
                  <h3>{name}</h3>

                  <span className="font-semibold">R$ {price}</span>

                  <span className="flex items-center gap-1">
                     <FiClock /> {timeDelivery}
                  </span>
               </div>
            </div>
         </div>
         <div
            className={`modal modal-bottom sm:modal-middle ${
               openModal ? ' modal-open' : ''
            }`}
         >
            <div
               className="modal-box bg-base-100 pt-2 pr-0 min-h-[50%]"
               ref={modalRef}
            >
               <button
                  onClick={handleModal}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
               >
                  ✕
               </button>
               <h3 className="font-bold text-lg text-center">{name}</h3>
               <div className="flex justify-between items-center mt-4 gap-4">
                  <div className="relative w-[50%]">
                     <Image src={Lanche} layout="responsive" />
                  </div>
                  <div className="flex flex-col items-start gap-5 overflow-y-auto max-h-[300px]">
                     <h2>
                        1 frango crocante, salada fresca (alface) e maionese Bk.
                        Acompanha batata frita e bebida.
                     </h2>
                     <h3>Serve 1 pessoa</h3>
                     <span>R$ {price}</span>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-center">
                  <div className="btn-group btn-group-horizontal">
                     <button
                        className={`btn ${
                           qtdProduct == 1 ? 'btn-disabled' : 'btn-primary'
                        }`}
                        onClick={() => changeQtdProduct('decrement')}
                     >
                        -
                     </button>
                     <button className="btn btn-outline border-none hover:bg-transparent text-black">
                        {qtdProduct}
                     </button>
                     <button
                        className="btn btn-primary"
                        onClick={() => changeQtdProduct('add')}
                     >
                        +
                     </button>
                  </div>
                  <button
                     className="btn btn-primary"
                     onClick={handleAddProduct}
                  >
                     R${price * qtdProduct} - Adicionar
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default ProductCard
