
import { instance } from "@/api/api.interceptor";
import { ICategoryResponse } from "@/interfaces/category.interface";

const CATEGORY = 'categories';

export const CategoryService = {

    async getAll(perPage: number) {
        return instance<ICategoryResponse[]>({
            url: `/${CATEGORY}?perPage=${perPage || ""}`,
            method: 'GET',
        });
    },

    async getBySlug(slug: string) {
        return instance<ICategoryResponse>({
            url: `/${CATEGORY}/by-slug/${slug}`,
            method: 'GET',
        });
    }
};