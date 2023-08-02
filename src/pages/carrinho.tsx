import Link from 'next/link'
import { FaShoppingBag } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const Cart = (): JSX.Element => {
   const { cart, somaTotal, cartSize } = useCart()

   return (
      <div className="max-w-7xl mx-auto py-10 px-4 pt-24">
         <div className="flex w-full">
            <h1 className="font-semibold text-3xl text-primary">
               Meu carrinho
            </h1>
         </div>
         <div className="divider bg-primary/20 h-[1px]" />
         {cartSize > 0 ? (
            <div className="grid md:grid-cols-4 md:gap-10">
               <div className="md:col-span-2">
                  <div className="flex flex-wrap gap-8">
                     {cartSize &&
                        cart.map((product) => (
                           <ProductCard
                              category="Lanches"
                              name={product.name}
                              price={product.price}
                              timeDelivery="25-30min"
                              id={1}
                           />
                        ))}
                  </div>
               </div>
               <div className="flex flex-col gap-5 md:col-span-2">
                  <div className="divider m-0" />
                  <div className="flex justify-between">
                     <span className="font-thin text-xs">
                        {cartSize > 1
                           ? `${cartSize} Produtos`
                           : `${cartSize} Produto`}
                     </span>
                  </div>
                  <div className="divider m-0" />
                  <div className="flex justify-between">
                     <span className="font-thin text-lg">Total</span>
                     <span>{somaTotal}</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-3">
                     <button className="btn btn-primary">
                        Comprar mais produtos
                     </button>
                     <button className="btn btn-success text-white">
                        Finalizar compra
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex flex-col gap-8 my-10 items-center max-w-3xl mx-auto">
               <FaShoppingBag />
               <h1 className="text-2xl font-bold">Carrinho vazio!</h1>
               <span>Você ainda não possui itens no seu carrinho.</span>
               <Link href="/produtos">
                  <button className="btn btn-success text-white">
                     Ver produtos
                  </button>
               </Link>
            </div>
         )}
      </div>
   )
}

export default Cart
