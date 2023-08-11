interface PaymentGroupComponentProps {
   children: React.ReactNode
   title: string
}

const PaymentGroupComponent = ({
   children,
   title,
}: PaymentGroupComponentProps) => {
   return (
      <div className="flex flex-col gap-2">
         <h3 className="font-bold">{title}</h3>
         <div className="flex flex-col gap-2">{children}</div>
      </div>
   )
}

export default PaymentGroupComponent
