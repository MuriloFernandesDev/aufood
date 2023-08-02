import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Theme } from 'react-daisyui'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../components/Layout'
import { config } from '../configs'
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'
import '../styles/styles.scss'
import { SaveColors } from '../utils/Utils'

function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
      const colors = config.colors

      SaveColors(colors.primary, 'primary')
      SaveColors(colors.background, 'background')
      SaveColors(colors.primary, 'price')
      SaveColors(colors.secondary, 'secondary')
   }, [])

   return (
      <AuthProvider>
         <Theme dataTheme="light" className="bg-base-100">
            <CartProvider>
               <ToastContainer />
               <Layout>
                  <Component {...pageProps} />
               </Layout>
            </CartProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
