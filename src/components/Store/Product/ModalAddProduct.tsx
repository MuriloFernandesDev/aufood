import { useCart } from '@hooks/useCart'
import Lanche from '@images/LancheWpp.jpg'
import { ProductList } from '@pages/[loja_nome]'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ModalProps {
   openModal: boolean
   setOpenModal: (value: boolean) => void
   propsProduct: ProductList
}

const ModalAddProduct = ({
   openModal,
   setOpenModal,
   propsProduct,
}: ModalProps) => {
   const { name, price, id, image } = propsProduct

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
      addProduct(id, 100, image, name, qtdProduct)
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
               <button className="btn btn-primary" onClick={handleAddProduct}>
                  R${price * qtdProduct} - Adicionar
               </button>
            </div>
         </div>
      </div>
   )
}

export default ModalAddProduct
