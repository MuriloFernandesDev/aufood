import CategoriesComponent from '@components/Store/Categories'
import InfoDrawer from '@components/Store/Drawer/InfoDrawer'
import ProductCard from '@components/Store/ProductCard'
import SearchHome from '@components/Store/Search'
import { SaveColors } from '@utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaHamburger } from 'react-icons/fa'
import { config } from '../configs'

/*
Drawer: https://www.npmjs.com/package/react-modern-drawer
Modal: https://www.npmjs.com/package/react-modal
*/

const Home = () => {
   const [isOpen, setIsOpen] = useState(false)

   const [scroll, setScroll] = useState(0)

   useEffect(() => {
      const handleScroll = () => {
         setScroll(window.scrollY)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   useEffect(() => {
      const colors = config.colors

      SaveColors(colors.primary, 'primary')
      SaveColors(colors.background, 'background')
      SaveColors(colors.primary, 'price')
      SaveColors(colors.secondary, 'secondary')
   }, [])

   return (
      <>
         <header
            className={`px-[1.1rem] max-w-container mt-[70px] md:mt-[140px] mx-auto transition-all duration-300 md:opacity-100 ${
               scroll >= 270 ? 'opacity-0' : 'opacity-100'
            }`}
         >
            <div
               className="rounded-[4px] h-[250px] w-full text-[#f7f7f7] bg-cover bg-center bg-no-repeat"
               style={{
                  backgroundImage:
                     'url(https://images6.alphacoders.com/908/908160.jpg)',
               }}
            />
         </header>

         <div className="max-w-container px-4 mx-auto mb-10 lg:pt-0 z-20">
            <section>
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
                     <h1 className="text-3xl font-semibold ">{config.title}</h1>
                  </div>
                  <div className="flex flex-col-reverse lg:flex-row lg:h-7 text-sm mt-4 md:mt-0">
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
                        <span className="flex gap-1 items-center mt-5 lg:mt-0">
                           <AiOutlineClockCircle /> Tempo de entrega -{' '}
                           {config.operation.delivery_time} min
                        </span>
                     </div>
                  </div>
               </div>
               <SearchHome />
            </section>

            <section>
               <div className="divider divide-primary mt-10 mb-6">
                  <h4 className="text-lg font-bold uppercase">Categorias</h4>
               </div>
               <CategoriesComponent />
            </section>

            <section id="lanche" className="mt-10">
               <span className="flex items-center text-primary">
                  <FaHamburger size={20} className="mr-1" />
                  <h3 className="text-2xl font-semibold"> Lanches</h3>
               </span>

               <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-3 mt-3">
                  <ProductCard
                     id={4}
                     category="Lanches"
                     name="X-Bacon - Artesanal"
                     price={29.99}
                     timeDelivery="25-30min"
                  />
                  <ProductCard
                     id={3}
                     category="Hot-dog"
                     name="X-Bacon - Artesanal"
                     price={29.99}
                     timeDelivery="25-30min"
                  />
                  <ProductCard
                     id={2}
                     category="Lanches"
                     name="X-Bacon - Artesanal"
                     price={29.99}
                     timeDelivery="25-30min"
                  />
                  <ProductCard
                     id={1}
                     category="Lanches"
                     name="X-Bacon - Artesanal"
                     price={29.99}
                     timeDelivery="25-30min"
                  />
               </div>
            </section>

            <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         </div>
      </>
   )
}

export default Home
