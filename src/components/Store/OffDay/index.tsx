import LanchePng from '@images/lancheCategorias.png'
import Image from 'next/image'

interface CardOfDayProps {
   className?: string
}

const CardOfDay = ({ className }: CardOfDayProps) => {
   return (
      <div
         className={`card-of-day card bg-primary shadow-black/20 shadow-md w-full max-w-md p-1 hover:shadow-black/50 transition-all duration-200 ${className}`}
      >
         <div className="card-body">
            <h3 className="text-center text-2xl font-bold text-base-100">
               Oferta do dia
            </h3>
            <div className="flex justify-between items-center mt-2 bg-base-100 text-primary rounded-lg p-2">
               <h4 className="text-md font-bold">R$ 16,99</h4>
               <h4 className="text-2xl font-bold">x-Bacon</h4>
            </div>
            <picture className="w-44 mx-auto">
               <Image src={LanchePng} layout="responsive" />
            </picture>
         </div>
      </div>
   )
}

export default CardOfDay
