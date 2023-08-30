import { BiMoney } from 'react-icons/bi'

interface PaymentComponentProps {
   method: string
   methodPayment: string
   setMethodPayment: (method: string) => void
}

const PaymentComponent = ({
   method,
   methodPayment,
   setMethodPayment,
}: PaymentComponentProps) => {
   return (
      <button
         onClick={() => setMethodPayment(method)}
         className={`btn ${
            methodPayment === method ? 'btn-primary' : 'btn-outline'
         } flex gap-2 text-start justify-start items-center font-semibold`}
      >
         <BiMoney />
         <span>{method}</span>
      </button>
   )
}

export default PaymentComponent
