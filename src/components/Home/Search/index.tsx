import { BiSearch } from 'react-icons/bi'

interface SearchHomeProps {
   className?: string | undefined
}

const SearchHome = ({ className }: SearchHomeProps) => {
   return (
      <form
         className={`flex items-center w-full p-2 justify-between bg-slate-300 rounded-md ${className}`}
      >
         <input
            type="text"
            id="simple-search"
            className="text-sm bg-transparent focus:outline-none focus:bg-transparent focus:border-transparent w-full text-black"
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
