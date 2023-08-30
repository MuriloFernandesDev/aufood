import { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const PromotionComponent = () => {
   const [sizeScreen, setSizeScreen] = useState(window.innerWidth)

   useEffect(() => {
      const handleResize = () => {
         const width = window.innerWidth
         setSizeScreen(width)
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   return (
      <Swiper
         centeredSlides={true}
         spaceBetween={30}
         slidesPerView={sizeScreen >= 1025 ? 3 : 1}
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
               className="rounded-xl w-full"
            />
         </SwiperSlide>
         <SwiperSlide>
            <img
               alt="Peça imperdíveis por R$0,99"
               src="https://static.ifood-static.com.br/image/upload/t_high/discoveries/22pecaapartir099principal_rbR4.png?imwidth=3840"
               className="rounded-xl w-full"
            />
         </SwiperSlide>
         <SwiperSlide>
            <img
               alt="Peça imperdíveis por R$0,99"
               src="https://static.ifood-static.com.br/image/upload/t_high/discoveries/22pecaapartir099principal_rbR4.png?imwidth=3840"
               className="rounded-xl w-full"
            />
         </SwiperSlide>

         <div className="custom-nav-promo-prev btn btn-sm bg-primary-home btn-circle border-base-100 absolute top-[50%] left-0 z-10 ml-2">
            <GrFormPrevious className="icon-base-100" />
         </div>
         <div className="custom-nav-promo-next btn btn-sm bg-primary-home btn-circle border-base-100 absolute top-[50%] right-0 z-10 mr-2">
            <GrFormNext className="icon-base-100" />
         </div>
      </Swiper>
   )
}

export default PromotionComponent
