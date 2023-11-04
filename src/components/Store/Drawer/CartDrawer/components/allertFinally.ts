import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const allertFinallyDelivery = (message: string) => {
   MySwal.fire({
      title: 'Estamos processando o seu pedido!',
      html: "<p style='color: var(--color-primary)'>Geralmente não demora muito</p>",
      allowOutsideClick: false,
      didOpen: async () => {
         Swal.showLoading()

         try {
            // Faz a requisição com Axios (substitua pela sua própria lógica)
            await new Promise((resolve) => setTimeout(resolve, 3000)).then(
               () => {
                  MySwal.fire({
                     icon: 'success',
                     title: 'Sucesso',
                     text: message,
                  })
               }
            )

            // MySwal.fire({
            //     icon: 'success',
            //     title: 'Sucesso',
            //     text: message,
            //  })

            // Fecha o alerta
         } catch (error) {
            // Exibir um alerta de erro, se necessário
            MySwal.fire({
               icon: 'error',
               title: 'Ops...',
               text: 'Algo deu errado!',
            })
         } finally {
            // MySwal.close()
            MySwal.hideLoading()
         }
      },
   })
}
