"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import Image from 'next/image';
import { useAuth } from '@/components/hooks/useAuth';
import { useTypedSelector } from '@/components/hooks/useTypedSelector';
// import icons
import { CartIcon, FavoriteIcon } from '@/icons';
// import components
import Skeleton from '@/components/components/UI/skeleton';
import Counter from '@/components/components/UI/counterIcon';
import LinkApp from '@/components/components/UI/appLink';

const User: FC = () => {
    const { isAuthorised, user } = useAuth();
    const wishlist = useTypedSelector((state) => state.wishlist);
    const cart = useTypedSelector((state) => state.cart);

    return (
        <section className={s.user}>
            {!isAuthorised ? (
                <LinkApp href="/dashboard">
                    <Skeleton className={s.user__avatarSkeleton} />
                </LinkApp>
            ) : (
                <LinkApp href="/dashboard">
                    <Image className={s.user__avatar} src={String(user?.avatarPath)} alt={String(user?.name)} width={100} height={100} />
                </LinkApp>
            )}
            <LinkApp href="/wishlist">
                <Counter count={wishlist?.products?.length}>
                    <FavoriteIcon />
                </Counter>
            </LinkApp>
            <LinkApp href="/cart">
                <Counter count={cart.products.length}>
                    <CartIcon />
                </Counter>
            </LinkApp>
        </section>
    )
}

export default User