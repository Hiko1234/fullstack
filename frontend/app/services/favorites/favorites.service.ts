import { instance } from "@/api/api.interceptor";
import { IProductResponse } from "@/interfaces/products.interface";

const FAVORITES = 'favorites';

export const FavoritesService = {

    async getByUser() {
        return instance.get<{ id: number, products: IProductResponse[] }>(`/${FAVORITES}/user`)
    },

    async add(productId: number) {
        return instance.post<number>(`/${FAVORITES}/${productId}`);
    },

    async remove(productId: number) {
        return instance.delete<string>(`/${FAVORITES}/${productId}`);
    }
};