import { BiMoney } from 'react-icons/bi'

interface PaymentComponentProps {
   method: string
   paymentMethod: string
   setPaymentMethod: (method: string) => void
}

const PaymentComponent = ({
   method,
   paymentMethod,
   setPaymentMethod,
}: PaymentComponentProps) => {
   return (
      <button
         onClick={() => setPaymentMethod(method)}
         className={`btn ${
            paymentMethod === method ? 'btn-primary' : 'btn-outline'
         } flex gap-2 text-start justify-start items-center font-semibold`}
      >
         <BiMoney />
         <span>{method}</span>
      </button>
   )
}

export default PaymentComponent
