import { CategoryService } from "./category.service";
import { ICategory } from "@/interfaces/category.interface";
import { EnumLang } from "@/enums";
import { notFound } from "next/navigation";

export const getCategory = async (lang: EnumLang, perPage: number = 0): Promise<ICategory[]> => {
    try {
        const response = await CategoryService.getAll(perPage);
        const currentData = response.data.map((item) => {
            const { name_en, name_uk, ...rest } = item;
            return {
                ...rest,
                name: item[`name_${lang}`]
            }
        })
        return currentData
    } catch (error) {
        throw new Error('Failed to fetch category data');
    };
};

export const getCategoryBySlug = async (lang: EnumLang, slug: string): Promise<ICategory> => {
    try {
        const response = await CategoryService.getBySlug(slug);
        const { name_uk, name_en, ...rest } = response.data;
        return {
            ...rest,
            name: response.data[`name_${lang}`]
        }
    } catch (error) {
        notFound()
    };
};