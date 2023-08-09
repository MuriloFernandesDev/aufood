import { ChangeEvent } from 'react'
import { Input } from 'react-daisyui'

type nameTypes = 'name' | 'phone' | 'email' | 'cep' | 'address' | 'number'

interface InputComponentProps {
   handleChange: (event: ChangeEvent<HTMLInputElement>) => void
   value: string | number
   label: string
   placeholder: string
   name: nameTypes
}

const InputComponent = ({
   handleChange,
   value,
   label,
   placeholder,
   name,
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
            color="primary"
            className="w-full"
            placeholder={placeholder}
            id={label}
         />
      </div>
   )
}

export default InputComponent
