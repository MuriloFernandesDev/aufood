import LayoutHome from '@components/Layout/Home'
import Layout from '@components/Layout/Store'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Theme } from 'react-daisyui'
import 'react-modern-drawer/dist/index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import 'swiper/css/scrollbar'
import { config } from '../configs'
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'
import '../styles/styles.scss'
import { SaveColors } from '../utils/Utils'

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter()

   useEffect(() => {
      const colors = config.colors

      SaveColors(colors.primary, 'primary')
      SaveColors(colors.background, 'background')
      SaveColors(colors.primary, 'price')
      SaveColors(colors.secondary, 'secondary')
   }, [])

   console.log(router)

   return (
      <AuthProvider>
         <Theme dataTheme="light" className="bg-base-100">
            <CartProvider>
               <ToastContainer />
               {router.asPath !== '/' ? (
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               ) : (
                  <LayoutHome>
                     <Component {...pageProps} />
                  </LayoutHome>
               )}
            </CartProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
