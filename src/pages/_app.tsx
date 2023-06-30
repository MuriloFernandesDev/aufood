import type { AppProps } from 'next/app'
import { Theme } from 'react-daisyui'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthProvider>
         <Theme dataTheme="light" className="bg-base-100">
            <CartProvider>
               <ToastContainer />
               <Component {...pageProps} />
            </CartProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
