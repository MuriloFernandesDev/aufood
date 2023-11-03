export interface IProduct {
   id: number
   name: string
   price: number
   image: string
   quantity: number
}

export interface ICart {
   id?: number
   totalPrice?: number
   date?: string
   paymentMethod?: string
   deliveryMethod?: string
   consumerId?: number
   storeId?: number
   consumerAddressId?: number
   consumer?: IConsumer
   consumerAddress?: IConsumerAddress
   store?: IStore
}

export interface IConsumer {
   id?: number
   phone?: string
   phoneConfirmed?: boolean
   name?: string
   email?: string
   consumerAddress?: IConsumerAddress[]
}

export interface IConsumerAddress {
   id: number
   cep: string
   street: string
   number: string
   complement: string
   neighborhood: string
   cityId: number
   zipCode: string
   city: ICity
   consumerId: number
   consumer: IConsumer
}

export interface IProductData {
   id: number
   name: string
   description: string
   qtdPeopleServe: number
   timeDelivery: number
   image: string
   listStoreId: string
   productCategoryId: number
   productCategory: IProductCategory
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
   backgroundImage: string
   cep: string
   cityId: number
   cnpj: string
   description: string
   email: string
   facebookUrl: string
   id: number
   instagramUrl: string
   logo: string
   name: string
   numberAddress: string
   phone: string
   storeCategoryStores: null
   street: string
   whatsapp: string
   city: ICity
   colorBackground: string
   colorPrimary: string
   colorSecondary: string
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
