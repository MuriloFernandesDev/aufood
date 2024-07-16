interface Props {
   children: React.ReactNode
   className?: string
   spaceTop?: boolean
}

const Container = ({ children, className, spaceTop }: Props) => {
   return (
      <div
         className={`px-[1.1rem] max-w-container p-10 mx-auto ${
            spaceTop && 'pt-[130px]'
         } ${className}`}
      >
         {children}
      </div>
   )
}

export default Container
