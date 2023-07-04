import Image from 'next/image'
import lanchePng from '../../../assets/images/lancheCategorias.png'

const CategorieItem1 = () => {
   return (
      <a className="group block text-center w-[140px] h-[140px] bg-base-100">
         <div className="flex xl:mb-4 p-2 h-[100px] w-[100px] mx-auto rounded-full overflow-hidden bg-primary">
            <div className="flex items-center justify-center shrink-0 transition-all duration-700 w-full h-full transform scale-50 group-hover:scale-100 -translate-x-full group-hover:translate-x-0">
               <Image src={lanchePng} layout="fixed" height={80} width={80} />
            </div>
            <div className="flex items-center justify-center shrink-0 transition-all duration-700 w-full h-full transform scale-100 group-hover:scale-50 -translate-x-full group-hover:translate-x-0">
               <Image src={lanchePng} layout="fixed" height={80} width={80} />
            </div>
         </div>

         <h3 className="capitalize text-brand-dark text-sm sm:text-15px lg:text-base truncate mt-1">
            Fast Food Items
         </h3>
      </a>
   )
}

export default CategorieItem1
