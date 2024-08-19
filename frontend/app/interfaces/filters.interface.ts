export interface IFilterResponse {
    id: number,
    name_uk: string,
    name_en: string,
}

export interface IFilter extends Omit<IFilterResponse, "name_uk" | "name_en"> {
    name: string
};

export interface IFiltersResponse{
    countries: IFilterResponse[],
    colors: IFilterResponse[],
    brands: IFilter[],
}

export interface IFilters{
    countries: IFilter[],
    colors: IFilter[],
    brands: IFilter[],
}