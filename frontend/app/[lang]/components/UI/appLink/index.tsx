"use client"

import React, { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/components/hooks/useTranslation';
// import utils
import { currentPath } from '@/utils/currentPath';

type Props = {
    href: string,
    [key: string]: any;
}

const LinkApp: FC<PropsWithChildren<Props>> = ({ children, href, ...props }) => {
    const { lang } = useTranslation();

    return (
        <Link {...props} href={currentPath(lang, href)}>
            {children}
        </Link>
    )
}

export default LinkApp