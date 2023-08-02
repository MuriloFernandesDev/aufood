import { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import CategoriesItem2 from './item2'

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
            setSlidesPerView(3)
            setSpaceBetween(5)
         } else if(width <= 1025){
            setSlidesPerView(5)
            setSpaceBetween(10)
         } else if(width <= 1280){
            setSlidesPerView(8)
            setSpaceBetween(15)
         } else {
            setSlidesPerView(10)
            setSpaceBetween(20)
         }
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   return (
      <div className={`relative ${className}`}>
         <div className="swiper-container max-w-container px-4">
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
               initialSlide={5} //initialSlide será o meio da lista que vier do banco de dados
               className="py-4 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-none cursor-pointer"
            >
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
               <SwiperSlide className="rounded-lg">
                  <CategoriesItem2 />
               </SwiperSlide>
            </Swiper>
         </div>
         <div className="custom-pr btn btn-sm bg-primary btn-circle border-base-100 absolute top-0 left-0 mt-12 md:mt-[3.3%] z-10 ml-2">
            <GrFormPrevious className='icon-base-100'/>
         </div>
         <div className="custom-nx btn btn-sm bg-primary btn-circle border-base-100 absolute top-0 right-0 mt-12 md:mt-[3.3%] z-10 mr-2">
            <GrFormNext className='icon-base-100' />
         </div>
      </div>
   )
}

export default CategoriesComponent
