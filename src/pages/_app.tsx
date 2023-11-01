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
import { AuthProvider } from '@hooks/AuthContext'
import { CartProvider } from '@hooks/useCart'
import { StoreProvider } from '@hooks/useStore'

//** Imports Components

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthProvider>
         <Theme dataTheme="light" className="bg-base-100">
            <StoreProvider>
               <CartProvider>
                  <ToastContainer />
                  <Component {...pageProps} />
               </CartProvider>
            </StoreProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
