interface IActions {
    getItem: (key: string) => any,
    setItem: (key: string, data: any) => any,
    removeItem: (key: string) => any,
}

// checking for json type
export const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const actionsLS: IActions = {

    getItem: (key: string) => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(key);
            return data && isJson(data) ? JSON.parse(data) : null;
        }
    },

    setItem: (key: string, data: any) => {
        const json = JSON.stringify(data);
        localStorage.setItem(key, json);
    },

    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
};