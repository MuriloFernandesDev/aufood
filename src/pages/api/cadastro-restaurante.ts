import { NextApiRequest, NextApiResponse } from 'next'
import request from 'superagent'

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { body } = req

   const data = {
      ...body,
      listIds: [9],
   }

   if (req.method === 'POST') {
      try {
         const response = await request
            .post('https://api.brevo.com/v3/contacts')
            .send(data)
            .set({
               'Content-Type': 'Application/json',
               'api-key': process.env.NEXT_APP_API_EMAIL,
            })

         res.status(response.status).json(response.body)
      } catch (error) {
         const err = error as request.ResponseError

         // console.log(err.response)

         res.status(err.status || 500).json(
            JSON.parse(err?.response?.text ?? '{}') || 'Something went wrong'
         )
      }
   } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
   }
}
