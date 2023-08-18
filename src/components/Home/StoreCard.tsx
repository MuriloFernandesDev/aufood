import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

const StoreCart = () => {
   return (
      <Link href="/McDonalds">
         <div className="card shadow-md md:shadow-none p-3 md:p-0 flex flex-col md:flex-row md:hover:scale-105 cursor-pointer md:hover:shadow-xl transition-all duration-300 items-center bg-base-100 gap-2 col-span-2 md:col-span-1 mt-4">
            <img
               width={100}
               height={100}
               className="rounded-md md:rounded-none"
               src="https://www.macarthursquare.com.au/globalassets/retail/macarthur/stores/retailer-logos/mcdonalds-logo.jpg?width=300&height=400&upscale=false&mode=max&quality=80"
            />
            <div className="card-body p-0 flex flex-col gap-1 text-xs">
               <p className="text-sm">Restaurante McDonalds</p>
               <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  <FaStar /> 4.8
               </span>
               <span>30-40min - Frete Grátis</span>
            </div>
         </div>
      </Link>
   )
}

export default StoreCart
