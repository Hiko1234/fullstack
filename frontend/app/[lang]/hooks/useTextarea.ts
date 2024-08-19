import { useRef } from "react";

export const useTextarea = () => {
    const element = useRef<HTMLTextAreaElement | null>(null);
    return element
};