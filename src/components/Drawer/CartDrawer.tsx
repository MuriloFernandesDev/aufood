import {
   ChangeEvent,
   Dispatch,
   SetStateAction,
   useEffect,
   useState,
} from 'react'
import { Divider } from 'react-daisyui'
import { GrFormClose } from 'react-icons/gr'
import { IoTicketOutline } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Drawer from 'react-modern-drawer'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/Utils'
import ItemCart from '../cart/itemCart'
import InputComponent from '../forms/input'
import TitleCartDrawer from './titleCartDrawer'

interface CartDrawerProps {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface PersonalInfoProps {
   name?: string
   phone?: string
   email?: string
   cep?: string
   address?: string
   number?: number
   complement?: string
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
   //verifica se o dispositivo é mobile
   const [isMobile, setIsMobile] = useState(false)
   const { cart, somaTotal } = useCart()
   const [tap, setTap] = useState(0)
   const [personalInfo, setPersonalInfo] = useState<PersonalInfoProps | null>(
      null
   )

   //função para abrir e fechar o drawer
   const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   const handlePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setPersonalInfo((prevState) => {
         return {
            ...prevState,
            [name]: value,
         }
      })
   }

   useEffect(() => {
      const handleResize = () => {
         const width = window.innerWidth
         if (width <= 640) {
            setIsMobile(true)
         } else {
            setIsMobile(false)
         }
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   const handleChangeTap = (value: number) => {
      setTap(value)
   }

   let title =
      tap === 0
         ? 'Acompanhar meu pedido'
         : tap === 1
         ? 'Informaçoes de envio'
         : 'Informacoes de pagamento'

   return (
      <Drawer
         open={isOpen}
         onClose={toggleDrawer}
         overlayOpacity={0.2}
         direction={isMobile ? 'bottom' : 'right'}
         className={`${
            isMobile ? 'rounded-t-3xl' : 'mt-[8vh]'
         } bg-base-100 p-3 px-4 max-h-[92vh] pt-10`}
         size={isMobile ? '92vh' : '40vw'}
      >
         <>
            <GrFormClose
               size={30}
               className="cursor-pointer absolute top-1 left-3"
               onClick={toggleDrawer}
            />
            <TitleCartDrawer
               title={title}
               localName="Mcdonald's - Araçatuba Drive (vsa)"
            />
            <Divider />
            {tap === 0 ? (
               <div className="max-h-[65vh] overflow-y-auto">
                  <div className="flex flex-col gap-4">
                     {cart &&
                        cart.map((item) => (
                           <ItemCart
                              key={item.product_id}
                              price={item.price}
                              id={item.product_id}
                              name={item.name}
                              description="2x Duplo Burger com Queijo,2x McFritas Media,2x Coca-Cola Original 400ml,2x Não quero levar"
                           />
                        ))}
                  </div>

                  <div className="flex justify-between items-center cursor-pointer">
                     <div className="flex items-center gap-2">
                        <IoTicketOutline size={40} />
                        <div className="flex flex-col">
                           <span>Cupom</span>
                           <span>Código do cupom</span>
                        </div>
                     </div>
                     <MdKeyboardArrowRight size={30} />
                  </div>
                  <Divider />

                  <div className="flex flex-col gap-3">
                     <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <span>R$ 50,00</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span>Taxa de entrega</span>
                        <span>R$ 5,00</span>
                     </div>
                  </div>
               </div>
            ) : tap === 1 ? (
               <div className="max-h-[65vh] overflow-y-auto flex flex-col gap-4">
                  <InputComponent
                     name="name"
                     handleChange={handlePersonalInfo}
                     value={personalInfo?.name ?? ''}
                     label="Nome"
                     placeholder="Ex: João da Silva"
                  />
                  <InputComponent
                     name="phone"
                     handleChange={handlePersonalInfo}
                     value={personalInfo?.phone ?? ''}
                     label="Telefone"
                     placeholder="Ex: (18) 99999-9999"
                  />
                  <InputComponent
                     name="cep"
                     handleChange={handlePersonalInfo}
                     value={personalInfo?.cep ?? ''}
                     label="CEP"
                     placeholder="Ex: 16000-000"
                  />
                  <InputComponent
                     name="address"
                     handleChange={handlePersonalInfo}
                     value={personalInfo?.address ?? ''}
                     label="Endereço"
                     placeholder="Ex: Rua nove"
                  />
                  <InputComponent
                     name="number"
                     handleChange={handlePersonalInfo}
                     value={personalInfo?.number ?? ''}
                     label="Número"
                     placeholder="Ex: 200"
                  />
               </div>
            ) : (
               <> </>
            )}
            <div className="flex flex-col gap-2 absolute w-[95%] bottom-0 mb-3">
               <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span>{formatPrice(somaTotal)}</span>
               </div>
               {tap !== 0 && (
                  <button
                     onClick={() => handleChangeTap(tap - 1)}
                     className="btn btn-ghost bg-slate-400 text-white w-full"
                  >
                     Voltar
                  </button>
               )}
               <button
                  onClick={() => handleChangeTap(tap + 1)}
                  className="btn btn-primary w-full"
               >
                  Próximo
               </button>
            </div>
         </>
      </Drawer>
   )
}

export default CartDrawer
