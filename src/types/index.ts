export interface ProductList {
   name: string
   id: number
   price: number
   product_category?: IProductCategory
   image: string
   category?: string
   description?: string
}

export interface IProductCart extends ProductList {
   product_id: number
   observation?: string
}

export interface IOrder {
   id?: number
   total_price?: number
   date?: string
   payment_method?: number
   delivery_method?: number
   consumer_id?: number
   store_id?: number
   consumer_address_id?: number
   consumer?: IConsumer
   consumer_address?: IConsumerAddress
   store?: IStore
}

export interface IConsumer {
   id?: number
   phone?: string
   phone_confirmed?: boolean
   name?: string
   email?: string
   consumer_address?: IConsumerAddress[]
}

export interface IConsumerAddress {
   id: number
   street: string
   number: string
   complement: string
   neighborhood: string
   city_id: number
   zipCode: string
   city: ICity
   consumer_id: number
   consumer: IConsumer
}

export interface IProductData {
   id: number
   name: string
   description: string
   image: string
   list_store_id: string
   product_category_id: number
   product_category: IProductCategory
}

export interface IProductCategory {
   id: number
   name: string
   icon: string
   image: string
   products: IProductCart[]
}

export interface EventTarget {
   target: {
      name: string
      value: any
   }
}

export interface IStore {
   id: number
   name: string
   logo: string
   description: string
   whatsapp: string
   email: string
   number_address: string
   cnpj: string
   background_image: string
   color_primary: string
   color_secondary: string
   color_background: string
   zip: string
   street: string
   neighborhood: string
   city_id: number
   views: number
   city: ICity
}

export interface ICity {
   id: number
   name: string
   Abbreviation: string
   state: IState
}

export interface IState {
   id: number
   name: string
   uf: string
   cities: ICity[]
}
