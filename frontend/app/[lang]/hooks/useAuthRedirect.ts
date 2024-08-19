import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { useTranslation } from "./useTranslation";
import { currentPath } from "@/utils/currentPath";

export const useAuthRedirect = (path: string) => {
    const { user } = useAuth();
    const { replace } = useRouter();
    const { lang } = useTranslation();

    useEffect(() => {
        if (user) replace(currentPath(lang, path));
    }, [user]);
}