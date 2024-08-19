"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
import { useParams } from 'next/navigation';
// import types
import { IProductFullset } from '@/interfaces/products.interface';
import { EnumStyleVariables } from '@/enums';
// import components
import CartButton from '@/components/components/UI/buttons/CartButton';
import FavoriteButton from '@/components/components/UI/buttons/FavoriteButton';
import Button from '@/components/components/UI/buttons/Button';

interface Props {
    product: IProductFullset,
}

const Info: FC<Props> = ({ product }) => {
    const { dict } = useTranslation();
    const { slug } = useParams();

    return (
        <section className={s.info}>
            <div className="card">
                <h1>{product?.name}</h1>
                <span style={{ color: EnumStyleVariables.PRIMARY }}>{product?.brand?.name}</span>
                {product?.productCharacteristic?.length > 0 && (
                    <ul>
                        {product?.productCharacteristic?.slice(0, 6)?.map((item, index) => (
                            <li key={`characteristic-${index}`}>{item?.characteristicItem?.characteristic?.name}: {item?.characteristicItem?.name}</li>
                        ))}
                    </ul>
                )}
                <div className={s.info__items}>
                    <h3>{dict.country}</h3>
                    <div>
                        <article>{product?.country?.name}</article>
                    </div>
                </div>
                {product?.colors?.length > 0 && (
                    <div className={s.info__items} style={{ flex: "1 1 auto" }}>
                        <h3>{dict.color}</h3>
                        <div>
                            {product?.colors?.map((item, index) => (
                                <article key={`color-${index}`}>{item.name}</article>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <h2>₴ {product?.price || 0}</h2>
                    <span style={{
                        color: EnumStyleVariables.PRIMARY,
                        textDecoration: product?.inStock ? "none" : "line-through",
                    }}>{dict.in_stock}</span>
                </div>
                <div className={s.info__user}>
                    <CartButton large inStock={product.inStock} product={product} />
                    <FavoriteButton large product={product} />
                </div>
            </div>
            <div>
                <Button className="card" link href={`/products/${slug}#characteristics`}>{dict.all_characteristics}</Button>
                <Button className="card" link href={`/products/${slug}#description`}>{dict.description}</Button>
                <Button className="card" link href={`/products/${slug}#reviews`}>{dict.review.reviews}</Button>
                <Button className="card" link href={`/products/${slug}#similar`}>{dict.similar_goods}</Button>
            </div>
        </section>
    )
}

export default Info