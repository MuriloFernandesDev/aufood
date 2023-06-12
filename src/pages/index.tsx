import axios from 'axios'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { HeaderComponentHome } from '../components/Home/Header'
import SearchHome from '../components/Home/Search'
const CategoriesComponent = dynamic(
   () => import('../components/Home/Categories'),
   { ssr: false }
)

const Home = () => {
   const getDados = async () => {
     await axios("https://app.excelent.com.br/api/request/Lancamentos/Pesquisar", {
      headers: {
         Accept: "application/json",
         "Authorization-Token":"8f61667acffeb2c74706360afb1d0f7d0a0037e22b772d9504a5f24b882b5b4538c0c80ea742387caec355e17cd4c8bffafb7a614be84771eb7bdd66c5f204d488fe1ede37c1a3f816f323edbd4c138cc52724dfc77d745e88abd37755e22d838f441f1233fdad10b2a21e7f92892d8e2c62c1a2948b733da03dfe6ae7fedd81",
         User: "gestao@excelent.com.br",
         App: "API"
      },
    }).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })

   }

   useEffect(() => {
      getDados()
   }, [])

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
