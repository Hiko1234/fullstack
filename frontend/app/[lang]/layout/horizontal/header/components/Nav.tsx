"use client"

import React, { FC } from 'react'
import { useTranslation } from '@/components/hooks/useTranslation';
import LinkApp from '@/components/components/UI/appLink';

const Nav: FC = () => {
    const { dict } = useTranslation();

    const nav = [
        { title: dict.nav.link1, path: "/categories" },
        { title: dict.nav.link2, path: "/" },
        { title: dict.nav.link3, path: "/" },
        { title: dict.nav.link4, path: "/" },
    ]

    return (
        <nav>
            <ul>
                {nav.map((item, index) => (
                    <li key={`nav-${index}`}>
                        <LinkApp href={item.path}>{item.title}</LinkApp>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav