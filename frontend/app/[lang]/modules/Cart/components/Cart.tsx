"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
import { useTypedSelector } from '@/components/hooks/useTypedSelector';
// import components
import CartCard from '@/components/components/UI/cards/cart-item';
import Button from '@/components/components/UI/buttons/Button';

const Cart: FC = () => {
    const { dict } = useTranslation();
    const { products } = useTypedSelector((state) => state.cart);

    return (
        <section className={s.cart}>
            <h1>{dict.cart.title}</h1>
            <div className={s.cart__cards}>
                {products?.length > 0 ? products?.map((item, index) => (
                    <CartCard key={`cart-card-${index}`} data={item} />
                )) : (
                    <div className={s.cart__noGoods}>
                        <h2>{dict.no_goods}</h2>
                        <Button link href={"/products"}>{dict.nav.link1}</Button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Cart