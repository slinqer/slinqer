import { IProduct, IProductPresentation } from "./Product.interface";

export interface ICartProduct extends IProduct {
  presentationSelected: IProductPresentation,
  qty: number
}


export interface IOrder {
  name: string,
  phone: number,
  payment: string,
  shipment: string,
  address: {
    address: string,
    city: string,
    comments?: string
  },
  products: ICartProduct[]
}