import { Dispatch, SetStateAction } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ModalHeader } from 'reactstrap'

interface ModalOpenProps {
   open: boolean
   setToggleModal: () => void
   children: React.ReactNode
}

const ModalOpen = ({ open, setToggleModal, children }: ModalOpenProps) => {
   const toggleModal = () => {
      setToggleModal()
   }

   return (
      <>
         <div className={`modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box">
               <ModalHeader className="flex justify-end mb-3">
                  <AiOutlineClose
                     onClick={toggleModal}
                     size={20}
                     className="cursor-pointer"
                  />
               </ModalHeader>
               {children}
            </div>
         </div>
      </>
   )
}

export default ModalOpen
