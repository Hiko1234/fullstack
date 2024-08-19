import { useState } from "react";

export interface IHook {
    visible: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export const useModal = (): IHook => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleOpenModal = () => setVisible(true);
    const handleCloseModal = () => setVisible(false);

    return { visible, onOpen: handleOpenModal, onClose: handleCloseModal }
};