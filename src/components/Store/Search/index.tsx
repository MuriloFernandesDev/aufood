import { api } from '@api'
import { useStore } from '@hooks/useStore'
import { IProductCategory } from '@types'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

interface SearchHomeProps {
   className?: string | undefined
}

const SearchHome = ({ className }: SearchHomeProps) => {
   const [options, setOptions] = useState<IProductCategory[]>([])
   const [inputFocused, setInputFocused] = useState(false)
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

   const handleFocus = () => {
      setInputFocused(true)

      if (value == '') {
         setOptions([])
      }
   }

   const handleBlur = () => {
      setInputFocused(false)
      setValue('')
      setOptions([])
   }

   return (
      <div className="inline-flex flex-col justify-center relative text-gray-500 w-full">
         <div
            className={`flex items-center w-full p-2 justify-between bg-primary text-base-100 rounded-md ${className}`}
         >
            <input
               type="text"
               className="text-sm placeholder:text-base-100 bg-transparent focus:outline-none focus:bg-transparent focus:border-transparent w-full"
               placeholder="Buscar"
               onChange={handleSearch}
               onFocus={handleFocus}
               onBlur={handleBlur}
               value={value}
            />
            <BiSearch />
         </div>
         {inputFocused && options.length > 0 && (
            <ul className="mt-1">
               {options.map((option, index) => (
                  <li
                     key={index}
                     className="pl-2 pr-2 py-1 relative cursor-pointer hover:bg-primary/30 hover:text-primary-content flex items-center gap-2"
                  >
                     <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                     >
                        <path
                           fillRule="evenodd"
                           d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                           clipRule="evenodd"
                        />
                     </svg>
                     <img
                        width={60}
                        src={option.image}
                        className="rounded-md"
                     />
                     <b>{option.name}</b>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default SearchHome
