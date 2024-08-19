"use client"

import React, { FC, ComponentPropsWithoutRef } from 'react'
import s from "./index.module.scss";
// import types
import { IProduct } from '@/interfaces/products.interface';
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import "swiper/css";
// import components
import Card from '../UI/cards/product-item';

interface Props extends ComponentPropsWithoutRef<'section'> {
    title: string,
    products: IProduct[]
}

const ProductsCarousel: FC<Props> = ({ title, products, ...rest }) => {
    if (!products || products?.length === 0) return null;
    return (
        <section {...rest} className={s.carousel}>
            <h2>{title}</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto"
                modules={[Autoplay]}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                className={s.carousel__slider}
            >
                {products?.map((item, index) => (
                    <SwiperSlide className={s.carousel__slide} key={`product-${index}`}>
                        <Card data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section >
    )
}

export default ProductsCarousel