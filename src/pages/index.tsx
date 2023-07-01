import { useState } from 'react'
import { FaHamburger } from 'react-icons/fa'
import InfoDrawer from '../components/Drawer/InfoDrawer'
import CategoriesComponent from '../components/Home/Categories'
import { HeaderComponentHome } from '../components/Home/Header'
import CardOfDay from '../components/Home/OffDay'
import ProductCard from '../components/Home/ProductCard'
import SearchHome from '../components/Home/Search'
import { config } from '../configs'

/*
Drawer: https://www.npmjs.com/package/react-modern-drawer
Modal: https://www.npmjs.com/package/react-modal
*/

const Home = () => {
   const [isOpen, setIsOpen] = useState(false)

   const itensHeader = [
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
   return (
      <>
         <HeaderComponentHome itensHeader={itensHeader} />

         <div
            className="w-full h-96 bg-cover bg-center"
            style={{
               backgroundImage:
                  'url(https://images6.alphacoders.com/908/908160.jpg)',
            }}
         ></div>

         <div className="flex flex-col justify-center items-center mt-10 text-primary">
            <h1 className="text-primary text-2xl font-bold uppercase">
               {config.title}
            </h1>
            <h4 className="mt-1">
               Tempo de entrega - 40m -{' '}
               <span className="link" onClick={() => setIsOpen(!isOpen)}>
                  Ver mais
               </span>
            </h4>
            <div className="px-3 w-full">
               <SearchHome className="mt-3 max-w-xl mx-auto" />
            </div>
            <div className="max-w-6xl mx-auto">
               <div className="divider divide-primary mt-10">
                  <h4 className="text-lg font-bold uppercase ">Categorias</h4>
               </div>
               <CategoriesComponent className="mt-3" />

               <div className="px-3 w-full">
                  <CardOfDay className="mt-8 mx-auto" />
                  <div id="lanche" className="mt-10">
                     <span className="flex items-center mb-3 text-primary">
                        <FaHamburger size={20} className="mr-1" />
                        <h3 className="text-2xl font-semibold"> Lanches</h3>
                     </span>

                     <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-3 ">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
   )
}

export default Home
