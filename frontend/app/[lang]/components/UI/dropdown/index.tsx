"use client"

import React, { FC, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import s from "./index.module.scss";
// import icons
import { ArrowIcon } from '@/icons';

interface Props {
    title: ReactNode | string,
}

const Dropdown: FC<PropsWithChildren<Props>> = ({ title, children }) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const onClick = () => {
        if (!contentRef.current) return;

        const contentHeight = contentRef.current.scrollHeight;
        contentRef.current.style.height = open ? "0px" : `${contentHeight}px`;
        contentRef.current.style.padding = open ? "0px" : `10px 0`;
        contentRef.current.style.visibility = open ? "hidden" : "visible";
        contentRef.current.style.opacity = open ? "0" : "1";
        setOpen(prev => !prev);
    };

    return (
        <article className={s.dropdown}>
            <div className={s.dropdown__title} onClick={onClick}>
                <span>{title}</span>
                <ArrowIcon style={{
                    transition: "0.5s",
                    transform: `rotate(${open ? "180deg" : 0})`,
                }} />
            </div>
            <div ref={contentRef} className={s.dropdown__content} style={{
                height: "0px",
                visibility: "hidden",
                opacity: 0,
                padding: 0,
            }}>
                {children}
            </div>
        </article>
    )
}

export default Dropdown