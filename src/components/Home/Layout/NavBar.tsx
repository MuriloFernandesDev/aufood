import { infoApp } from 'configs'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Navbar } from 'react-daisyui'
import { AiOutlineMenu } from 'react-icons/ai'
import Logo from '../../../assets/images/logo.png'

const navItens = [
   {
      name: 'Início',
      link: '#',
   },
   {
      name: 'Restaurantes',
      link: '#',
   },
   {
      name: 'Frete Grátis',
      link: '#',
   },
   {
      name: 'Promoções',
      link: '#',
   },
]

export const NavBar = () => {
   const [openModal, setOpenModal] = useState(false)
   const modalRef = useRef<HTMLDivElement>(null)

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

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <>
         <Navbar className="text-base-100-home w-full bg-primary-home flex justify-center items-center fixed top-0 z-50 border-b-[1px] border-secondary/70">
            <div className="flex justify-between items-center w-full max-w-container px-4 py-1 bg-primary-home mx-auto">
               <div className="flex gap-10 items-center">
                  <Link href="/">
                     <div className="w-24">
                        <Image
                           src={Logo}
                           alt={infoApp.name}
                           layout="responsive"
                        />
                     </div>
                  </Link>
                  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                     <ul className="flex gap-5 font-medium p-3">
                        {navItens.map((item, i) => (
                           <li key={i}>
                              <a
                                 href={item.link}
                                 className="block px-2 rounded bg-transparent text-base-100-home"
                                 aria-current="page"
                              >
                                 {item.name}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className="dropdown dropdown-end block md:hidden">
                  <label tabIndex={0}>
                     <AiOutlineMenu size={20} />
                  </label>
                  <ul
                     tabIndex={0}
                     className="dropdown-content z-[1] menu p-2 shadow bg-primary-home rounded-box w-52"
                  >
                     {navItens.map((item, index) => (
                        <li key={index}>
                           <a
                              href={item.link}
                              className="block py-2 px-2 rounded bg-transparent"
                              aria-current="page"
                           >
                              {item.name}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
               {/* <div
                  onClick={handleModal}
                  className="hidden md:block cursor-pointer p-2"
               >
                  <div className="flex items-center gap-1">
                     <IoLocationOutline /> <h3>Rua Gilberto Trivelato, 502</h3>{' '}
                     <IoIosArrowDown />
                  </div>
               </div> */}
            </div>
         </Navbar>{' '}
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
            </div>
         </div>
      </>
   )
}
