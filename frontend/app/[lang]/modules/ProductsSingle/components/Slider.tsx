"use client"

import React, { FC, useState } from 'react'
import s from "../index.module.scss";
import Image from 'next/image';
import img from "../../../components/UI/cards/product-item/image.jpg";
import img1 from "../../../components/UI/cards/category-item/image.jpg"
import { EnumStyleVariables } from '@/enums';
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import "swiper/css";

const imagesFake = [img, img1, img, img1, img, img1, img, img1];

interface Props {
    images: string[],
}

const Slider: FC<Props> = ({ images }) => {
    const [active, setActive] = useState<number>(0);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <section className={s.slider}>
            <Swiper
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                speed={1000}
                className={`card ${s.slider__main}`}
                onNavigationNext={() => setActive((active + 1) % images.length)}
                onNavigationPrev={() => setActive((active - 1 + images.length) % images.length)}
                onSlideChange={(e: SwiperType) => setActive(e.activeIndex)}
            >
                {images?.length > 0 ? images?.map((image, index: number) => (
                    <SwiperSlide key={`main-image-${index}`}>
                        <article>
                            <Image priority src={image} alt={`main-image-${index}`} width={1000} height={1000} />
                        </article>
                    </SwiperSlide>
                )) : imagesFake?.map((image, index: number) => (
                    <SwiperSlide key={`main-image-${index}`}>
                        <article>
                            <Image priority src={image} alt={`main-image-${index}`} width={100} height={100} />
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                spaceBetween={10}
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                slidesPerView={5}
                className={s.slider__items}
            >
                {images?.length > 0 ? images?.map((image, index: number) => (
                    <SwiperSlide key={`secondary-image-${index}`}>
                        <article className="card" style={{ border: index === active ? `1px solid ${EnumStyleVariables.PRIMARY}` : "" }}>
                            <Image priority src={image} alt={`secondary-image-${index}`} width={100} height={100} />
                        </article>
                    </SwiperSlide>
                )) : imagesFake?.map((image, index: number) => (
                    <SwiperSlide key={`secondary-image-${index}`}>
                        <article className="card" style={{ border: index === active ? `1px solid ${EnumStyleVariables.PRIMARY}` : "" }}>
                            <Image priority src={image} alt={`secondary-image-${index}`} width={100} height={100} />
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Slider