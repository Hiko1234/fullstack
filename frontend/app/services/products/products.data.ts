import { notFound } from "next/navigation";
import { EnumLang } from "@/enums";
import { IProductDto, IProductsPagination, IProduct } from "@/interfaces/products.interface";
import { ProductsService } from "./products.service";
import { productsPerPage } from "constants/perPage";
// import utils
import { removeKeysObj } from "@/utils/removeKeyObj";

export const getProducts = async (lang: EnumLang, {
    sort,
    page,
    searchTerm,
    colors,
    countries,
    brands,
}: IProductDto): Promise<IProductsPagination> => {
    try {
        const response = await ProductsService.getAll({
            perPage: productsPerPage,
            lang,
            sort,
            page,
            colors,
            countries,
            brands,
            searchTerm,
        });
        const currentData = response.data.products.map((item) => {
            const { name_en, name_uk, ...rest } = item;
            return {
                ...rest,
                name: item[`name_${lang}`]
            }
        })
        return {
            length: response.data.length,
            products: currentData,
        }
    } catch (error) {
        throw new Error('Failed to fetch products data');
    };
};

export const getProductsBySlug = async (lang: EnumLang, {
    sort,
    page,
    slug,
    colors,
    countries,
    brands
}: IProductDto): Promise<IProductsPagination> => {
    try {
        const response = await ProductsService.getByCategory({
            perPage: productsPerPage,
            slug,
            sort,
            page,
            colors,
            countries,
            brands,
        });
        const currentData = response.data.products.map((item) => {
            const { name_en, name_uk, ...rest } = item;
            return {
                ...rest,
                name: item[`name_${lang}`]
            }
        })
        return {
            length: response.data.length,
            products: currentData,
        }
    } catch (error) {
        throw new Error('Failed to fetch products by category data');
    };
};

export const getProductBySlug = async (lang: EnumLang, slug: string): Promise<any> => {
    try {
        const response = await ProductsService.getBySlug({ slug });

        const removeItems = [
            "name_uk",
            "name_en",
            "description_uk",
            "description_en",
            "category",
            "colors",
            "country",
            "productCharacteristic",
        ];

        const product = removeKeysObj(response.data, removeItems);
        const currentCategory = {
            id: response.data.category.id,
            image: response.data.category.image,
            name: response.data.category[`name_${lang}`],
            slug: response.data.category.slug,
        }

        const currentCountry = {
            id: response.data.country.id,
            name: response.data.country[`name_${lang}`],
        }

        const currentColors = response.data.colors.map((item) => ({
            id: item.id,
            name: item[`name_${lang}`],
        }));

        const currentCharacteristic = response.data.productCharacteristic.map((item) => ({
            characteristicItem: {
                id: item.characteristicItem.id,
                name: item.characteristicItem.name,
                characteristic: {
                    id: item.characteristicItem.characteristic.id,
                    name: item.characteristicItem.characteristic[`name_${lang}`],
                }
            }
        }))

        return {
            name: response.data[`name_${lang}`],
            description: response.data[`description_${lang}`],
            reviews: response.data.reviews,
            category: currentCategory,
            country: currentCountry,
            colors: currentColors,
            productCharacteristic: currentCharacteristic,
            ...product,
        };
    } catch (error) {
        notFound()
    };
};

export const getSimilarProducts = async (lang: EnumLang, id: number): Promise<IProduct[]> => {
    try {
        const response = await ProductsService.getSimilar({
            id,
            perPage: +productsPerPage,
        });
        const currentData = response.data.map((item) => {
            const { name_en, name_uk, ...rest } = item;
            return {
                ...rest,
                name: item[`name_${lang}`]
            }
        });
        return currentData
    } catch (error) {
        throw new Error('Failed to fetch products data');
    };
};