import ModalOpen from '@components/Modal/ModalOpen'
import InputCode from '@components/forms/InputCode'
import InputComponent from '@components/forms/input'
import { useCart } from '@hooks/useCart'
import { useStore } from '@hooks/useStore'
import { api } from '@services/api'
import { EventTarget, IConsumer, IConsumerAddress, IOrder } from '@types'
import { campoInvalido, formatPrice } from '@utils'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { Badge, Button, Divider, Form } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import { GoTrash } from 'react-icons/go'
import { GrFormClose } from 'react-icons/gr'
import { MdHouse } from 'react-icons/md'
import Drawer from 'react-modern-drawer'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DeliveryMethod from './components/DeliveryMethod'
import PaymentComponent from './components/payment'

interface CartDrawerProps {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

const RequiredConsumerAddressFields = [
   { nome: 'zipCode' },
   { nome: 'street' },
   { nome: 'number' },
]

const RequiredConsumerFields = [{ nome: 'name' }, { nome: 'phone' }]

const requiredOrderFields = [{ nome: 'delivery_method' }]

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
   const { cart, somaTotal, ClearCart, removeProduct } = useCart()
   const { store } = useStore()

   const MySwal = withReactContent(Swal)
   const {
      setError,
      formState: { errors },
   } = useForm()

   //Verifica se o usuario esta em um dispositivo mobile
   const [isMobile, setIsMobile] = useState(false)

   //State para controlar o modal de codigo de confirmação
   const [modalCode, setModalCode] = useState(false)

   //State para controlar o código de confirmação
   const [code, setCode] = useState(['', '', '', ''])

   //State para controlar o tap do drawer
   const [tap, setTap] = useState(1)

   //States para controlar os dados do consumidor
   const [consumer, setConsumer] = useState<IConsumer>({} as IConsumer)
   const [consumerAddress, setConsumerAddress] = useState<IConsumerAddress>(
      {} as IConsumerAddress
   )
   const [order, setOrder] = useState<IOrder>({} as IOrder)

   //função para abrir e fechar o drawer
   const toggleDrawer = async () => {
      setIsOpen((prevState) => !prevState)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTap(1)
   }

