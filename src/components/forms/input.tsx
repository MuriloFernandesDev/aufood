import { ChangeEvent } from 'react'
import { Input } from 'react-daisyui'
import { CgDanger } from 'react-icons/cg'

type nameTypes = 'name' | 'phone' | 'email' | 'cep' | 'address' | 'number'

interface InputComponentProps {
   handleChange: (event: ChangeEvent<HTMLInputElement>) => void
   value: string | number
   label: string
   placeholder: string
   name: nameTypes
   invalid?: boolean
}

const InputComponent = ({
   handleChange,
   value,
   label,
   placeholder,
   name,
   invalid,
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
