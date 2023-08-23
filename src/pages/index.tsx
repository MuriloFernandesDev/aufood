import CategoriesComponent from '@components/Categories'
import StoreCart from '@components/Home/StoreCard'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

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

         <section>
            <Swiper
               centeredSlides={true}
               spaceBetween={30}
               slidesPerView={3}
               modules={[Navigation, Pagination, Scrollbar, A11y]}
               className="relative"
               navigation={{
                  prevEl: '.custom-nav-promo-prev',
                  nextEl: '.custom-nav-promo-next',
               }}
            >
               <SwiperSlide>
                  <img
                     alt="Peça imperdíveis por R$0,99"
                     src="https://static.ifood-static.com.br/image/upload/t_high/discoveries/22pecaapartir099principal_rbR4.png?imwidth=3840"
                     width={100}
                     className="rounded-xl"
                  />
               </SwiperSlide>
               <SwiperSlide>
                  <img
                     alt="Peça imperdíveis por R$0,99"
                     src="https://static.ifood-static.com.br/image/upload/t_high/discoveries/22pecaapartir099principal_rbR4.png?imwidth=3840"
                     width={100}
                     className="rounded-xl"
                  />
               </SwiperSlide>
               <SwiperSlide>
                  <img
                     alt="Peça imperdíveis por R$0,99"
                     src="https://static.ifood-static.com.br/image/upload/t_high/discoveries/22pecaapartir099principal_rbR4.png?imwidth=3840"
                     width={100}
                     className="rounded-xl"
                  />
               </SwiperSlide>

               <div className="custom-nav-promo-prev btn btn-sm bg-primary btn-circle border-base-100 absolute top-[50%] left-0 z-10 ml-2">
                  <GrFormPrevious className="icon-base-100" />
               </div>
               <div className="custom-nav-promo-next btn btn-sm bg-primary btn-circle border-base-100 absolute top-[50%] right-0 z-10 mr-2">
                  <GrFormNext className="icon-base-100" />
               </div>
            </Swiper>
         </section>

         <section className="my-5">
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

         <section className="my-5 mt-24">
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
