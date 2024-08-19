import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";

interface IHook {
    handleAddParam: (key: string, value: string) => void,
    handleRemoveParam: (key: string) => void,
    getParam: (key: string) => string | null,
    searchParams: ReadonlyURLSearchParams,
}

export const useAppSearchParams = (): IHook => {
    const searchParams = useSearchParams();

    const getParam = (key: string): string | null => {
        return searchParams.get(key);
    };

    const handleAddParam = (key: string, value: string) => {
        if(typeof window === "undefined") return;
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', `?${url.searchParams.toString()}`);
    };

    const handleRemoveParam = (key: string) => {
        if(typeof window === "undefined") return;
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        window.history.pushState({}, '', `?${url.searchParams.toString()}`);
    };

    return { handleAddParam, handleRemoveParam, getParam, searchParams }
}