import { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { Input } from 'react-daisyui'
import { CgDanger } from 'react-icons/cg'

type nameTypes = 'name' | 'phone' | 'email' | 'zipCode' | 'street' | 'number'

interface InputComponentProps {
   handleChange: (event: ChangeEvent<HTMLInputElement>) => void
   value: string | number
   label: string
   placeholder: string
   name: nameTypes
   invalid?: boolean
   type?: HTMLInputTypeAttribute
}

const InputComponent = ({
   handleChange,
   value,
   label,
   placeholder,
   name,
   invalid,
   type,
}: InputComponentProps) => {
   return (
      <div>
         <label htmlFor={label} className="label p-0">
            <span className="label-text">{label}</span>
         </label>
         <Input
            name={name}
            onChange={handleChange}
            value={value}
            className={`input w-full ${
               invalid ? 'input-error' : 'input-primary'
            }`}
            placeholder={placeholder}
            id={label}
            type={type}
         />
         {invalid && (
            <span className="label-text-alt text-error flex items-center gap-1 mt-1">
               <CgDanger /> {label} obrigatório
            </span>
         )}
      </div>
   )
}

export default InputComponent
