import React, { FC, ComponentPropsWithoutRef } from 'react'
import s from "./index.module.scss";
import brand1 from "./brand1.png";
import brand2 from "./brand2.png";
import brand3 from "./brand3.png";
import brand4 from "./brand4.png";
import Image from 'next/image';
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

const brands = [brand1, brand2, brand3, brand4, brand1, brand2, brand3, brand4, brand1, brand2, brand3, brand4, brand1, brand2, brand3, brand4]

interface Props extends ComponentPropsWithoutRef<'section'> {}

const BrandsLine: FC<Props> = ({ className, ...rest }) => {
    return (
        <section {...rest} className={`${s.brands} ${className}`}>
            <Swiper
                loop
                spaceBetween={100}
                slidesPerView="auto"
                modules={[Autoplay]}
                speed={10000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
            >
                {brands?.map((item, index) => (
                    <SwiperSlide key={`brand-${index}`} className={s.brands__slider}>
                        <Image src={item} alt={`brand-${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default BrandsLine