import { api } from '@api'
import { IStore } from '@types'
import { createContext, ReactNode, useContext, useState } from 'react'

interface StoreProviderProps {
   children: ReactNode
}

interface StoreContextData {
   ratingStore: number
   getDataStore: (store: IStore) => Promise<void>
   store: IStore
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData)

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
   const [ratingStore, setRatingStore] = useState(0)
   const [store, setStore] = useState<IStore>({} as IStore)

   const getDataStore = async (store: IStore) => {
      setStore(store)

      api.get(`/store/avaliation/${store.id}`).then((res) => {
         setRatingStore(res.data.rating)
      })
   }

   return (
      <StoreContext.Provider
         value={{
            ratingStore,
            getDataStore,
            store,
         }}
      >
         {children}
      </StoreContext.Provider>
   )
}

export function useStore(): StoreContextData {
   const context = useContext(StoreContext)

   return context
}
