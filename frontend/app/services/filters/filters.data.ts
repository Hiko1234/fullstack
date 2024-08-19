import { EnumLang } from "@/enums";
import { IFilters } from "@/interfaces/filters.interface";
import { FiltersService } from "./filters.service";

export const getFilters = async (lang: EnumLang): Promise<IFilters> => {
    try {
        const response = await FiltersService.getFilters();
        const countries = response.data.countries.map((item) => {
            const { name_en, name_uk, ...rest } = item;
            return {
                ...rest,
                name: item[`name_${lang}`]
            }
        })
        const colors = response.data.colors.map((item) => {
            const { name_en, name_uk, ...rest } = item;
            return {
                ...rest,
                name: item[`name_${lang}`]
            }
        })
        return {
            countries,
            colors,
            brands: response.data.brands,
        }
    } catch (error) {
        throw new Error('Failed to fetch filters data');
    };
};