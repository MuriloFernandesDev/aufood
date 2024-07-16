import axios from 'axios'
import https from 'https'

export const link = process.env.NEXT_PUBLIC_API_URL

export function ApiService() {
   // const { '@Irriga_plis:Token': token } = parseCookies(ctx)

   const api = axios.create({
      baseURL: `${link}`,
      headers: {
         'Content-type': 'application/json',
         // Authorization: `Bearer ${token}`,
      },
      httpsAgent: new https.Agent({
         rejectUnauthorized: false, // Isso faz com que o Axios aceite certificados autoassinados
      }),
   })
   return api
}

export const api = ApiService()
