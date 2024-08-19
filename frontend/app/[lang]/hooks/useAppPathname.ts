import { usePathname } from "next/navigation";
import { useTranslation } from "./useTranslation";
import { EnumLang } from "@/enums";

export const useAppPathname = () => {
    const { lang } = useTranslation();
    const pathname = usePathname();
    
    if(lang === EnumLang.UK) return pathname;

    return `/${lang}/${pathname.split('/').slice(2).join('/')}`;
}