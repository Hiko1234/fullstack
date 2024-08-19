import { instance } from "@/api/api.interceptor";
import { IFiltersResponse } from "@/interfaces/filters.interface";

const FILTERS = 'filters';

export const FiltersService = {
    
    async getFilters() {
        return instance.get<IFiltersResponse>(`/${FILTERS}`);
    }
};