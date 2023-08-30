import StoreCart from '@components/Home/StoreCard'
import PromotionComponent from '@components/Home/Swiper/Promotion'
import CategoriesComponent from '@components/Store/Categories'

const Home = () => {
   return (
      <div className="px-[1.1rem] max-w-container pt-[70px] md:pt-[130px] mx-auto bg-base-100-home">
         <section className="bg-base-100-home">
            <div className="divider divide-primary-home mb-6">
               <h4 className="text-lg font-bold uppercase">
                  Restaurantes por categoria
               </h4>
            </div>
            <CategoriesComponent bgColor="bg-primary-home" />
         </section>

         <section className="mt-14">
            <PromotionComponent />
         </section>

         <section className="mt-14">
            <h2>Lojas próximas</h2>

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

         <section className="my-14">
            <h2>Lojas em ofertas</h2>

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
