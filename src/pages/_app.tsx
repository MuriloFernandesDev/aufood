//** Imports NEXT
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

//** Imports DaisyUI/ReactToastify
import { Theme } from 'react-daisyui'
import { ToastContainer } from 'react-toastify'

//** Imports CSS
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../styles/styles.scss'

//** Imports Contexts
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'

//** Imports Components
import LayoutHome from '@components/Layout/Home'
import Layout from '@components/Layout/Store'

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter()

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
