import {
   ChangeEvent,
   Dispatch,
   SetStateAction,
   useEffect,
   useState,
} from 'react'
import { Badge, Divider } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import { GrFormClose } from 'react-icons/gr'
import { IoTicketOutline } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Drawer from 'react-modern-drawer'
import { toast } from 'react-toastify'
import { useCart } from '../../hooks/useCart'
import { campoInvalido, formatPrice } from '../../utils/Utils'
import ItemCart from '../cart/itemCart'
import InputComponent from '../forms/input'
import PaymentComponent from './payment'
import PaymentGroupComponent from './paymentGroup'
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

const personalInfoDefault = {
   name: undefined,
   phone: undefined,
   email: undefined,
   cep: undefined,
   address: undefined,
   number: undefined,
   complement: undefined,
}

const campos_obrigatorios_personal_info = [
   { nome: 'name' },
   { nome: 'cep' },
   { nome: 'address' },
   { nome: 'number' },
   { nome: 'phone' },
]

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
   //verifica se o dispositivo é mobile
   const [isMobile, setIsMobile] = useState(false)
   const { cart, somaTotal } = useCart()
   const [tap, setTap] = useState(0)
   const [personalInfo, setPersonalInfo] =
      useState<PersonalInfoProps>(personalInfoDefault)
   const [methodPayment, setMethodPayment] = useState('')

   const {
      setError,
      formState: { errors },
   } = useForm()

   //função para abrir e fechar o drawer
   const toggleDrawer = async () => {
      setIsOpen((prevState) => !prevState)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTap(0)
   }

   const handleChangeTap = (value: number, back?: boolean) => {
      if (back) {
         setTap(value)
         return
      }

      if (value === 1) {
         if (cart && cart.length > 0) {
            setTap(value)
         }
      } else if (value === 2) {
         let vCamposOK = true
         campos_obrigatorios_personal_info.forEach((campo) => {
            if (campoInvalido(personalInfo, null, campo.nome)) {
               vCamposOK = false
               setError(campo.nome, {
                  type: 'manual',
               })
            }
         })

         if (vCamposOK) {
            setTap(value)
         } else {
            toast.error('Preencha os campos obrigatórios')
         }
      } else {
         if (methodPayment) {
            setTap(value)
         } else {
            toast.warn('Selecione uma forma de pagamento', {
               autoClose: 1500,
            })
         }
      }
   }

   let title =
      tap === 0
         ? 'Acompanhar meu pedido'
         : tap === 1
         ? 'Informaçoes de envio'
         : 'Informacoes de pagamento'

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

   useEffect(() => {
      if (cart.length === 0 && isOpen) {
         setIsOpen(false)
      }
   }, [cart])

   return (
      <Drawer
         open={isOpen}
         onClose={toggleDrawer}
         overlayOpacity={0.2}
         direction={isMobile ? 'bottom' : 'right'}
         className={`${
            isMobile ? 'rounded-t-3xl' : 'mt-[8vh]'
         } bg-base-100 p-3 px-4 max-h-[92vh] pt-10 flex flex-col justify-between`}
         size={isMobile ? '80vh' : '40vw'}
      >
         <>
            <div className="pb-4">
               <GrFormClose
                  size={30}
                  className="cursor-pointer absolute top-1 left-3"
                  onClick={toggleDrawer}
               />
               <TitleCartDrawer
                  title={title}
                  localName="Mcdonald's - Araçatuba Drive (vsa)"
               />
               <Divider className="p-0 m-1" />

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
                  <div className="max-h-[55vh] overflow-y-auto flex flex-col gap-4 p-2">
                     <InputComponent
                        name="name"
                        handleChange={handlePersonalInfo}
                        value={personalInfo?.name ?? ''}
                        label="Nome"
                        placeholder="Ex: João da Silva"
                        invalid={campoInvalido(personalInfo, errors, 'name')}
                     />
                     <InputComponent
                        name="phone"
                        handleChange={handlePersonalInfo}
                        value={personalInfo?.phone ?? ''}
                        label="Telefone"
                        placeholder="Ex: (18) 99999-9999"
                        invalid={campoInvalido(personalInfo, errors, 'phone')}
                     />
                     <InputComponent
                        name="cep"
                        handleChange={handlePersonalInfo}
                        value={personalInfo?.cep ?? ''}
                        label="CEP"
                        placeholder="Ex: 16000-000"
                        invalid={campoInvalido(personalInfo, errors, 'cep')}
                     />
                     <InputComponent
                        name="address"
                        handleChange={handlePersonalInfo}
                        value={personalInfo?.address ?? ''}
                        label="Endereço"
                        placeholder="Ex: Rua nove"
                        invalid={campoInvalido(personalInfo, errors, 'address')}
                     />
                     <InputComponent
                        name="number"
                        handleChange={handlePersonalInfo}
                        value={personalInfo?.number ?? ''}
                        label="Número"
                        placeholder="Ex: 200"
                        invalid={campoInvalido(personalInfo, errors, 'number')}
                     />
                  </div>
               ) : (
                  <div className="max-h-[55vh] overflow-y-auto">
                     <div className="tabs w-full">
                        <a
                           className={`tab tab-bordered hover:tab-active tab-active w-1/2`}
                        >
                           Pague na entrega ou retirada
                        </a>
                        <a className="tab tab-bordered w-1/2">
                           <span className="mr-1">Pague pelo app</span>{' '}
                           <Badge className="badge-warning text-white">
                              Em breve
                           </Badge>
                        </a>
                     </div>
                     <div className="flex flex-col gap-8 mt-5">
                        <PaymentGroupComponent title="Dinheiro">
                           <PaymentComponent
                              method="Dinheiro"
                              setMethodPayment={setMethodPayment}
                              methodPayment={methodPayment}
                           />
                        </PaymentGroupComponent>
                        <PaymentGroupComponent title="Cartao">
                           <PaymentComponent
                              method="Elo"
                              setMethodPayment={setMethodPayment}
                              methodPayment={methodPayment}
                           />
                           <PaymentComponent
                              method="Mastercard"
                              setMethodPayment={setMethodPayment}
                              methodPayment={methodPayment}
                           />
                        </PaymentGroupComponent>
                     </div>
                  </div>
               )}
            </div>

            <div className="flex flex-col gap-2 w-full bottom-0 mb-3 bg-base-100">
               <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span>{formatPrice(somaTotal)}</span>
               </div>
               {tap !== 0 && (
                  <button
                     onClick={() => handleChangeTap(tap - 1, true)}
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
