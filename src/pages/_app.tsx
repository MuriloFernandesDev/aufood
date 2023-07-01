import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Theme } from 'react-daisyui'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { config } from '../configs'
import { AuthProvider } from '../hooks/AuthContext'
import { CartProvider } from '../hooks/useCart'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
      const colors = config.colors

      document.documentElement.style.setProperty(
         '--color-primary',
         colors.primary
      )
      document.documentElement.style.setProperty(
         '--color-background',
         colors.background
      )
      document.documentElement.style.setProperty(
         '--color-price',
         colors.primary
      )
   }, [])

   return (
      <AuthProvider>
         <Theme dataTheme="theme_store" className="bg-base-100">
            <CartProvider>
               <ToastContainer />
               <Component {...pageProps} />
            </CartProvider>
         </Theme>
      </AuthProvider>
   )
}

export default MyApp
