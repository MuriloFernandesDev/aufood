//** Imports NEXT
import type { AppProps } from 'next/app'

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
import { StoreProvider } from '@hooks/useStore'
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'

//** Imports Components

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthProvider>
         <Theme dataTheme="light" className="bg-base-100">
            <CartProvider>
               <StoreProvider>
                  <ToastContainer />
                  <Component {...pageProps} />
               </StoreProvider>
            </CartProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
