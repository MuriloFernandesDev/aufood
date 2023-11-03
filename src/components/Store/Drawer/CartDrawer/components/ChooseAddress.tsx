import { IConsumerAddress } from '@types'
import { Dispatch, SetStateAction } from 'react'
import { Button } from 'react-daisyui'
import { MdHouse } from 'react-icons/md'

interface ChooseAddressProps {
   address: IConsumerAddress[]
   setConsumerAddress: Dispatch<SetStateAction<IConsumerAddress>>
   consumerAddress: IConsumerAddress
   setTap: Dispatch<SetStateAction<number>>
}

const ChooseAddress = ({
   address,
   setConsumerAddress,
   consumerAddress,
   setTap,
}: ChooseAddressProps) => {
   const handleAddress = (ad: IConsumerAddress) => {
      setConsumerAddress((prevState) => ({
         ...prevState,
         id: ad.id,
      }))
   }

   return (
      <div>
         <h3>Escolha um endereço pré-salvo ou crie um novo</h3>

         <div className="flex flex-col gap-2 mt-3">
            {address.map((ad) => {
               return (
                  <div
                     onClick={() => handleAddress(ad)}
                     className={`${
                        consumerAddress.id == ad.id ? 'bg-info/50' : ''
                     } border-primary/10 border-[1px] shadow-primary/10 hover:shadow-md p-2 flex items-center gap-3 cursor-pointer rounded-lg`}
                  >
                     <MdHouse size={25} />
                     <div>
                        <h1>{ad.zipCode}</h1>
                        <h1>
                           {ad.street}, {ad.number} - {ad.city.name}
                        </h1>
                     </div>
                  </div>
               )
            })}
         </div>

         <Button
            className="mt-4 btn-primary"
            color="primary"
            onClick={() => setTap(3)}
         >
            <span>Novo endereço</span>
         </Button>
      </div>
   )
}

export default ChooseAddress
