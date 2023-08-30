import { handlePersonalInfoProps } from '../../../../types'

interface TabDeliveryMethodProps {
   handlePersonalInfo: (e: handlePersonalInfoProps) => void
   deliveryMethod: string
   value: string
}

const TabDeliveryMethod = ({
   handlePersonalInfo,
   deliveryMethod,
   value,
}: TabDeliveryMethodProps) => {
   return (
      <a
         onClick={() =>
            handlePersonalInfo({
               target: {
                  name: 'deliveryMethod',
                  value: value,
               },
            })
         }
         className={`tab tab-bordered cursor-pointer hover:tab-active ${
            deliveryMethod === value && 'tab-active'
         } `}
      >
         <span className="mr-1">Trazer até mim</span>
      </a>
   )
}

export default TabDeliveryMethod
