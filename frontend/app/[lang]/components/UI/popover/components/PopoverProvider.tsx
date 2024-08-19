"use client"

import { createContext, useContext } from "react";

interface Props {
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export const PopoverContext = createContext<Props>(null!);

export const usePopoverContext = () => {
    const props = useContext(PopoverContext);
    if(!props){
        throw new Error("No popover context found!");
    }
    return props;
};