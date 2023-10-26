import { IStore } from '@types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import { GrFormClose } from 'react-icons/gr'
import Drawer from 'react-modern-drawer'
import { config } from '../../../configs'

interface InfoDrawerProps {
   isOpen: boolean
   setIsOpen: Dispatch<SetStateAction<boolean>>
   store: IStore
}

const InfoDrawer = ({ isOpen, setIsOpen, store }: InfoDrawerProps) => {
   //tab 0 = sobre, tab 1 = horário, tab 2 = pagamentos
   const [tab, setTab] = useState(0)

   //verifica se o dispositivo é mobile
   const [isMobile, setIsMobile] = useState(false)

   //pega o dia da semana atual - usado para destacar o dia atual no horário de funcionamento
   const today = new Date().getDay()

   //função para abrir e fechar o drawer
   const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
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

   return (
      <Drawer
         open={isOpen}
         onClose={toggleDrawer}
         overlayOpacity={0}
         direction={isMobile ? 'bottom' : 'right'}
         className={`${
            isMobile ? 'rounded-t-3xl' : 'mt-[8vh]'
         } bg-base-100 p-2 max-h-[92vh]`}
         size={isMobile ? 450 : '40vw'}
      >
         <>
            <div className="w-full flex p-2">
               <GrFormClose
                  size={30}
                  className="cursor-pointer"
                  onClick={toggleDrawer}
               />
            </div>
            <div className="p-2 overflow-auto">
               <div className="tabs w-full">
                  <a
                     onClick={() => setTab(0)}
                     className={`tab tab-bordered hover:tab-active ${
                        tab == 0 && 'tab-active'
                     } w-1/3`}
                  >
                     Sobre
                  </a>
                  <a
                     onClick={() => setTab(1)}
                     className={`tab tab-bordered hover:tab-active ${
                        tab == 1 && 'tab-active'
                     } w-1/3`}
                  >
                     Horário
                  </a>
                  <a
                     onClick={() => setTab(2)}
                     className={`tab tab-bordered hover:tab-active ${
                        tab == 2 && 'tab-active'
                     } w-1/3`}
                  >
                     Pagamentos
                  </a>
               </div>
               <div className="text-primary mt-4 max-h-80 md:max-h-full overflow-y-auto">
                  {tab == 0 ? (
                     <>
                        <div>
                           <h3 className="text-xs">{store?.description}</h3>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                           <p className="text-md mb-1">Endereço</p>
                           <div className="flex flex-col gap-2">
                              <p className="text-xs">
                                 {store?.address}, {store?.numberAddress} -{' '}
                                 {store?.street}
                              </p>
                              <p className="text-xs">{store?.city.name} - SP</p>
                              <p className="text-xs">CEP: 16018-000</p>
                           </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                           <p className="text-md mb-1">Endereço</p>
                           <div className="flex flex-col gap-2">
                              <p className="text-xs">
                                 {store?.address}, {store?.numberAddress} -{' '}
                                 {store?.street}
                              </p>
                              <p className="text-xs">{store?.city.name} - SP</p>
                              <p className="text-xs">CEP: 16018-000</p>
                           </div>
                        </div>
                     </>
                  ) : (
                     <div className="flex flex-col gap-5">
                        {config.operation.hour_open.map((item, index) => (
                           <div
                              key={index}
                              className={`flex justify-between ${
                                 item.day === today
                                    ? 'text-primary font-bold'
                                    : 'text-primary opacity-50'
                              }`}
                           >
                              <div className="flex gap-1 items-center">
                                 {item.day === today && (
                                    <span>
                                       <FaClock />
                                    </span>
                                 )}
                                 <span>{item.title}</span>
                              </div>
                              <div>{`${item.open} às ${item.close}`}</div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </>
      </Drawer>
   )
}

export default InfoDrawer
