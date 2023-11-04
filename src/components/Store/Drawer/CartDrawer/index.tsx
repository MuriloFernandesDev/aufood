import ModalOpen from '@components/Modal/ModalOpen'
import ItemCart from '@components/Store/cart/itemCart'
import InputCode from '@components/forms/InputCode'
import InputComponent from '@components/forms/input'
import { useCart } from '@hooks/useCart'
import { useStore } from '@hooks/useStore'
import { api } from '@services/api'
import { EventTarget, ICart, IConsumer, IConsumerAddress } from '@types'
import { campoInvalido, formatPrice } from '@utils'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Badge, Button, Divider, Form } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import { GrFormClose } from 'react-icons/gr'
import { IoTicketOutline } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Drawer from 'react-modern-drawer'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ChooseAddress from './components/ChooseAddress'
import DeliveryMethod from './components/DeliveryMethod'
import PaymentComponent from './components/payment'
import PaymentGroupComponent from './components/paymentGroup'
import TitleCartDrawer from './components/titleCartDrawer'

interface CartDrawerProps {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

const RequiredConsumerAddressFields = [
   { nome: 'cep' },
   { nome: 'address' },
   { nome: 'number' },
]

const RequiredConsumerFields = [{ nome: 'name' }, { nome: 'phone' }]

const RequiredCartFields = [{ nome: 'deliveryMethod' }]

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
   const [isMobile, setIsMobile] = useState(false)
   const [modalCode, setModalCode] = useState(false)
   const [code, setCode] = useState(['', '', '', ''])

   const [paymentMethod, setPaymentMethod] = useState('')
   const [tap, setTap] = useState(1)

   const [consumer, setConsumer] = useState<IConsumer>({} as IConsumer)
   const [consumerAddress, setConsumerAddress] = useState<IConsumerAddress>(
      {} as IConsumerAddress
   )
   const [cart, setCart] = useState<ICart>({} as ICart)

