"use client"

import React, { FC, FormEvent } from 'react'
import s from "../index.module.scss";
import img from "./hero.jpg";
import Image from 'next/image';
import { useInput } from '@/components/hooks/useInput';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useRouter } from 'next/navigation';
// import icons
import { SearchIcon } from '@/icons';
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-fade';
// import utils
import { currentPath } from '@/utils/currentPath';
// import components
import Container from '@/components/components/UI/container';

const Hero: FC = () => {
    const { dict, lang } = useTranslation();
    const { push } = useRouter();
    const search = useInput();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search.current?.value) return;
        push(currentPath(lang, `/products?searchTerm=${search.current?.value}`));
    }

    return (
        <section className={s.hero}>
            <Swiper
                slidesPerView={1}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                className={s.hero__slider}
            >
                <SwiperSlide>
                    <Image priority src={img} alt="Hero" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image priority src={img} alt="Hero" />
                </SwiperSlide>
            </Swiper>
            <Container>
                <form id="q" className={`card ${s.hero__form}`} onSubmit={onSubmit}>
                    <h3>{dict.hero.input_title}</h3>
                    <div>
                        <input
                            ref={search}
                            name="search"
                            type="text"
                            placeholder={dict.search}
                        />
                        <button>
                            <SearchIcon />
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    )
}

export default Hero