export interface ICharacteristicResponse {
    id: number,
    name_uk: string,
    name_en: string,
}

export interface ICharacteristic extends Omit<ICharacteristicResponse, "name_uk" | "name_en"> {
    name: string
};

export interface ICharacteristicItemResponse {
    id: number,
    name: string,
}

export interface IProductCharacteristicResponse {
    characteristicItem: {
        id: number,
        name: string,
        characteristic: ICharacteristicResponse,
    }
}

export interface IProductCharacteristic {
    characteristicItem: {
        id: number,
        name: string,
        characteristic: ICharacteristic,
    }
}