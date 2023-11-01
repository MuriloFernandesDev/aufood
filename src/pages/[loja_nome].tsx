import { ApiService, api } from '@api'
import CategoriesComponent from '@components/Store/Categories'
import InfoDrawer from '@components/Store/Drawer/InfoDrawer'
import Layout from '@components/Store/Layout'
import ProductCard from '@components/Store/ProductCard'
import SearchHome from '@components/Store/Search'
import { useStore } from '@hooks/useStore'
import { IProductCategory, IStore } from '@types'
import { SaveColors } from '@utils'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaHamburger } from 'react-icons/fa'
import { config } from '../configs'

/*
Drawer: https://www.npmjs.com/package/react-modern-drawer
Modal: https://www.npmjs.com/package/react-modal
*/

interface IGetServerProps {
   params: {
      loja_nome: string
   }
   data: IStore | null
   ctx: GetServerSidePropsContext
}

export interface ProductList {
   name: string
   id: number
   price: number
   timeDelivery: string
   productCategory?: IProductCategory
   image: string
   category: string
}

interface ProductOnCategory {
   categoryName: string
   categoryId: number
   listProduct: ProductList[]
}

const Home = (props: IGetServerProps) => {
   const { params, data } = props

   if (!data) return <div>Loja {params.loja_nome} não encontrada</div>

   const [isOpen, setIsOpen] = useState(false)
   const [scroll, setScroll] = useState(0)
   const [allProducts, setAllProducts] = useState<ProductList[]>([])
   const [allProductsCategory, setAllProductsCategory] = useState<
      ProductOnCategory[]
   >([])

   const { getDataStore } = useStore()

   useEffect(() => {
      const handleScroll = () => {
         setScroll(window.scrollY)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   useEffect(() => {
      SaveColors(data.colorPrimary, 'primary')
      SaveColors(data.colorBackground, 'background')
      SaveColors(data.colorPrimary, 'price')
      SaveColors(data.colorSecondary, 'secondary')

      getDataStore(data!)
      api.get(`/product/list_all/${data.id}`).then((res) => {
         setAllProducts(res.data)
      })

      api.get(`/product/list_all_on_category/${data.id}`).then((res) => {
         setAllProductsCategory(res.data)
      })
   }, [])

   return (
      <Layout>
         <header
            className={`px-[1.1rem] max-w-container mt-[70px] md:mt-[140px] mx-auto transition-all duration-300 md:opacity-100 ${
               scroll >= 270 ? 'opacity-0' : 'opacity-100'
            }`}
         >
            <div
               className="rounded-[4px] h-[250px] w-full text-[#f7f7f7] bg-cover bg-center bg-no-repeat"
               style={{
                  backgroundImage: `url(${data?.backgroundImage})`,
               }}
            />
         </header>

         <div className="max-w-container px-4 mx-auto mb-10 lg:pt-0 z-20">
            <section>
               <div className="flex my-10 flex-col lg:flex-row justify-between items-center w-full text-secondary">
                  <div className="flex items-center gap-3">
                     <div className="mask mask-circle bg-primary p-3 flex justify-center items-center">
                        <Image
                           src={data?.logo ?? ''}
                           width={50}
                           height={50}
                           layout="fixed"
                        />
                     </div>
                     <h1 className="text-3xl font-semibold ">{data?.name}</h1>
                  </div>
                  <div className="flex flex-col-reverse lg:flex-row lg:h-7 text-sm mt-4 md:mt-0">
                     <div className="grid flex-grow place-items-center">
                        <span
                           className="link"
                           onClick={() => setIsOpen(!isOpen)}
                        >
                           Ver mais
                        </span>
                     </div>
                     <div className="divider lg:divider-horizontal"></div>
                     <div className="grid flex-grow place-items-center">
                        <span className="flex gap-1 items-center mt-5 lg:mt-0">
                           <AiOutlineClockCircle /> Tempo de entrega -{' '}
                           {config.operation.delivery_time} min
                        </span>
                     </div>
                  </div>
               </div>
               <SearchHome />
            </section>

            <section>
               <div className="divider divide-primary mt-10 mb-6">
                  <h4 className="text-lg font-bold uppercase">Categorias</h4>
               </div>
               <CategoriesComponent />
            </section>
            {allProductsCategory.length > 0 &&
               allProductsCategory.map((category, index) => {
                  return (
                     <section
                        key={index}
                        id={`${category.categoryName}`}
                        className="mt-10"
                     >
                        <span className="flex items-center text-primary">
                           <FaHamburger size={20} className="mr-1" />
                           <h3 className="text-2xl font-semibold">
                              {category.categoryName}
                           </h3>
                        </span>

                        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-3 mt-3">
                           {category.listProduct.map((product) => {
                              return (
                                 <ProductCard
                                    id={product.id}
                                    category={category.categoryName}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    timeDelivery={product.timeDelivery}
                                 />
                              )
                           })}
                        </div>
                     </section>
                  )
               })}

            {allProducts.length > 0 && (
               <section id="lanche" className="mt-10">
                  <span className="flex items-center text-primary">
                     <FaHamburger size={20} className="mr-1" />
                     <h3 className="text-2xl font-semibold">Todos</h3>
                  </span>

                  <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-3 mt-3">
                     {allProducts.map((product, index) => {
                        return (
                           <ProductCard
                              key={index}
                              id={product.id}
                              category={product.productCategory!.name}
                              name={product.name}
                              price={product.price}
                              timeDelivery={product.timeDelivery.toString()}
                              image={product.image}
                           />
                        )
                     })}
                  </div>
               </section>
            )}
            <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         </div>
      </Layout>
   )
}

export default Home

export const getServerSideProps = async ({ params, ctx }: IGetServerProps) => {
   const query = params.loja_nome

   try {
      const response = await ApiService(ctx)
         .get(`/store/${query.replace(/ /g, '-')}`)
         .then((res) => res?.data)

      return {
         props: {
            params: query,
            data: response,
         },
      }
   } catch (err) {
      return {
         props: {
            params: query,
            data: null,
         },
      }
   }
}
