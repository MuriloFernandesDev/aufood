import { infoApp } from 'configs'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
   return (
      <footer className="footer flex flex-col py-10 px-4 bg-base-200 default-text shadow-black drop-shadow-2xl">
         <div className="footer max-w-container mx-auto px-4">
            <div>
               <span className="footer-title">Social</span>
               <div className="grid grid-flow-col gap-4">
                  <a href={infoApp.social_networks.instagram} target="__blank">
                     <FaInstagram size={30} />
                  </a>

                  <a
                     href={`
                     mailto:${infoApp.social_networks.email}?subject=Contato
                  `}
                     target="__blank"
                  >
                     <MdEmail size={30} />
                  </a>
               </div>
            </div>
         </div>

         <div className="footer footer-center border-t-[1px] border-base-100 pt-4 px-4 max-w-container mx-auto grid grid-cols-1 col-span-1 md:grid-cols-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-center md:col-span-4">
               <Link href="/">
                  <img src={infoApp.logo} alt={infoApp.name} width={80} />
               </Link>
               <div className="flex flex-col text-start items-start gap-2 text-sm">
                  <span>
                     © Copyright {new Date().getFullYear()} -{' '}
                     <b>{infoApp.name}</b> - Todos os direitos reservados{' '}
                     <b>{infoApp.name}</b> com Agência de Restaurantes Online
                     S.A.
                  </span>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
