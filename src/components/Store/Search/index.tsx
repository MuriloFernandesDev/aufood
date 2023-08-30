import { BiSearch } from 'react-icons/bi'

interface SearchHomeProps {
   className?: string | undefined
}

const SearchHome = ({ className }: SearchHomeProps) => {
   return (
      <form
         className={`flex items-center w-full p-2 justify-between bg-primary text-base-100 rounded-md ${className}`}
      >
         <input
            type="text"
            id="simple-search"
            className="text-sm placeholder:text-base-100 bg-transparent focus:outline-none focus:bg-transparent focus:border-transparent w-full"
            placeholder="Buscar"
            required
         />
         <button type="submit">
            <BiSearch />
         </button>
      </form>
   )
}

export default SearchHome
