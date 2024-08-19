"use client"

import React from 'react'
import s from "../index.module.scss";
import { useTypedSelector } from '@/components/hooks/useTypedSelector';
import { useTranslation } from '@/components/hooks/useTranslation';
// import components
import WishlistCard from '@/components/components/UI/cards/wishlist-item';
import Button from '@/components/components/UI/buttons/Button';

const Wishlist = () => {
  const { dict } = useTranslation();
  const { products } = useTypedSelector((state) => state.wishlist);

  return (
    <section className={s.wishlist}>
      <h1>{dict.wishlist.title}</h1>
      <div className={s.wishlist__cards}>
        {products?.length > 0 ? products?.map((item, index) => (
          <WishlistCard key={`card-${index}`} data={item} />
        )) : (
          <div className={s.wishlist__noGoods}>
            <h2>{dict.no_goods}</h2>
            <Button link href={"/products"}>{dict.nav.link1}</Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Wishlist