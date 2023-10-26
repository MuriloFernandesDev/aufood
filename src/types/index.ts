export interface IProduct {
   product_id: number
   name: string
   price: number
   image: string
   quantity: number
}

export interface handlePersonalInfoProps {
   target: {
      name: string
      value: string
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
