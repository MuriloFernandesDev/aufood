import axios from 'axios'
import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type SignInData = {
   email: string
   password: string
}

type AuthContextType = {
   user: any | null
   signIn: (data: SignInData) => Promise<void>
   signOut: () => void
}

type AuthProviderProps = {
   children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<any | null>(null)

   async function signIn({ email, password }: SignInData) {
      try {
         const response = await axios.post('/api/auth/login', {
            email,
            password,
         })

         //salvar token no cookie

         axios
            .get('/api/user')
            .then((response) => {
               setUser(response.data.data)
               Router.push('/')
            })
            .catch(() => {
               toast.error('Ocorreu um erro, tente novamente.')
            })
      } catch (error: any) {
         console.log(error)
         toast.error('E-mail ou senha inválidos.')
      }
   } //função para realizar login

   async function signOut() {
      try {
         await axios.post('/api/logout')

         setUser(null)
      } catch {
         setUser(null)
      }
   } //função para realizar o logout

   useEffect(() => {
      const userSearch = async () => {
         //verificar se existe token
         // if (token) {
         //    axios
         //       .get('/api/user')
         //       .then((response) => {
         //          setUser(response.data.data)
         //       })
         //       .catch(() => {
         //          destroyCookie(null, '@Irriga_plis:Token')
         //       })
         // }
      }
      userSearch()
   }, []) //effect para buscar usuário pelo token

   return (
      <AuthContext.Provider
         value={{
            user,
            signIn,
            signOut,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}
