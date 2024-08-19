"use client"

import React, { FC, FormEvent, useState } from 'react'
import s from "../index.module.scss";
import { useTextarea } from '@/components/hooks/useTextarea';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useNotify } from '@/components/hooks/useNotify';
import { useAuth } from '@/components/hooks/useAuth';
import { useRouter } from 'next/navigation';
// import service
import { ReviewsService } from '@/services/reviews/reviews.service';
// import utils
import { currentPath } from '@/utils/currentPath';
// import types
import { IReview } from '@/interfaces/review.interface';
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import "swiper/css";
// import components
import Stars from '@/components/components/UI/inputs/starts';
import Button from '@/components/components/UI/buttons/Button';
import Textarea from '@/components/components/UI/inputs/textarea';
import ReviewCard from '@/components/components/UI/cards/review-item';
import Tooltip from '@/components/components/UI/tooltip';

interface Props {
    productId: number,
    reviews: IReview[]
}

const Reviews: FC<Props> = ({ reviews, productId }) => {
    const { dict, lang } = useTranslation();
    const { isAuthorised } = useAuth();
    const { notify } = useNotify();
    const { push } = useRouter();
    const review = useTextarea();
    const [rating, setRating] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);

    const onChange = (value: number) => setRating(value);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);

        if (!productId) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return setDisabled(false);
        }

        if (!isAuthorised) {
            notify({ msg: dict.review.auth, variant: "warning" });
            push(currentPath(lang, "/auth"));
            return setDisabled(false);
        };

        if (!review?.current?.value) {
            notify({ msg: dict.review.warning_text, variant: "warning" });
            return setDisabled(false);
        }

        if (rating === 0) {
            notify({ msg: dict.review.warning_rating, variant: "warning" });
            return setDisabled(false);
        }

        try {
            await ReviewsService.create(productId, { text: review?.current?.value, rating });;
            notify({ msg: dict.review.success, variant: "success" });
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
        } finally {
            review.current.value = "";
            setRating(0);
            setDisabled(false);
        }
    };

    return (
        <section id="reviews" className={s.reviews}>
            <div className={`card ${s.reviews__cards}`}>
                <h2>{dict.review.reviews}</h2>
                {reviews?.length > 0 ? (
                    <Swiper
                        spaceBetween={32}
                        slidesPerView={1}
                        modules={[Autoplay]}
                        speed={1000}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                    >
                        {reviews?.map((item, index) => (
                            <SwiperSlide key={`review-${index}`}>
                                <ReviewCard data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : <h3 style={{ fontWeight: 500 }}>{dict.review.no_reviews}</h3>}
            </div>
            <form className={`card ${s.reviews__form}`} onSubmit={onSubmit}>
                <h2>{dict.review.write}</h2>
                <Textarea ref={review} placeholder={dict.review.review} />
                <Stars rate={rating} onChange={onChange} />
                <Tooltip title={dict.review.auth} active={!isAuthorised}>
                    <Button disabled={disabled} style={{ width: "100%" }}>{dict.review.send}</Button>
                </Tooltip>
            </form>
        </section>
    )
}

export default Reviews