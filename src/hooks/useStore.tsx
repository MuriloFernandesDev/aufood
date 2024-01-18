import { IStore } from '@types'
import { createContext, ReactNode, useContext, useState } from 'react'

interface StoreProviderProps {
   children: ReactNode
}

interface StoreContextData {
   getDataStore: (store: IStore) => void
   store: IStore
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData)

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
   const [store, setStore] = useState<IStore>({} as IStore)

   const getDataStore = (store: IStore) => {
      setStore(store)
   }

   return (
      <StoreContext.Provider
         value={{
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
