import { instance } from "@/api/api.interceptor";
import { IProductCartResponse } from "@/interfaces/products.interface";

const CARTS = 'carts';

export const CartsService = {

    async getByUser() {
        return instance.get<{ id: number, products: IProductCartResponse[] }>(`/${CARTS}/user`)
    },

    async add(productId: number, quantity: number) {
        return instance.post<string>(`/${CARTS}`, {
            productId,
            quantity
        });
    },

    async remove(productId: number) {
        return instance.delete<string>(`/${CARTS}/${productId}`);
    },

    async clear() {
        return instance.delete<string>(`/${CARTS}/user/clear`)
    }
};