import { useState, useEffect, ChangeEvent } from "react";
import { useDebounce } from '@/components/hooks/useDebounce';
import { useTranslation } from "./useTranslation";
import { useAppSearchParams } from "./useAppSearchParams";
// import types
import { EnumProductSort, EnumFilters, EnumLang } from "@/enums";
import { IProductDto, IProductsPagination } from "@/interfaces/products.interface";
// import utils
import { scrollTop } from "@/utils/scrollTop";
import { validateSortParam } from "@/utils/validateSortParam";
import { getFiltersArray } from "@/utils/getFiltersArray";

interface IFilters {
    sort: EnumProductSort,
    page: string,
    colors: string[],
    countries: string[],
    brands: string[],
    searchTerm: string,
}

interface IHook {
    data: IProductsPagination,
    loading: boolean,
    filtersParams: IFilters,
    handleFilters: (e: ChangeEvent<HTMLInputElement>, value: number, filterName: EnumFilters) => void,
    handleSort: (sort: EnumProductSort) => void;
    getFiltersParam: () => void;
    handleClearFilters: () => void;
    handlePage: (value: number) => void;
}

type TCallback = (lang: EnumLang, args: IProductDto) => Promise<IProductsPagination>

const emptyData: IProductsPagination = { length: 0, products: [] };

export const useFilters = (item: IProductsPagination, callback: TCallback): IHook => {
    // hooks
    const { lang } = useTranslation();
    const { handleAddParam, handleRemoveParam, getParam } = useAppSearchParams();
    const debounceFilters = useDebounce(filtering, 700);

    // logic
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IProductsPagination>(item || emptyData);
    const [filtersParams, setFiltersParams] = useState<IFilters>({
        sort: EnumProductSort.NEWEST,
        page: "1",
        colors: [],
        countries: [],
        brands: [],
        searchTerm: "",
    });

    const getFiltersParam = () => {
        const colorsParam = getParam("colors");
        const countriesParam = getParam("countries");
        const brandsParam = getParam("brands");
        const sortParam = getParam("sort");
        const pageParam = getParam("page");
        const searchParam = getParam("searchTerm");

        const values: IFilters = {
            sort: validateSortParam(sortParam || ""),
            page: pageParam || "1",
            colors: getFiltersArray(colorsParam || ""),
            countries: getFiltersArray(countriesParam || ""),
            brands: getFiltersArray(brandsParam || ""),
            searchTerm: searchParam || "",
        }
        setFiltersParams(values);
        return values;
    };

    const handleFilters = async (e: ChangeEvent<HTMLInputElement>, value: number, filterName: EnumFilters) => {
        if (!value) return;
        scrollTop();
        setLoading(true);
        const { checked } = e.target;
        setFiltersParams((prev) => {
            const filters = prev[filterName] || [];
            const newFilters = checked ? [...filters, String(value)] : filters.filter(item => item !== String(value));
            if (newFilters.length > 0) {
                handleAddParam(filterName, newFilters.join("%2C"));
            } else {
                handleRemoveParam(filterName);
            }
            const currentPrev = {
                ...prev,
                page: "1",
                [filterName]: newFilters,
            };
            handleAddParam("page", "1");
            debounceFilters(currentPrev);
            return currentPrev;
        });
    };

    const handleSort = (value: EnumProductSort) => {
        if (!value) return;
        scrollTop();
        setLoading(true);
        setFiltersParams((prev) => {
            const currentPrev = {
                ...prev,
                sort: value,
            };
            filtering(currentPrev);
            return currentPrev;
        });
        handleAddParam("sort", value);
    };

    const handleClearFilters = async () => {
        setLoading(true);
        scrollTop();
        setFiltersParams((prev) => {
            const currentPrev = {
                ...prev,
                sort: EnumProductSort.NEWEST,
                page: "1",
                colors: [],
                brands: [],
                countries: [],
            };
            filtering(currentPrev);
            return currentPrev;
        });
        handleRemoveParam("page");
        handleRemoveParam("sort");
        handleRemoveParam(EnumFilters.COLORS);
        handleRemoveParam(EnumFilters.COUNTRIES);
    };

    const handlePage = (value: number) => {
        if (!value) return;
        scrollTop();
        setLoading(true);
        setFiltersParams((prev) => {
            const currentPrev = {
                ...prev,
                page: String(value),
            };
            filtering(currentPrev);
            return currentPrev;
        });
        handleAddParam("page", String(value));
    };

    async function filtering(args: IFilters) {
        const filteringProducts = await callback(lang, args);
        setData(filteringProducts || emptyData);
        setLoading(false);
    }

    // get data from searchparams
    useEffect(() => {
        getFiltersParam();
    }, []);

    return {
        data,
        loading,
        filtersParams,
        handleFilters,
        handleSort,
        getFiltersParam,
        handleClearFilters,
        handlePage,
    }
};