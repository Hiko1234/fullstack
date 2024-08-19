import React, { FC } from 'react'
import s from "./index.module.scss";
import img from "./image.jpg";
import Image from 'next/image';
import { ICategory } from '@/interfaces/category.interface';
// import components
import LinkApp from '../../appLink';

interface Props {
    data: ICategory,
    [key: string]: unknown;
}

const CategoryCard: FC<Props> = ({ data, ...props }) => {
    const { slug, name, image } = data;
    return (
        <article {...props} className={s.card}>
            <LinkApp href={`/categories/${slug}`}>
                <div className={`card ${s.card__image}`}>
                    <Image src={image || img} alt={`Category ${name || ""}`} width={1000} height={1000} />
                </div>
                <h6>{name}</h6>
            </LinkApp>
        </article>
    )
}

export default CategoryCard