   const { cart: CartHook, somaTotal } = useCart()
   const { store } = useStore()
   const MySwal = withReactContent(Swal)
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
         setTap(value - 1)
         return
      }

      if (CartHook && CartHook.length <= 0) {
         toast.warn('Seu carrinho está vazio')
         return
      }

      if (value === 1) {
         setTap(2)
      } else if (value === 2) {
         if (!consumer.phone) {
            toast.warn('Preencha o telefone')
            return
         } else {
            api.get(`/consumer/get_consumer_by_phone/${consumer.phone}`)
               .then((res) => {
                  const { data: data_consumer } = res
                  //abrir um modal para o usuario escolher se ele ja tem cadastro ou nao, mostrar os dados dele
                  MySwal.fire({
                     title: 'Encontramos um cadastro com o telefone informado!',
                     html: `<div class="flex items-center justify-center w-full gap-3">
                     <ul>
                        <li>Nome: ${res.data.name}</li>
                        <li>Telefone: ${res.data.phone}</li>
                        <li>E-mail: ${res.data.email}</li>
                     </ul>
                  </div>
                  <div class="mt-3 font-bold text-xl">
                     <p>Deseja reutilizar os dados?</p>
                  </div>
                  `,
                     icon: 'info',
                     showCancelButton: true,
                     confirmButtonText: 'Sim',
                     cancelButtonText: 'Não',
                     confirmButtonColor: '#3085d6',
                     cancelButtonColor: '#d33',
                  }).then((result) => {
                     if (result.isConfirmed) {
                        api.post(
                           `/consumer/confirm_consumer/${data_consumer.id}`
                        )
                           .then((res) => {
                              if (res.data == true) {
                                 setModalCode(true)
                                 setConsumer(data_consumer)
                              }
                           })
                           .catch(() => {
                              toast.error(
                                 'Ocorreu um erro ao enviar o código de confirmação'
                              )
                           })
                        // setTap(3)
                     } else {
                        setTap(3)
                     }
                  })
               })
               .catch(() => {
                  setTap(3)
               })
         }
      } else if (value === 22) {
         if (!cart.deliveryMethod) {
            setError('deliveryMethod', {
               type: 'manual',
            })

            toast.warn('Selecione um método de entrega')
         } else if (!consumerAddress.id) {
            toast.warn('Selecione um endereço pré-salvo ou crie um novo')
         } else {
            setTap(4)
         }
      } else if (value === 3) {
         let vCamposOK = true

         if (!consumerAddress.id)
            RequiredConsumerAddressFields.forEach((campo) => {
               if (campoInvalido(consumerAddress, null, campo.nome)) {
                  vCamposOK = false
                  setError(campo.nome, {
                     type: 'manual',
                  })
               }
            })

         RequiredCartFields.forEach((campo) => {
            if (campoInvalido(cart, null, campo.nome)) {
               vCamposOK = false
               setError(campo.nome, {
                  type: 'manual',
               })
            }
         })

         RequiredConsumerFields.forEach((campo) => {
            if (campoInvalido(consumer, null, campo.nome)) {
               vCamposOK = false
               setError(campo.nome, {
                  type: 'manual',
               })
            }
         })

         if (vCamposOK) {
            setTap(4)
         } else {
            toast.error('Preencha os campos obrigatórios')
         }
      } else {
         if (cart.paymentMethod) {
            MySwal.fire({
               title: 'Estamos processando o seu pedido!',
               html: "<p style='color: var(--color-primary)'>Geralmente não demora muito</p>",
               allowOutsideClick: false,
               didOpen: async () => {
                  Swal.showLoading()

                  try {
                     await api.post('/cart', {
                        cart,
                        consumer,
                        consumerAddress,
                        storeId: store.id,
                        products: CartHook.map((item) => {
                           const product = []

                           for (let i = 0; i < item.quantity; i++) {
                              product.push({ id: item.id })
                           }

                           return product
                        }).flat(),
                     })

                     MySwal.fire({
                        icon: 'success',
                        title: 'Tudo certo!',
                        text: 'Preparamos uma mensagem para confirmar o pedido, iremos te redirecionar para o WhatsApp para você encaminha-la.',
                     })
                  } catch {
                     MySwal.fire({
                        icon: 'error',
                        title: 'Ops...',
                        text: 'Algo deu errado!',
                     })
                  } finally {
                     MySwal.hideLoading()
                  }
               },
            })
         } else {
            toast.warn('Selecione uma forma de pagamento', {
               autoClose: 1500,
            })
         }
      }
   }

   const confirmCode = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const codeConfirm = code.join('')
      api.post(`/consumer/confirm_consumer_code/${consumer?.id}/${codeConfirm}`)
         .then((res) => {
            if (res.data) {
               setConsumer(res.data)

               setTap(22)
               setModalCode(false)
               setCode(['', '', '', ''])
            } else {
               toast.error('Código inválido')
            }
         })
         .catch(() => {
            toast.error('Código inválido')
         })
   }

   const cancelConfirmCode = () => {
      setModalCode(false)
      setCode(['', '', '', ''])
   }

   let title =
      tap === 0
         ? 'Acompanhar meu pedido'
         : tap === 1
         ? 'Informaçoes de envio'
         : 'Informacoes de pagamento'

   const handlePersonalInfo = (e: EventTarget) => {
      const { name, value } = e.target
      setConsumer((prevState) => {
         return {
            ...prevState,
            [name]: value,
         }
      })
   }

   const handleCart = (e: EventTarget) => {
      const { name, value } = e.target
      setCart((prevState) => {
         return {
            ...prevState,
            [name]: value,
         }
      })
   }

   const handleChangeConsumerAddress = (e: EventTarget) => {
      const { name, value } = e.target
      setConsumerAddress((prevState) => {
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
      if (CartHook.length === 0 && isOpen) {
         setIsOpen(false)
      }
   }, [CartHook])

   return (
      <>
         <ModalOpen open={modalCode} setToggleModal={cancelConfirmCode}>
            <Form onSubmit={confirmCode} className="text-center">
               <h2 className="font-semibold text-lg">
                  Enviamos um código de confirmação para o número informado
               </h2>

               <div className="my-4">
                  <span className="text-sm text-gray-500 mb-1">
                     Digite o código abaixo para confirmar sua identidade
                  </span>
                  <InputCode code={code} setCode={setCode} />
               </div>

               <Button type="submit" className="mt-4 w-full" color="primary">
                  <span>Confirmar</span>
               </Button>
               <Button
                  type="button"
                  onClick={cancelConfirmCode}
                  className="mt-4 btn-error btn-outline w-full"
                  color="info"
               >
                  <span>Continuar sem confirmar</span>
               </Button>
            </Form>
         </ModalOpen>

         <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            overlayOpacity={0.2}
            direction={isMobile ? 'bottom' : 'right'}
            className={`${
               isMobile ? 'rounded-t-3xl' : 'mt-[100px]'
            } bg-base-100 p-3 px-4 md:max-h-[92vh] max-h-auto pt-10 flex flex-col justify-between`}
            size={isMobile ? '100vh' : '40vw'}
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

                  {tap === 1 ? (
                     <div className="max-h-[65vh] overflow-y-auto">
                        <div className="flex flex-col gap-4">
                           {CartHook &&
                              CartHook.map((item) => (
                                 <ItemCart
                                    key={item.id}
                                    price={item.price}
                                    id={item.id}
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
                  ) : tap === 2 ? (
                     <InputComponent
                        name="phone"
                        handleChange={handlePersonalInfo}
                        value={consumer?.phone ?? ''}
                        label="Telefone*"
                        placeholder="Ex: (18) 99999-9999"
                        invalid={campoInvalido(consumer, errors, 'phone')}
                     />
                  ) : tap === 22 ? (
                     <div className="flex flex-col gap-3">
                        <DeliveryMethod
                           errors={errors}
                           handleCart={handleCart}
                           personalInfo={cart}
                        />
                        <ChooseAddress
                           address={consumer.consumerAddress!}
                           setConsumerAddress={setConsumerAddress}
                           setTap={setTap}
                           consumerAddress={consumerAddress}
                        />
                     </div>
                  ) : tap === 3 ? (
                     <div className="max-h-[55vh] overflow-y-auto flex flex-col gap-4 p-2">
                        <DeliveryMethod
                           errors={errors}
                           handleCart={handleCart}
                           personalInfo={cart}
                        />

                        <InputComponent
                           name="name"
                           handleChange={handlePersonalInfo}
                           value={consumer?.name ?? ''}
                           label="Nome"
                           placeholder="Ex: João da Silva"
                           invalid={campoInvalido(consumer, errors, 'name')}
                        />
                        <InputComponent
                           name="zipCode"
                           handleChange={handleChangeConsumerAddress}
                           value={consumerAddress?.zipCode ?? ''}
                           label="CEP"
                           placeholder="Ex: 16000-000"
                           invalid={campoInvalido(
                              consumerAddress,
                              errors,
                              'zipCode'
                           )}
                        />
                        <InputComponent
                           name="street"
                           handleChange={handleChangeConsumerAddress}
                           value={consumerAddress?.street ?? ''}
                           label="Endereço"
                           placeholder="Ex: Rua nove"
                           invalid={campoInvalido(
                              consumerAddress,
                              errors,
                              'street'
                           )}
                        />
                        <InputComponent
                           name="number"
                           handleChange={handleChangeConsumerAddress}
                           value={consumerAddress?.number ?? ''}
                           label="Número"
                           placeholder="Ex: 200"
                           invalid={campoInvalido(
                              consumerAddress,
                              errors,
                              'number'
                           )}
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
                                 method={2}
                                 setCart={setCart}
                                 paymentMethod={cart.paymentMethod}
                              />
                           </PaymentGroupComponent>
                           <PaymentGroupComponent title="Cartao">
                              <PaymentComponent
                                 method={1}
                                 setCart={setCart}
                                 paymentMethod={cart.paymentMethod}
                              />
                              <PaymentComponent
                                 method={0}
                                 setCart={setCart}
                                 paymentMethod={cart.paymentMethod}
                              />
                              <PaymentComponent
                                 method={3}
                                 setCart={setCart}
                                 paymentMethod={cart.paymentMethod}
                              />
                              <PaymentComponent
                                 method={4}
                                 setCart={setCart}
                                 paymentMethod={cart.paymentMethod}
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
                  {tap !== 1 && (
                     <button
                        onClick={() => handleChangeTap(tap, true)}
                        className="btn btn-ghost bg-slate-400 text-white w-full"
                     >
                        Voltar
                     </button>
                  )}
                  <button
                     onClick={() => handleChangeTap(tap)}
                     className="btn btn-primary w-full"
                  >
                     Próximo
                  </button>
               </div>
            </>
         </Drawer>
      </>
   )
}

export default CartDrawer
