"use client"

import React, { FC, PropsWithChildren, useState } from 'react'
import s from "./index.module.scss";

interface Props {
    title: string,
    active?: boolean
}

const Tooltip: FC<PropsWithChildren<Props>> = ({ title, active = true, children }) => {
    const [open, setOpen] = useState<boolean>(false);

    const onMouseEnter = () => setOpen(true);
    const onMouseLeave = () => setOpen(false);

    if (!active) return <>{children}</>;

    return (
        <div
            className={s.tooltip}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
            <article className={`${s.tooltip__message} ${open && s.open}`}>{title}</article>
        </div>
    )
}

export default Tooltip