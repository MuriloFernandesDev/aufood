import { api } from '@api'
import LayoutHome from '@components/Home/Layout'
import StoreCart from '@components/Home/StoreCard'
import PromotionComponent from '@components/Home/Swiper/Promotion'
import CategoriesComponent from '@components/Store/Categories'
import { IStore } from '@types'
import { useEffect, useState } from 'react'
import { FaTruckLoading } from 'react-icons/fa'

export interface IStoreListAll extends IStore {
   rating?: string
   qtdRating?: number
}

const Home = () => {
   const [listAllStores, setListAllStores] = useState<IStoreListAll[]>([])

   useEffect(() => {
      api.get('/store/list_all').then((response) => {
         setListAllStores(response.data)
      })
   }, [])

   return (
      <LayoutHome>
         <div className="px-[1.1rem] max-w-container pt-[70px] md:pt-[130px] mx-auto bg-base-100-home">
            <section className="bg-base-100-home">
               <div className="divider divide-primary-home mb-6">
                  <h4 className="text-lg font-bold uppercase">
                     Restaurantes por categoria
                  </h4>
               </div>
               <CategoriesComponent bgColor="bg-primary-home" />
            </section>

            <section className="mt-14">
               <PromotionComponent />
            </section>

            {listAllStores === null ? (
               <FaTruckLoading />
            ) : (
               <section className="my-14">
                  <h2>Todas lojas</h2>

                  <div className="grid grid-cols-4 gap-5">
                     {listAllStores.map((store) => (
                        <StoreCart key={store.id} {...store} />
                     ))}
                  </div>
               </section>
            )}

            {/* <section className="my-14">
               <h2>Lojas em ofertas</h2>

               <div className="grid grid-cols-4 gap-5">
                  <StoreCart />
                  <StoreCart />
                  <StoreCart />
                  <StoreCart />
                  <StoreCart />
                  <StoreCart />
                  <StoreCart />
               </div>
            </section> */}
         </div>
      </LayoutHome>
   )
}

export default Home
