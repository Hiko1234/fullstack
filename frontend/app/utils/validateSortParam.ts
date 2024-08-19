import { EnumProductSort } from "@/enums";

export const validateSortParam = (value: string): EnumProductSort => {
    if (Object.values(EnumProductSort).includes(value as EnumProductSort)) {
        return value as EnumProductSort;
    }
    return EnumProductSort.NEWEST;
}