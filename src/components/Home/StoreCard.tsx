import { IStoreListAll } from '@index'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

const StoreCart = (props: IStoreListAll) => {
   const { logo, name, rating, qtdRating = 0 } = props

   return (
      <Link href={`/${name.replace(/ /g, '-')}`}>
         <div className="card shadow-md md:shadow-none p-3 md:p-0 flex flex-col md:flex-row md:hover:scale-105 cursor-pointer md:hover:shadow-xl transition-all duration-300 items-center bg-base-100 gap-2 col-span-2 md:col-span-1 mt-4 border-[0.1px] border-primary-home/1">
            <div className="rounded-md md:rounded-none bg-slate-500 flex items-center justify-center p-2 h-full">
               <img width={100} height={100} src={logo} />
            </div>
            <div className="card-body p-0 flex flex-col gap-1 text-xs">
               <p className="text-sm">{name}</p>
               <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  <FaStar /> {qtdRating > 0 ? rating : 'Nenhuma avaliação'}
               </span>
               <span>30-40min - Frete Grátis</span>
            </div>
         </div>
      </Link>
   )
}

export default StoreCart
