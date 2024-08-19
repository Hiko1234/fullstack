export interface ICategoryResponse {
    id: number,
    name_uk: string,
    name_en: string,
    image: string,
    slug: string,
};

export interface ICategory extends Omit<ICategoryResponse, "name_uk" | "name_en"> {
    name: string
}