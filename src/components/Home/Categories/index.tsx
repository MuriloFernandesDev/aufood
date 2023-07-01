import { useEffect, useState } from 'react'
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
   const [slidesPerView, setSlidesPerView] = useState(3)
   const [spaceBetween, setSpaceBetween] = useState(10)

   useEffect(() => {
      const handleResize = () => {
         const width = window.innerWidth
         if (width <= 640) {
            setSlidesPerView(1)
            setSpaceBetween(2)
         } else if (width <= 768) {
            setSlidesPerView(2)
            setSpaceBetween(5)
         } else {
            setSlidesPerView(3)
            setSpaceBetween(10)
         }
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   return (
      <div className="relative">
         <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
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
            className={`mySwiper max-w-xs md:max-w-none cursor-pointer ${className}`}
         >
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>{' '}
            <SwiperSlide className="w-[150px]">
               <CategoriesItem />
            </SwiperSlide>
         </Swiper>
         <div className="custom-pr btn btn-sm md:btn-md bg-primary/70 hover:bg-primary btn-circle border-base-100 absolute top-0 left-0 mt-8 md:mt-[3%] z-10">
            <GrFormPrevious />
         </div>
         <div className="custom-nx btn btn-sm md:btn-md bg-primary/70 hover:bg-primary btn-circle border-base-100 absolute top-0 right-0 mt-8 md:mt-[3%] z-10">
            <GrFormNext />
         </div>
      </div>
   )
}

export default CategoriesComponent
