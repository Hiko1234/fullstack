import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackBarProvider";

export const useNotify = () => {
    const context = useContext(SnackbarContext);
    return context;
};
