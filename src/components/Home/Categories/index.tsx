import Image from 'next/image'
// import { Navigation } from 'swiper'
import { Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import LanchePng from '../../../assets/images/lanche.png'

interface CategoriesComponentProps {
   className?: string
}

const CategoriesComponent = ({ className }: CategoriesComponentProps) => {
   return (
      <>
         <Swiper
            slidesPerView={3}
            spaceBetween={130}
            centeredSlides={true}
            autoplay={{
               delay: 2500,
               disableOnInteraction: false,
            }}
            // navigation={{
            //    prevEl: '.swiper-button-prev',
            //    nextEl: '.swiper-button-next',
            // }}
            modules={[Autoplay, Navigation]}
            className={`mySwiper cursor-pointer ${className}`}
         >
            <SwiperSlide>
               <div className="flex flex-col justify-center items-center">
                  <div className="bg-primary rounded-full w-28 h-28 p-3 flex justify-center items-center">
                     <Image
                        src={LanchePng}
                        alt="Icone"
                        width={80}
                        height={80}
                     />
                  </div>
                  <h4 className="text-primary text-lg font-semibold uppercase mt-2">
                     Lanches
                  </h4>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex flex-col justify-center items-center">
                  <div className="bg-primary rounded-full w-28 h-28 p-3 flex justify-center items-center">
                     <Image
                        src={LanchePng}
                        alt="Icone"
                        width={80}
                        height={80}
                     />
                  </div>
                  <h4 className="text-primary text-lg font-semibold uppercase mt-2">
                     Lanches
                  </h4>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex flex-col justify-center items-center">
                  <div className="bg-primary rounded-full w-28 h-28 p-3 flex justify-center items-center">
                     <Image
                        src={LanchePng}
                        alt="Icone"
                        width={80}
                        height={80}
                     />
                  </div>
                  <h4 className="text-primary text-lg font-semibold uppercase mt-2">
                     Lanches
                  </h4>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex flex-col justify-center items-center">
                  <div className="bg-primary rounded-full w-28 h-28 p-3 flex justify-center items-center">
                     <Image
                        src={LanchePng}
                        alt="Icone"
                        width={80}
                        height={80}
                     />
                  </div>
                  <h4 className="text-primary text-lg font-semibold uppercase mt-2">
                     Lanches
                  </h4>
               </div>
            </SwiperSlide>
         </Swiper>

         {/* <div className="swiper-button-prev custom-prev"></div>
         <div className="swiper-button-next custom-next"></div> */}
      </>
   )
}

export default CategoriesComponent
