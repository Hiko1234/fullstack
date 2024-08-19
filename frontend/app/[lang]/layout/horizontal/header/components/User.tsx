"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import Link from 'next/link'
import Image from 'next/image';
import { useAuth } from '@/components/hooks/useAuth';
import { useTypedSelector } from '@/components/hooks/useTypedSelector';
// import components
import Counter from '@/components/components/UI/counterIcon';
import LinkApp from '@/components/components/UI/appLink';
import SelectLang from './SelectLang';
// import icons
import { CartIcon, SearchIcon, FavoriteIcon, UserIcon, PhoneIcon } from '@/icons';

const User: FC = () => {
    const { isAuthorised, user } = useAuth();
    const wishlist = useTypedSelector((state) => state.wishlist);
    const cart = useTypedSelector((state) => state.cart);

    return (
        <>
            <LinkApp href="/wishlist">
                <Counter count={wishlist?.products?.length}>
                    <FavoriteIcon />
                </Counter>
            </LinkApp>
            <LinkApp href="/#q">
                <SearchIcon />
            </LinkApp>
            <LinkApp href="/cart">
                <Counter count={cart.products.length}>
                    <CartIcon />
                </Counter>
            </LinkApp>
            {!isAuthorised && (
                <LinkApp href="/auth">
                    <UserIcon />
                </LinkApp>
            )}
            <Link href="tel: 0681234123">
                <PhoneIcon />
            </Link>
            <div className={s.lang}>
                <SelectLang />
            </div>
            {isAuthorised && (
                <div className={s.user}>
                    <LinkApp href="/dashboard">
                        <Image src={String(user?.avatarPath)} alt={String(user?.name)} width={30} height={30} />
                    </LinkApp>
                </div>
            )}
        </>
    )
}

export default User