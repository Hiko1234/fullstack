import React, { FC } from 'react'
import s from "./index.module.scss";
import img from "./image.jpg";
import Image from 'next/image';
import { IReview } from '@/interfaces/review.interface';
// import components
import Stars from '../../inputs/starts';

interface Props {
    data: IReview,
}

const ReviewCard: FC<Props> = ({ data }) => {
    const { user, createdAt, rating, text } = data;
    const { avatarPath, name } = user;
    const date = new Date(createdAt);

    return (
        <article className={s.card}>
            <div>
                <div>
                    <Image src={avatarPath || img} alt={"user"} width={100} height={100} />
                    <h3>{name}</h3>
                </div>
                <Stars rate={rating} />
            </div>
            <span>{date?.toLocaleDateString()}</span>
            <p>{text}</p>
        </article>
    )
}

export default ReviewCard