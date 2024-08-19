import React, { FC } from 'react'
import LinkApp from '@/components/components/UI/appLink';
// import icons
import { CatalogIcon, OrderIcon } from '@/icons';

const Nav: FC = () => {

    const nav = [
        { path: "/categories", icon: <CatalogIcon /> },
        { path: "/", icon: <CatalogIcon /> },
        { path: "/", icon: <CatalogIcon /> },
        { path: "/dashboard/orders", icon: <OrderIcon /> },
    ]

    return (
        <nav>
            <ul>
                {nav.map((item, index) => (
                    <li key={`nav-${index}`}>
                        <LinkApp href={item.path}>{item.icon}</LinkApp>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav