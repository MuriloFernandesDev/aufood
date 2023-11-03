import { ICart } from '@types'
import { PaymentNumberForString } from '@utils'
import { Dispatch, SetStateAction } from 'react'
import { BiMoney } from 'react-icons/bi'

interface PaymentComponentProps {
   method: number
   paymentMethod?: number
   setCart: Dispatch<SetStateAction<ICart>>
}

const PaymentComponent = ({
   method,
   paymentMethod,
   setCart,
}: PaymentComponentProps) => {
   const handleChange = () => {
      setCart((prev) => ({
         ...prev,
         paymentMethod: method,
      }))
   }

   return (
      <button
         onClick={handleChange}
         className={`btn ${
            paymentMethod === method ? 'btn-primary' : 'btn-outline'
         } flex gap-2 text-start justify-start items-center font-semibold`}
      >
         <BiMoney />
         <span>{PaymentNumberForString(method)}</span>
      </button>
   )
}

export default PaymentComponent
