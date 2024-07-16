import { IStore } from '@types'
import { infoApp } from 'configs'
import { FaWhatsapp } from 'react-icons/fa'

interface FooterProps {
   store: IStore
}

const Footer = ({ store }: FooterProps) => {
   return (
      <footer className="footer flex flex-col py-10 px-4 text-base-100 bg-primary">
         <footer className="footer max-w-container mx-auto px-4">
            <div>
               <span className="footer-title">Social</span>
               <div className="grid grid-flow-col gap-4">
                  <a href={`https://${store.whatsapp}`} target="_blank">
                     <FaWhatsapp size={30} />
                  </a>
               </div>
            </div>
         </footer>
         <footer className="footer footer-center border-t-[1px] border-base-100 pt-4 px-4 max-w-container mx-auto">
            <div>
               <p>
                  Copyright © {new Date().getFullYear()} - Todos os direitos
                  reservados {infoApp.name}
               </p>
            </div>
         </footer>
      </footer>
   )
}

export default Footer
