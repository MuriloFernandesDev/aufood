import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaHamburger } from 'react-icons/fa'
import InfoDrawer from '../components/Drawer/InfoDrawer'
import CategoriesComponent from '../components/Home/Categories'
import Footer from '../components/Home/Footer'
import { NavComponent } from '../components/Home/NavBar'
import ProductCard from '../components/Home/ProductCard'
import SearchHome from '../components/Home/Search'
import { config } from '../configs'

/*
Drawer: https://www.npmjs.com/package/react-modern-drawer
Modal: https://www.npmjs.com/package/react-modal
*/

const Home = () => {
   const [isOpen, setIsOpen] = useState(false)

   const navItens = [
      {
         name: 'Início',
         link: '#',
      },
      {
         name: 'Promoções',
         link: '#',
      },
      {
         name: 'Funcionamento',
         link: '#',
      },
      {
         name: 'Contato',
         link: '#',
      },
   ]
   const [scrollPassed250px, setScrollPassed250px] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 270) {
            setScrollPassed250px(true)
         } else {
            setScrollPassed250px(false)
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return (
      <>
         <NavComponent navItens={navItens} />
         <div
            className={`header-container transition-all duration-300 ${
               scrollPassed250px ? 'opacity-0 md:opacity-100' : 'opacity-100'
            }`}
         >
            <header className="px-[1.1rem] max-w-container mx-auto">
               <div
                  className="rounded-[4px] h-[250px] w-full text-[#f7f7f7] bg-cover bg-center bg-no-repeat"
                  style={{
                     backgroundImage:
                        'url(https://images6.alphacoders.com/908/908160.jpg)',
                  }}
               />
            </header>
         </div>
         <div className="content-container">
            <div className="max-w-container px-4 mx-auto mb-10 lg:pt-0 z-20">
               <div className="bg-base-100 rounded-t-lg">
                  <div className="flex my-10 flex-col lg:flex-row justify-between items-center w-full text-secondary">
                     <div className="flex items-center gap-3">
                        <div className="mask mask-circle bg-primary p-3 flex justify-center items-center">
                           <Image
                              src={config.logo}
                              width={50}
                              height={50}
                              layout="fixed"
                           />
                        </div>
                        <h1 className="text-3xl font-semibold ">
                           {config.title}
                        </h1>
                     </div>
                     <div className="flex flex-col-reverse lg:flex-row lg:h-7 text-sm mt-10 md:mt-0">
                        <div className="grid flex-grow place-items-center">
                           <span
                              className="link"
                              onClick={() => setIsOpen(!isOpen)}
                           >
                              Ver mais
                           </span>
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="grid flex-grow place-items-center">
                           <span className="flex gap-1 items-center">
                              <AiOutlineClockCircle /> Tempo de entrega -{' '}
                              {config.operation.delivery_time} min
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col justify-center items-center text-primary">
                     <SearchHome />

                     <div className="divider divide-primary mt-10 mb-6">
                        <h4 className="text-lg font-bold uppercase">
                           Categorias
                        </h4>
                     </div>
                     <CategoriesComponent />

                     {/* <CardOfDay className="mt-10 mx-auto" /> */}

                     <div className="w-full">
                        <div id="lanche" className="mt-10">
                           <span className="flex items-center text-primary">
                              <FaHamburger size={20} className="mr-1" />
                              <h3 className="text-2xl font-semibold">
                                 {' '}
                                 Lanches
                              </h3>
                           </span>

                           <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-3 mt-3">
                              <ProductCard />
                              <ProductCard />
                              <ProductCard />
                              <ProductCard />
                           </div>
                        </div>
                     </div>
                  </div>
                  <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default Home
