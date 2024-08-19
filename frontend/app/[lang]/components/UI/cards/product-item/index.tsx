"use client"

import React, { FC } from 'react';
import s from "./index.module.scss";
import Image from 'next/image';
import img from "./image.jpg";
import { useTranslation } from '@/components/hooks/useTranslation';
import { useRouter } from 'next/navigation';
// import types
import { IProduct } from '@/interfaces/products.interface';
// import utils
import { currentPath } from '@/utils/currentPath';
// import components
import CartButton from '../../buttons/CartButton';
import FavoriteButton from '../../buttons/FavoriteButton';
import NewLabel from '@/components/components/newLabel';

interface Props {
    data: IProduct,
}

const Card: FC<Props> = ({ data }) => {
    const { dict, lang } = useTranslation();
    const { name, images, inStock, price, brand, createdAt, slug } = data;

    const { push } = useRouter();
    const redirect = () => push(currentPath(lang, `/products/${slug}`));

    return (
        <article
            className={`card ${s.card}`}
            onClick={redirect}
        >
            <div className={s.card__header}>
                <div className={s.card__labels}>
                    <ul>
                        <NewLabel createdAt={createdAt} />
                    </ul>
                </div>
                <FavoriteButton product={data} />
            </div>
            <div className={s.wrapper}>
                <Image src={images[0] || img} alt={`product-${name}`} width={1000} height={1000} />
                <h6>{name}</h6>
                <span className={s.redtext}>{brand.name}</span>
            </div>
            <div className={s.card__footer}>
                <div className={s.wrapper}>
                    <span className={s.card__price}>₴ {price}</span>
                    <span className={s.redtext} style={{
                        textDecoration: inStock ? "none" : "line-through",
                        whiteSpace: "nowrap",
                    }}>{dict?.in_stock}</span>
                </div>
                <CartButton inStock={inStock} product={data} />
            </div>
        </article>
    )
}

export default Card