import { EnumLang } from "@/enums";

export const currentPath = (lang: string, path: string): string => {
    return lang === EnumLang.UK ? path : `/${lang}${path}`;
};
