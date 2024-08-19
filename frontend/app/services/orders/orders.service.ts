import { instance } from "@/api/api.interceptor";
import { IOrderResponse, IOrderCreate } from "@/interfaces/orders.interface";

const ORDERS = 'orders';

export const OrdersService = {

    async getByUser() {
        return instance.get<IOrderResponse[]>(`/${ORDERS}/user`)
    },

    async create({ poshta, products }: IOrderCreate) {
        return instance.post<{id: number, createdAt: Date}>(`/${ORDERS}`, {
            poshta,
            products
        });
    }
};