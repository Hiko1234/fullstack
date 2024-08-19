import React, { FC, PropsWithChildren, useState, useEffect } from 'react'
import { TSnackVariant } from '@/components/providers/SnackBarProvider'
import s from "./index.module.scss";
// import icons
import { ErrorIcon, SuccessIcon, WarningIcon } from '@/icons';

const ICONS = {
    success: <SuccessIcon style={{ minWidth: 24, minHeight: 24 }} />,
    error: <ErrorIcon style={{ minWidth: 24, minHeight: 24 }} />,
    warning: <WarningIcon style={{ minWidth: 24, minHeight: 24 }} />,
};

const Notify: FC<PropsWithChildren<TSnackVariant & { timer: number }>> = ({ children, variant = "success", timer }) => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow(true);
        const timeOut = setTimeout(() => {
            setShow(false);
        }, timer);

        return () => clearTimeout(timeOut);
    }, []);

    return (
        <article
            className={`${s.notify} ${show ? s.notifyEnter : s.notifyExit}`}
            style={{ backgroundColor: variant === "error" ? "#FF4B4B" : variant === "warning" ? "#FFA000" : "#43a047" }}
        >
            {ICONS[variant]}
            <p>{children}</p>
        </article >
    )
}

export default Notify