   const handleChangeTap = (value: number, back?: boolean) => {
      if (back) {
         setTap(value - 1)
         return
      }

      if (cart && cart.length <= 0) {
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
                        ${
                           res.data.email
                              ? `<li>E-mail: ${res.data.email}</li>`
                              : ''
                        } 
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
         if (!order.delivery_method) {
            setError('delivery_method', {
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
                  console.log(campo)
                  vCamposOK = false
                  setError(campo.nome, {
                     type: 'manual',
                  })
               }
            })

         requiredOrderFields.forEach((campo) => {
            if (campoInvalido(order, null, campo.nome)) {
               vCamposOK = false

               console.log(campo)
               setError(campo.nome, {
                  type: 'manual',
               })
            }
         })

         RequiredConsumerFields.forEach((campo) => {
            if (campoInvalido(consumer, null, campo.nome)) {
               vCamposOK = false
               console.log(campo)
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
         if (order.payment_method) {
            MySwal.fire({
               title: 'Estamos processando o seu pedido!',
               html: "<p style='color: var(--color-primary)'>Geralmente não demora muito</p>",
               allowOutsideClick: false,
               didOpen: async () => {
                  Swal.showLoading()

                  api.post('/order', {
                     order,
                     consumer,
                     consumerAddress,
                     storeId: store.id,
                     products: cart.map((w) => {
                        return {
                           id: w.product_id,
                        }
                     }),
                  })
                     .then(({ data }) => {
                        // setTap(1)
                        // setOrder({} as IOrder)
                        // setConsumer({} as IConsumer)
                        // setConsumerAddress({} as IConsumerAddress)
                        // setModalCode(false)
                        // setCode(['', '', '', ''])
                        // ClearCart()
                        // setIsOpen(false)

                        MySwal.fire({
                           icon: 'success',
                           title: 'Tudo certo!',
                           text: 'Preparamos uma mensagem para confirmar o pedido, iremos te redirecionar para o WhatsApp para você encaminha-la.',
                           showConfirmButton: false,
                           timer: 1000,
                        }).then(() => {
                           //criar uma mensagem com os dados do pedido e enviar para o whatsapp formatado com os espaços e quebras de linha
                           const orderDetails = `\nMeu pedido #${data.id}
                           ${cart.map((item, index) => {
                              return `\n1x ${item.name} - ${formatPrice(
                                 item.price
                              )} \n${item?.observation ?? ''}`
                           })}
                           \nQuantidade de produtos: ${cart.length}
                           \nValor: ${formatPrice(somaTotal)}
                           \n------------------------------
                           \nNome: ${consumer.name}
                           \nCelular: ${consumer.phone}
                           \n------------------------------
                           \nFormas de Pagamento: ${
                              order.payment_method === 1
                                 ? 'Dinheiro'
                                 : order.payment_method === 2
                                 ? 'Cartão de Crédito'
                                 : order.payment_method === 3
                                 ? 'Cartão de Débito'
                                 : order.payment_method === 4
                                 ? 'Pix'
                                 : 'PicPay'
                           }
                           ${
                              order.delivery_method === 1
                                 ? `\nRetirada no local: ${
                                      store.street +
                                      ', ' +
                                      store.number_address +
                                      ', ' +
                                      store.city.name +
                                      ', ' +
                                      store.zip
                                   }`
                                 : '\nDelivery'
                           }
                           \n------------------------------
                           \nValor Total: R$ ${formatPrice(somaTotal)}
                           \nObrigado!
                        `

                           // Hora prevista para ${
                           //    order.delivery_method === 1 ? 'retirada' : 'entrega'
                           // }: 22:23

                           const encodedMessage =
                              encodeURIComponent(orderDetails)

                           const whatsappUrl = `https://api.whatsapp.com/send?phone=5518996344123&text=${encodedMessage}`

                           window.open(whatsappUrl, '_blank')
                        })
                     })
                     .catch(() => {
                        MySwal.fire({
                           icon: 'error',
                           title: 'Ops...',
                           text: 'Algo deu errado!',
                        })
                     })
                     .finally(() => {
                        MySwal.hideLoading()
                     })
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
      setOrder((prevState) => {
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
      if (cart.length === 0 && isOpen) {
         setIsOpen(false)
      }
   }, [cart])

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
               isMobile ? 'rounded-t-3xl' : ''
            } shadow-primary/30 shadow-xl bg-base-100 text-primary max-h-auto pt-10 flex flex-col justify-between`}
            size={isMobile ? '100vh' : '40vw'}
         >
            <>
               <div className="mb-4 px-4">
                  <GrFormClose
                     size={30}
                     className="cursor-pointer absolute top-1 left-3"
                     onClick={toggleDrawer}
                  />

                  <h3 className="text-xl font-semibold">
                     Informações do pedido
                  </h3>

                  <Divider className="my-2" />

                  {tap === 1 ? (
                     <div className="max-h-[65vh] overflow-y-auto">
                        <div className="flex flex-col gap-4">
                           {cart &&
                              cart.map((item) => (
                                 <div
                                    key={item.id}
                                    className="border rounded-lg p-4 shadow-sm"
                                 >
                                    <div className="grid grid-cols-12 gap-4">
                                       <div className="col-span-4 flex justify-center items-center">
                                          <img
                                             src={item.image}
                                             alt={item.name}
                                             className="max-w-full h-auto"
                                          />
                                       </div>

                                       <div className="col-span-8 flex flex-col gap-2">
                                          <div className="flex justify-between items-center">
                                             <h2 className="text-lg font-semibold">
                                                {item.name}
                                             </h2>
                                             <span className="text-lg font-semibold text-gray-700">
                                                {formatPrice(item.price)}
                                             </span>
                                          </div>
                                          <p className="text-gray-600">
                                             {item.description}
                                          </p>
                                          <div className="flex justify-end gap-2">
                                             <button
                                                onClick={() =>
                                                   removeProduct(item.id)
                                                }
                                                className="btn btn-error btn-outline btn-sm flex items-center"
                                             >
                                                <GoTrash className="mr-1" />{' '}
                                                Remover
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))}
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
                        type="tel"
                     />
                  ) : tap === 22 ? (
                     <div className="flex flex-col gap-3">
                        <DeliveryMethod
                           errors={errors}
                           handleCart={handleCart}
                           personalInfo={order}
                        />

                        <div>
                           <h3>
                              Escolha um endereço pré-salvo ou crie um novo
                           </h3>

                           <div className="flex flex-col gap-2 mt-3">
                              {consumer.consumer_address!.map((ad) => {
                                 return (
                                    <div
                                       onClick={() => setConsumerAddress(ad)}
                                       className={`${
                                          consumerAddress.id == ad.id
                                             ? 'bg-primary/50 text-primary-content'
                                             : ''
                                       } border-primary/10 border-[1px] shadow-primary/10 hover:shadow-md p-2 flex items-center gap-3 cursor-pointer rounded-lg`}
                                    >
                                       <MdHouse size={25} />
                                       <div>
                                          <h1>{ad.zipCode}</h1>
                                          <h1>
                                             {ad.street}, {ad.number}
                                          </h1>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>

                           <Button
                              className="mt-4 btn-primary"
                              color="primary"
                              onClick={() => setTap(3)}
                           >
                              <span>Novo endereço</span>
                           </Button>
                        </div>
                     </div>
                  ) : tap === 3 ? (
                     <div className="max-h-[55vh] overflow-y-auto flex flex-col gap-4 p-2">
                        <DeliveryMethod
                           errors={errors}
                           handleCart={handleCart}
                           personalInfo={order}
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
                        <div className="flex flex-col gap-2 mt-5">
                           <PaymentComponent
                              method={1}
                              setOrder={setOrder}
                              payment_method={order.payment_method}
                           />

                           <PaymentComponent
                              method={2}
                              setOrder={setOrder}
                              payment_method={order.payment_method}
                           />
                           <PaymentComponent
                              method={3}
                              setOrder={setOrder}
                              payment_method={order.payment_method}
                           />
                           <PaymentComponent
                              method={4}
                              setOrder={setOrder}
                              payment_method={order.payment_method}
                           />
                           <PaymentComponent
                              method={5}
                              setOrder={setOrder}
                              payment_method={order.payment_method}
                           />
                        </div>
                     </div>
                  )}
               </div>

               <div className="flex flex-col gap-2 w-full bottom-0 bg-base-100">
                  <div className="mx-2">
                     <div className="flex justify-between items-center text-2xl font-bold px-2">
                        <h3>Total</h3>
                        <span>{formatPrice(somaTotal)}</span>
                     </div>
                     {tap !== 1 && (
                        <button
                           onClick={() => handleChangeTap(tap, true)}
                           className="btn btn-none hover:bg-primary houver:text-base-100 btn-outline w-full mt-2"
                        >
                           Voltar
                        </button>
                     )}
                  </div>
                  <button
                     onClick={() => handleChangeTap(tap)}
                     className="w-full text-base-100 bg-primary p-3 text-xl font-bold uppercase"
                  >
                     {tap === 4 ? 'Finalizar Pedido' : 'Avançar'}
                  </button>
               </div>
            </>
         </Drawer>
      </>
   )
}

export default CartDrawer
