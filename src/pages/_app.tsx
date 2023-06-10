import type { AppProps } from 'next/app'
import { Theme } from 'react-daisyui'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthProvider>
         <Theme dataTheme="light">
            <CartProvider>
               <ToastContainer />
               <div className="m-3">
                  <Component {...pageProps} />
               </div>
            </CartProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
