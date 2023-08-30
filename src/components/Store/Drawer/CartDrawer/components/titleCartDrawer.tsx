interface TitleCartDrawerProps {
   title: string
   localName: string
}

const TitleCartDrawer = ({ title, localName }: TitleCartDrawerProps) => {
   return (
      <div>
         <h3>{title}</h3>

         <span>{localName}</span>
      </div>
   )
}

export default TitleCartDrawer
