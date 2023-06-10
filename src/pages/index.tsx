import dynamic from 'next/dynamic'
import React from 'react'
import { HeaderComponentHome } from '../components/Home/Header'
import SearchHome from '../components/Home/Search'
const CategoriesComponent = dynamic(
   () => import('../components/Home/Categories'),
   { ssr: false }
)

const Home = () => {
   return (
      <React.Fragment>
         <HeaderComponentHome />

         <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="text-primary text-2xl font-semibold uppercase">
               Icarus lanches
            </h1>
            <h4 className="mt-1">
               Tempo de entrega - 40m - <span className="link">Ver mais</span>
            </h4>

            <SearchHome className="mt-3" />
            <div className="divider divide-primary mt-10">
               <h4 className="text-primary text-lg font-bold uppercase ">
                  Categorias
               </h4>
            </div>
            <CategoriesComponent className="mt-3" />
         </div>
      </React.Fragment>
   )
}

export default Home
