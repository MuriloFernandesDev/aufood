import { IOrder } from '@types'
import { PaymentNumberForString } from '@utils'
import { Dispatch, SetStateAction } from 'react'
import { BiMoney } from 'react-icons/bi'

interface PaymentComponentProps {
   method: number
   paymentMethod?: number
   setOrder: Dispatch<SetStateAction<IOrder>>
}

const PaymentComponent = ({
   method,
   paymentMethod,
   setOrder,
}: PaymentComponentProps) => {
   const handleChange = () => {
      setOrder((prev) => ({
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
