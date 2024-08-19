import { instance } from "@/api/api.interceptor";
import { IProductDto, IProductResponse, IProductFullsetResponse } from "@/interfaces/products.interface";

const PRODUCTS = 'products';

export const ProductsService = {

    async getAll({ sort, perPage, page, lang, colors, countries, brands, searchTerm }: IProductDto) {
        return instance.get<{ length: number, products: IProductResponse[] }>(`/${PRODUCTS}`, {
            params: {
                sort,
                perPage,
                page,
                lang,
                colors,
                countries,
                searchTerm,
                brands,
            }
        })
    },

    async getByCategory({ slug, sort, perPage, page, lang, colors, countries, brands }: IProductDto) {
        return instance.get<{ length: number, products: IProductResponse[] }>(`/${PRODUCTS}/by-category/${slug}`, {
            params: {
                sort,
                perPage,
                page,
                lang,
                colors,
                countries,
                brands,
            }
        });
    },

    async getBySlug({ slug }: { slug: string }) {
        return instance.get<IProductFullsetResponse>(`/${PRODUCTS}/by-slug/${slug}`);
    },

    async getSimilar({ id, perPage }: { id: number, perPage: number }) {
        return instance.get<IProductResponse[]>(`/${PRODUCTS}/similar/${id}`, {
            params: {
                perPage,
            }
        });
    }
};