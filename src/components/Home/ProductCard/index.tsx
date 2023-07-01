import Image from 'next/image'
import { FaHamburger } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'
import Lanche from '../../../assets/images/LancheWpp.jpg'

const ProductCard = () => {
   return (
      <div className="card w-full bg-primary text-base-100 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
         <picture className="relative">
            <Image src={Lanche} layout="responsive" />
            <span className="badge bg-base-100 text-primary absolute bottom-0 left-0 m-1 ml-5">
               <FaHamburger size={15} className="mr-1" /> Lanches
            </span>
         </picture>
         <div className="card-body p-5">
            <div className="flex flex-col gap-1">
               <h3>X-BACON - ARTESANAL</h3>

               <span className="font-semibold">R$ 19,99</span>

               <span className="flex items-center gap-1">
                  <FiClock /> 30-40 min
               </span>
            </div>
         </div>
      </div>
   )
}

export default ProductCard
