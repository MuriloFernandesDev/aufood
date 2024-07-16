import { api } from '@api'
import CategoriesComponent from '@components/Store/Categories'
import InfoDrawer from '@components/Store/Drawer/InfoDrawer'
import Layout from '@components/Store/Layout'
import ProductCard from '@components/Store/Product/ProductCard'
import SearchHome from '@components/Store/Search'
import { useStore } from '@hooks/useStore'
import { IStore, ProductList } from '@types'
import { SaveColors } from '@utils'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaHamburger } from 'react-icons/fa'
import { config } from '../configs'

interface IGetServerProps {
   params: {
      loja_nome: string
   }
   data: IStore | null
}

const Home = (props: IGetServerProps) => {
   const { params, data } = props

   if (!data) return <div>Loja {params.loja_nome} não encontrada</div>

   const [isOpen, setIsOpen] = useState(false)
   const [allProducts, setAllProducts] = useState<ProductList[]>([])

   const { getDataStore } = useStore()

   useEffect(() => {
      SaveColors(data.color_primary, 'primary')
      SaveColors(data.color_background, 'background')
      SaveColors(data.color_primary, 'price')
      SaveColors(data.color_secondary, 'secondary')

      getDataStore(data!)

      api.get(`/product/list_all/${data.id}`).then((res) => {
         setAllProducts(res.data)
      })
   }, [])

   return (
      <Fragment>
         <Head>
            <title>{data?.name ?? ''}</title>
            <meta name="description" content={data?.description ?? ''} />
            <meta property="og:title" content={data?.name ?? ''} />
            <meta property="og:description" content={data?.description ?? ''} />
            <meta property="og:image" content={data?.background_image ?? ''} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="pt_BR" />
         </Head>

         <Layout>
            <section>
               <div className="flex my-10 flex-col lg:flex-row justify-between items-center w-full text-secondary">
                  <div className="flex items-center gap-3">
                     <div className="mask mask-circle bg-primary p-3 flex justify-center items-center">
                        <img src={data?.logo ?? ''} width={50} height={50} />
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

            {allProducts.length > 0 && (
               <section id="lanche" className="mt-10">
                  <span className="flex items-center text-primary">
                     <FaHamburger size={20} className="mr-1" />
                     <h3 className="text-2xl font-semibold">Todos</h3>
                  </span>

                  <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-3 mt-3">
                     {allProducts.map((product, index) => {
                        return <ProductCard key={index} {...product} />
                     })}
                  </div>
               </section>
            )}

            <InfoDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
         </Layout>
      </Fragment>
   )
}

export default Home

export const getServerSideProps = async ({ params }: IGetServerProps) => {
   const query = params.loja_nome

   try {
      const response = await api
         .get(`/store/search/${query}`)
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
