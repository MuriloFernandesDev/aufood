import CategoriesComponent from '@components/Categories'
import StoreCart from '@components/Home/StoreCard'

const Home = () => {
   return (
      <div className="px-[1.1rem] max-w-container mt-[70px] md:mt-[130px] mx-auto">
         <section>
            <div className="divider divide-primary mb-6">
               <h4 className="text-lg font-bold uppercase">
                  Restaurantes por categoria
               </h4>
            </div>
            <CategoriesComponent />
         </section>

         <section className="my-5">
            <h2>Lojas</h2>

            <div className="grid grid-cols-4 gap-5">
               <StoreCart />
               <StoreCart />
               <StoreCart />
               <StoreCart />
               <StoreCart />
               <StoreCart />
               <StoreCart />
            </div>
         </section>
      </div>
   )
}

export default Home
