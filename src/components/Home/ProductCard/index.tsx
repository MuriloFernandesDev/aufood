import Image from 'next/image'
import { FaHamburger } from 'react-icons/fa'
import { FiClock, FiShoppingBag } from 'react-icons/fi'
import Lanche from '../../../assets/images/LancheWpp.jpg'

const ProductCard = () => {
   return (
      <div className="card w-full bg-primary text-base-100 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
         <picture>
            <Image src={Lanche} layout="responsive" />
         </picture>
         <div className="card-body">
            <div className="flex justify-between w-full">
               <div className="flex flex-col gap-1">
                  <h3>X-BACON - ARTESANAL</h3>
                  <span className="flex items-center gap-1">
                     <FiClock /> 30-40m -{' '}
                     <span className="font-semibold">R$ 19,99</span>
                  </span>
                  <span className="badge bg-base-100 text-primary">
                     <FaHamburger size={15} className="mr-1" /> Lanches
                  </span>
               </div>
               <FiShoppingBag className="text-base-100" size={30} />
            </div>
         </div>
      </div>
   )
}

export default ProductCard
