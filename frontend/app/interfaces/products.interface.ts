import { EnumLang } from "@/enums"
import { IFilterResponse, IFilter } from "./filters.interface";
import { ICategoryResponse, ICategory } from "./category.interface";
import { IReview } from "./review.interface";
import { IProductCharacteristicResponse, IProductCharacteristic } from "./characteristic.interface";

export interface IProductDto {
    slug?: string,
    sort?: string,
    perPage?: string,
    page?: string,
    lang?: EnumLang,
    colors?: string[],
    countries?: string[],
    brands?: string[],
    searchTerm?: string,
}

export interface IProductResponse {
    id: number,
    createdAt: Date,
    name_uk: string,
    name_en: string,
    price: number,
    slug: string,
    images: string[],
    new: boolean,
    inStock: boolean,
    brand: { id: number, name: string },
};

export interface IProduct extends Omit<IProductResponse, "name_uk" | "name_en"> {
    name: string
};

export interface IProductsPagination {
    length: number,
    products: IProduct[]
}

export interface IProductFullsetResponse extends IProductResponse {
    description_uk: string,
    description_en: string,
    colors: IFilterResponse[],
    reviews: IReview[],
    category: ICategoryResponse,
    country: IFilterResponse,
    productCharacteristic: IProductCharacteristicResponse[],
}

export interface IProductFullset extends IProduct {
    description: string,
    colors: IFilter[],
    reviews: IReview[],
    category: ICategory,
    country: IFilter,
    productCharacteristic: IProductCharacteristic[],
}

export interface IProductCartResponse extends IProductResponse {
    quantity: number,
}

export interface IProductCart extends IProduct {
    quantity: number,
}