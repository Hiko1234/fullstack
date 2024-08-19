export const removeKeysObj = <T extends Record<string, any>>(
    obj: T,
    keysToRemove: string[]
): Partial<T> => {
    const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
    ) as Partial<T>;

    return filteredObj;
};
