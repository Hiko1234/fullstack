"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import { ICategory } from '@/interfaces/category.interface';
import { useTranslation } from '@/components/hooks/useTranslation';
// import components
import CategoryCard from '@/components/components/UI/cards/category-item';
import Button from '@/components/components/UI/buttons/Button';

interface Props {
    categories: ICategory[],
}

const HomeCategories: FC<Props> = ({ categories }) => {
    const { dict } = useTranslation();
    return (
        <section className={s.categories}>
            <h2>{dict.categories.title}</h2>
            <div className={s.categories__cards}>
                {categories?.map((item: ICategory, index: number) => (
                    <CategoryCard
                        key={`category-${index}`}
                        style={index === 4 ? { gridColumn: "span 2", gridRow: "span 2" } : {}}
                        data={item}
                    />
                ))}
            </div>
            <Button className={s.categories__btn} link href="/categories">{dict.categories.all}</Button>
        </section>
    )
}

export default HomeCategories