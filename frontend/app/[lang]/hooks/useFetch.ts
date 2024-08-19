import { useState, useCallback } from "react";
import { errorCatch } from "@/api/api.helper";
import { AxiosPromise, AxiosResponse } from "axios";

interface IState<T> {
    data: T | null,
    error: string,
    loading: boolean,
}

interface IHook<T> extends IState<T> {
    fetch: (params?: any) => Promise<void>,
}

type RequestFunction<T, P = void> = (params?: P) => AxiosPromise<T>;

export const useFetch = <T, P>(request: RequestFunction<T, P>): IHook<T> => {
    const [state, setState] = useState<IState<T>>({
        data: null,
        error: "",
        loading: false,
    });

    const fetch = useCallback(async (params?: P) => {
        setState({ data: null, error: "", loading: true });

        try {
            const response: AxiosResponse<T> = await request(params);
            setState({ data: response.data, error: "", loading: false });
        } catch (error) {
            setState({ data: null, error: errorCatch(error), loading: false });
        }
    }, [request]);

    return {
        ...state,
        fetch,
    }
};