import { useContext } from "react";
import { TranslationContext } from "../providers/LangProvider";

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    return context;
};
