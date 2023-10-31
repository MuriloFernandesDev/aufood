import { useStore } from '@hooks/useStore'
import { IProductCategory } from '@types'
import { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { api } from 'services/api'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import CategoriesItem2 from './item2'

interface CategoriesComponentProps {
   className?: string
   bgColor?: string
}

const CategoriesComponent = ({
   className,
   bgColor,
}: CategoriesComponentProps) => {
   const { store } = useStore()
   const [slidesPerView, setSlidesPerView] = useState(3)
   const [spaceBetween, setSpaceBetween] = useState(10)
   const [loading, setLoading] = useState(true)
   const [categories, setCategories] = useState<IProductCategory[]>([])

   useEffect(() => {
      if (!store.id) return
      api.get(`/ProductCategory/list_categories_store/${store.id}`)
         .then(async (response) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setCategories(response.data)
         })
         .finally(() => {
            setLoading(false)
         })
   }, [store])

   useEffect(() => {
      const handleResize = () => {
         const width = window.innerWidth
         if (width <= 640) {
            setSlidesPerView(3)
            setSpaceBetween(5)
         } else if (width <= 1025) {
            setSlidesPerView(5)
            setSpaceBetween(10)
         } else if (width <= 1280) {
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
               initialSlide={categories.length > 0 ? categories.length / 2 : 4}
               className="py-4 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-none cursor-pointer"
            >
               {loading ? (
                  <>
                     {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <SwiperSlide key={i} className="rounded-lg">
                           <div className="animate-pulse flex space-x-4">
                              <div className="bg-primary/80 h-20 w-20 rounded-md"></div>
                           </div>
                        </SwiperSlide>
                     ))}
                  </>
               ) : (
                  categories.map((category, index) => (
                     <SwiperSlide key={index} className="rounded-lg">
                        <CategoriesItem2 {...category} />
                     </SwiperSlide>
                  ))
               )}
            </Swiper>
         </div>
         <div
            className={`custom-pr btn btn-sm ${
               bgColor ? bgColor : 'bg-primary'
            } btn-circle border-base-100 absolute top-0 left-0 mt-12 md:mt-[3.3%] z-10 ml-2`}
         >
            <GrFormPrevious className="icon-base-100" />
         </div>
         <div
            className={`custom-nx btn btn-sm ${
               bgColor ? bgColor : 'bg-primary'
            } btn-circle border-base-100 absolute top-0 right-0 mt-12 md:mt-[3.3%] z-10 mr-2`}
         >
            <GrFormNext className="icon-base-100" />
         </div>
      </div>
   )
}

export default CategoriesComponent
