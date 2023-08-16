import { handlePersonalInfoProps } from '@types'

interface RadioBoxProps {
   label: string
   value: string
   handleChange: (event: handlePersonalInfoProps) => void
   checkedValue: string
   name: string
   invalid: boolean
}

const RadioBox = ({
   label,
   value,
   checkedValue,
   handleChange,
   name,
   invalid,
}: RadioBoxProps) => {
   return (
      <div className="form-control">
         <label className="label justify-start gap-3 cursor-pointer">
            <input
               onChange={() => {
                  handleChange({
                     target: {
                        name,
                        value,
                     },
                  })
               }}
               type="radio"
               name="radio-10"
               className={`radio ${
                  invalid && 'border border-red-600'
               } checked:bg-blue-500`}
               checked={checkedValue === value}
            />
            <span className="label-text">{label}</span>
         </label>
      </div>
   )
}

export default RadioBox
