import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface InputCodeProps {
   code: string[]
   setCode: Dispatch<SetStateAction<string[]>>
   isInvalid?: boolean
}

/*
Para usar esse componente precisa declarar um estado no pai e iniciar o estado com um array de string's
com o tamanho do código que será digitado, por exemplo: const [code, setCode] = useState(['', '', '', '']); <-- 4 dígitos
declarar o componente passando o estado e a função que altera o estado como props
Exemplo:
const [code, setCode] = useState(['', '', '', '', '', '']);
<InputCode code={code} setCode={setCode} />
*/

const InputCode = ({ code, setCode, isInvalid }: InputCodeProps) => {
   // Cria um array de refs para cada input
   const refs = code.map(() => useRef<HTMLInputElement>(null))
   const [invalid, setInvalid] = useState<boolean | null>(null)

   useEffect(() => {
      if (invalid != null) setInvalid(true)
   }, [isInvalid])

   // Cria uma ref para o último input
   const lastInputRef = useRef<HTMLInputElement>(null)

   // Função que altera o estado do código
   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
   ) => {
      setInvalid(false)
      const { value } = e.target
      if (/^\d*$/.test(value) && value.length <= 1) {
         setCode((prevCode) => {
            const newCode = [...prevCode]
            newCode[index] = value
            return newCode
         })

         if (value !== '' && index < refs.length - 1) {
            refs[index + 1].current?.focus()
         }
      }
   }

   // Função que faz o backspace voltar para o input anterior
   const handleInputKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
   ) => {
      const { key } = e
      if (key === 'Backspace' && code[index] === '' && index > 0) {
         refs[index - 1].current?.focus()
      }
   }

   //quando o usuário colar o codigo esse componente distribui os valores para os inputs
   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData = e.clipboardData || window.Clipboard
      const pastedData = clipboardData.getData('text')
      if (/^\d{4}$/.test(pastedData)) {
         const codeArray = pastedData.split('')
         setCode(['', '', '', ''])
         setCode(codeArray)
      }
   }

   // Função que faz o foco no primeiro input vazio
   useEffect(() => {
      const index = code.findIndex((value) => value === '')
      if (index !== -1 && refs[index].current !== null) {
         refs[index].current?.focus()
      } else if (lastInputRef.current !== null) {
         lastInputRef.current.tabIndex = 0
      }
      if (index === code.length - 1 && refs[code.length - 1].current !== null) {
         refs[code.length - 1].current?.focus()
      }
   }, [code, refs, lastInputRef])

   return (
      <div className="flex gap-2 items-center justify-center">
         {code.map((value, index) => (
            <input
               key={index}
               autoFocus={index === 0}
               className={`input input-bordered input-accent text-center w-1/4 ${
                  invalid && 'border-danger'
               }`}
               type="tel"
               value={value}
               maxLength={1}
               onChange={(e) => handleInputChange(e, index)}
               onKeyDown={(e) => handleInputKeyDown(e, index)}
               ref={refs[index]}
               onPaste={handlePaste}
            />
         ))}
      </div>
   )
}

export default InputCode
