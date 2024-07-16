import { api } from '@api'
import LayoutHome from '@components/Home/Layout'
import Container from '@components/Home/Layout/Container'
import StoreCart from '@components/Home/StoreCard'
import { IStore } from '@types'
import { Fragment, useEffect, useState } from 'react'

export interface IStoreListAll extends IStore {
   rating?: string
   qtdRating?: number
}

const Home = () => {
   const [listAllStores, setListAllStores] = useState<IStoreListAll[]>([])
   const [loadingAllStores, setLoadingAllStores] = useState(true)

   useEffect(() => {
      api.get('/store/list_all_store')
         .then((response) => {
            setListAllStores(response.data)
         })
         .catch((error) => {
            console.log(error)
         })
         .finally(() => {
            setLoadingAllStores(false)
         })
   }, [])

   return (
      <Fragment>
         <LayoutHome>
            <Container spaceTop>
               {loadingAllStores ? (
                  <div>loading...</div>
               ) : (
                  <section>
                     <h2>Todas lojas</h2>

                     <div className="grid grid-cols-4 gap-5">
                        {listAllStores.map((store) => (
                           <StoreCart key={store.id} {...store} />
                        ))}
                     </div>
                  </section>
               )}
            </Container>
         </LayoutHome>
      </Fragment>
   )
}

export default Home
