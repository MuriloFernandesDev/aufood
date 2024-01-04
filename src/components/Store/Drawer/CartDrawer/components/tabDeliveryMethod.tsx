import { EventTarget } from '@types'

interface TabDeliveryMethodProps {
   handlePersonalInfo: (e: EventTarget) => void
   delivery_method: string
   value: string
}

const TabDeliveryMethod = ({
   handlePersonalInfo,
   delivery_method,
   value,
}: TabDeliveryMethodProps) => {
   return (
      <a
         onClick={() =>
            handlePersonalInfo({
               target: {
                  name: 'delivery_method',
                  value: value,
               },
            })
         }
         className={`tab tab-bordered cursor-pointer hover:tab-active ${
            delivery_method === value && 'tab-active'
         } `}
      >
         <span className="mr-1">Trazer até mim</span>
      </a>
   )
}

export default TabDeliveryMethod
