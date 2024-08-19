import { useCallback, useRef, MutableRefObject } from "react";

export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number) {
    const timer: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null);

    const debouncedCallback = useCallback((...args: Parameters<T>) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
};