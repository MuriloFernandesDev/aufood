import RadioBox from '@components/forms/radioBox'
import { EventTarget, IOrder } from '@types'
import { campoInvalido } from '@utils'
import { CgDanger } from 'react-icons/cg'

interface DeliveryMethodProps {
   personalInfo: IOrder
   handleCart: (e: EventTarget) => void
   errors: any
}

const DeliveryMethod = ({
   personalInfo,
   handleCart,
   errors,
}: DeliveryMethodProps) => {
   return (
      <div>
         <label className="label p-0">
            <span className="label-text">Método de entrega</span>
         </label>
         <div className="flex gap-3">
            <RadioBox
               value={1}
               name="delivery_method"
               label="Irei buscar"
               checkedValue={personalInfo.delivery_method}
               handleChange={handleCart}
               invalid={campoInvalido(personalInfo, errors, 'delivery_method')}
            />
            <RadioBox
               value={2}
               name="delivery_method"
               label="Trazer até mim"
               checkedValue={personalInfo.delivery_method}
               handleChange={handleCart}
               invalid={campoInvalido(personalInfo, errors, 'delivery_method')}
            />
         </div>

         {campoInvalido(personalInfo, errors, 'delivery_method') && (
            <span className="label-text-alt text-error flex items-center gap-1 mt-1">
               <CgDanger /> Método de entrega obrigatório
            </span>
         )}
      </div>
   )
}

export default DeliveryMethod
