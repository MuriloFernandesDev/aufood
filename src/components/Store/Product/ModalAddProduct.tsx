import { useCart } from '@hooks/useCart'
import Lanche from '@images/LancheWpp.jpg'
import { ProductList } from '@types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ModalProps {
   openModal: boolean
   setOpenModal: (value: boolean) => void
   product: ProductList
}

const ModalAddProduct = ({ openModal, setOpenModal, product }: ModalProps) => {
   const { name, price, description } = product

   const modalRef = useRef<HTMLDivElement>(null)
   const [qtdProduct, setQtdProduct] = useState(1)
   const { addProduct } = useCart()

   const handleClickOutside = (event: MouseEvent) => {
      if (
         modalRef.current &&
         !modalRef.current.contains(event.target as Node)
      ) {
         setOpenModal(false)
      }
   }

   const handleModal = () => {
      setOpenModal(!openModal)
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

   const handleAddProduct = () => {
      addProduct({ ...product, quantity: qtdProduct })
      setOpenModal(false)
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <div
         className={`modal modal-bottom sm:modal-middle ${
            openModal ? ' modal-open' : ''
         }`}
      >
         <div
            className="modal-box bg-base-100 p-4 min-h-[50%] flex flex-col justify-between"
            ref={modalRef}
         >
            <button
               onClick={handleModal}
               className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
               ✕
            </button>
            <h3 className="font-bold text-lg text-center">{name}</h3>
            <div className="flex items-center my-4 gap-4">
               <div className="relative w-[50%]">
                  <Image src={Lanche} layout="responsive" />
               </div>
               <div className="flex flex-col items-start gap-5 overflow-y-auto max-h-[300px]">
                  <h2>{description}</h2>
                  <span>R$ {price}</span>
               </div>
            </div>
            <div className="flex justify-between items-center mt-4">
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
               <button className="btn btn-primary" onClick={handleAddProduct}>
                  R${price * qtdProduct} - Adicionar
               </button>
            </div>
         </div>
      </div>
   )
}

export default ModalAddProduct
