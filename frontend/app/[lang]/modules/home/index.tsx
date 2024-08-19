"use client"

import React, { FC } from 'react'
import s from "./index.module.scss";
import { ICategory } from '@/interfaces/category.interface';
import { IProductsPagination } from '@/interfaces/products.interface';
import { useTranslation } from '@/components/hooks/useTranslation';
// import components
import Container from '@/components/components/UI/container';
import HomeCategories from './components/Categories';
import Hero from './components/Hero';
import ProductsCarousel from '@/components/components/productsCarousel';
import BrandsLine from '@/components/components/brandsLine';

interface Props {
  categories: ICategory[],
  item: IProductsPagination,
}

const HomePage: FC<Props> = ({ categories, item }) => {
  const { dict } = useTranslation();

  return (
    <>
      <Hero />
      <Container>
        <div className="page-wrapper">
          <ProductsCarousel title={dict.popular_products} products={item?.products} />
          <HomeCategories categories={categories} />
        </div>
      </Container>
      <BrandsLine className={s.brands} />
    </>
  )
}

export default HomePage