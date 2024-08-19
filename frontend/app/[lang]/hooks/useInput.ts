import { useRef } from "react";

export const useInput = () => {
    const element = useRef<HTMLInputElement | null>(null);
    return element
};