import RadioBox from '@components/forms/radioBox'
import { EventTarget, ICart } from '@types'
import { campoInvalido } from '@utils'
import { CgDanger } from 'react-icons/cg'

interface DeliveryMethodProps {
   personalInfo: ICart
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
               value={0}
               name="deliveryMethod"
               label="Irei buscar"
               checkedValue={personalInfo.deliveryMethod ?? ''}
               handleChange={handleCart}
               invalid={campoInvalido(personalInfo, errors, 'deliveryMethod')}
            />
            <RadioBox
               value={1}
               name="deliveryMethod"
               label="Trazer até mim"
               checkedValue={personalInfo.deliveryMethod ?? ''}
               handleChange={handleCart}
               invalid={campoInvalido(personalInfo, errors, 'deliveryMethod')}
            />
         </div>

         {campoInvalido(personalInfo, errors, 'deliveryMethod') && (
            <span className="label-text-alt text-error flex items-center gap-1 mt-1">
               <CgDanger /> Método de entrega obrigatório
            </span>
         )}
      </div>
   )
}

export default DeliveryMethod
