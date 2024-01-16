export interface IProduct {
   id: number
   name: string
   price: number
   image: string
   quantity: number
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
   products: IProduct[]
}

export interface EventTarget {
   target: {
      name: string
      value: any
   }
}

export interface IStore {
   address: string
   background_image: string
   zip: string
   city_id: number
   cnpj: string
   description: string
   email: string
   id: number
   logo: string
   name: string
   number_address: string
   phone: string
   store_category_stores: null
   street: string
   whatsapp: string
   city: ICity
   color_background: string
   color_primary: string
   color_secondary: string
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
