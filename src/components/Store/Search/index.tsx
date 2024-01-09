import { api } from '@api'
import { useStore } from '@hooks/useStore'
import { ProductList } from '@pages/[loja_nome]'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import SearchItem from './SearchItem'

interface SearchHomeProps {
   className?: string | undefined
}

const SearchHome = ({ className }: SearchHomeProps) => {
   const [options, setOptions] = useState<ProductList[]>([])
   // const [inputFocused, setInputFocused] = useState(false)
   const [value, setValue] = useState('')
   const { store } = useStore()

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setValue(value)

      if (value.length > 0) {
         api.get(`/product/search_product_store/${store.id}`, {
            params: {
               q: value,
            },
         }).then(async (response) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setOptions(response.data)
         })
      } else {
         setOptions([])
      }
   }

   // const handleFocus = () => {
   //    setInputFocused(true)

   //    if (value == '') {
   //       setOptions([])
   //    }
   // }

   // const handleBlur = () => {
   //    setInputFocused(false)
   //    setValue('')
   //    setOptions([])
   // }

   return (
      <div
         // onFocus={handleFocus}
         // onBlur={handleBlur}
         className="inline-flex flex-col justify-center relative text-gray-500 w-full"
      >
         <div
            className={`flex items-center w-full p-2 justify-between bg-primary text-base-100 rounded-md ${className}`}
         >
            <input
               type="text"
               className="text-sm placeholder:text-base-100 bg-transparent focus:outline-none focus:bg-transparent focus:border-transparent w-full"
               placeholder="Buscar"
               onChange={handleSearch}
               value={value}
            />
            <BiSearch />
         </div>
         {options.length > 0 && (
            <ul className="mt-1 relative">
               {options.map((option, index) => (
                  <SearchItem props={option} key={index} />
               ))}
            </ul>
         )}
      </div>
   )
}

export default SearchHome
