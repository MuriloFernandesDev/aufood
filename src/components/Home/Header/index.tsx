import Image from 'next/image'
import { Button } from 'react-daisyui'
import { FiShoppingBag } from 'react-icons/fi'
import { RiMenuFill } from 'react-icons/ri'
import LogoTeste from '../../../assets/images/logoTeste.png'

export const HeaderComponentHome = () => {
   return (
      <div>
         <div className="flex justify-between">
            <Button className="btn btn-ghost bg-primary rounded-xl w-12 h-12 p-3 flex justify-center items-center ">
               <FiShoppingBag className="text-white" size={20} />
            </Button>
            <div className="bg-primary rounded-full w-28 h-28 p-3 flex justify-center items-center">
               <Image
                  src={LogoTeste}
                  quality={100}
                  alt="Logo"
                  width={80}
                  height={80}
               />
            </div>
            <Button className="btn btn-ghost bg-primary rounded-xl w-12 h-12 p-3 flex justify-center items-center">
               <RiMenuFill className="text-white" size={20} />
            </Button>
         </div>
      </div>
   )
}
