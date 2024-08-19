import { IProductCartResponse, IProductCart } from "./products.interface";
import { EnumOrderStatus } from "@/enums";

export interface IOrderResponse {
    id: number,
    createdAt: Date,
    status: EnumOrderStatus
    poshta: string,
    items: IProductCartResponse[]
}

export interface IOrder extends Omit<IOrderResponse, "items"> {
    items: IProductCart[]
}

export interface IOrderCreate {
    poshta: string,
    products: { productId: number, quantity: number }[],
}