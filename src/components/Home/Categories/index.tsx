import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import CategoriesItem from './item'

interface CategoriesComponentProps {
   className?: string
}

const CategoriesComponent = ({ className }: CategoriesComponentProps) => {
   return (
      <div className="relative">
         <Swiper
            slidesPerView={3}
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
               delay: 2500,
               disableOnInteraction: false,
            }}
            navigation={{
               prevEl: '.custom-pr',
               nextEl: '.custom-nx',
            }}
            modules={[Navigation]}
            initialSlide={1}
            className={`mySwiper cursor-pointer ${className}`}
         >
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[175px]">
               <CategoriesItem />
            </SwiperSlide>
         </Swiper>
         <div className="custom-pr btn bg-primary/70 hover:bg-primary btn-circle border-base-100 absolute top-0 left-0 mt-[3%] z-10">
            <GrFormPrevious />
         </div>
         <div className="custom-nx btn bg-primary/70 hover:bg-primary btn-circle border-base-100 absolute top-0 right-0 mt-[3%] z-10">
            <GrFormNext />
         </div>
      </div>
   )
}

export default CategoriesComponent
