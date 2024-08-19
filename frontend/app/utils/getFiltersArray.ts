export const getFiltersArray = (param: string): string[] => {
    if (!param) return [];

    const ids = param.split("%2C");
    if (ids.length === 0) return [];
    return ids.map(id => id.trim());
};
