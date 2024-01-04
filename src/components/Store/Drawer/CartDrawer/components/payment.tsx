import { IOrder } from '@types'
import { PaymentNumberForString } from '@utils'
import { Dispatch, SetStateAction } from 'react'
import { BiMoney } from 'react-icons/bi'

interface PaymentComponentProps {
   method: number
   payment_method?: number
   setOrder: Dispatch<SetStateAction<IOrder>>
}

const PaymentComponent = ({
   method,
   payment_method,
   setOrder,
}: PaymentComponentProps) => {
   const handleChange = () => {
      setOrder((prev) => ({
         ...prev,
         payment_method: method,
      }))
   }

   return (
      <button
         onClick={handleChange}
         className={`btn ${
            payment_method === method ? 'btn-primary' : 'btn-outline'
         } flex gap-2 text-start justify-start items-center font-semibold`}
      >
         <BiMoney />
         <span>{PaymentNumberForString(method)}</span>
      </button>
   )
}

export default PaymentComponent
