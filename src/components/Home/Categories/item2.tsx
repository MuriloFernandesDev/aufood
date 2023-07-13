const CategoriesItem2 = () => {
   return (
      <div className="rounded-lg">
         <a className="w-[-moz-fit-content] flex flex-col items-center cursor-pointer no-underline bg-base-100 md:hover:scale-105 md:hover:shadow-lg rounded-lg transition-all duration-300">
            <div
               className="block relative rounded-lg"
               style={{ height: '80px', width: '100px' }}
            >
               <span>
                  <img
                     className="rounded-lg absolute inset-0 box-sizing border-box padding-0 border-none margin-auto display-block min-w-full max-w-full min-h-full max-h-full"
                     alt="Japonesa"
                     src="https://static.ifood-static.com.br/image/upload/t_medium/discoveries/japonesa_FP14.png?imwidth=256"
                  />
               </span>
            </div>
            <span className="text-center font-light text-sm text-secondary">
               Japonesa
            </span>
         </a>
      </div>
   )
}

export default CategoriesItem2
