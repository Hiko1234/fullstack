"use client"

import React, { useState, FC } from 'react';
import s from "../index.module.scss";
import Link from 'next/link';
import { useTranslation } from '@/components/hooks/useTranslation';
// import components
import SelectLang from './SelectLang';

const Burder: FC = () => {
    const { dict } = useTranslation();
    const [active, setActive] = useState<boolean>(false);

    const onClick = () => setActive(prev => !prev);

    const nav = [
        { title: dict.nav.link1, path: "/categories" },
        { title: dict.nav.link2, path: "/" },
        { title: dict.nav.link3, path: "/" },
        { title: dict.nav.link4, path: "/" },
    ]

    return (
        <div className={s.burger}>
            <button className={`${s.burger__btn} ${active && s.active}`} onClick={onClick}>
                <div className={s.burger__icon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className={`${s.burger__menu} ${active && s.active}`}>
                <ul>
                    {nav.map((item, index) => (
                        <li key={`nav-${index}`}>
                            <Link href={item.path} onClick={() => setActive(false)}>{item.title}</Link>
                        </li>
                    ))}
                    <li>
                        <div className={s.lang} style={{ display: "block" }}>
                            <SelectLang />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Burder