import { IProductCategory } from '@types'

const CategoriesItem2 = (props: IProductCategory) => {
   const { image, name, id } = props
   return (
      <a
         href={`#${name}`}
         className="w-[-moz-fit-content] flex flex-col items-center cursor-pointer no-underline bg-base-100 md:hover:scale-105 md:hover:shadow-lg rounded-lg transition-all duration-300"
      >
         <div
            className="block relative rounded-lg"
            style={{ height: '80px', width: '100px' }}
         >
            <span>
               <img
                  className="rounded-lg absolute inset-0 box-sizing border-box padding-0 border-none margin-auto display-block min-w-full max-w-full min-h-full max-h-full"
                  alt={name}
                  src={image}
               />
            </span>
         </div>
         <span className="text-center font-light text-sm text-secondary">
            {name}
         </span>
      </a>
   )
}

export default CategoriesItem2
