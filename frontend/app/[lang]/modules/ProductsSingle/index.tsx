"use client"

import React, { FC } from 'react'
import s from "./index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
// import types
import { IProductFullset, IProduct } from '@/interfaces/products.interface';
// import components
import Characteristics from './components/Characteristics';
import Description from './components/Description';
import Slider from './components/Slider';
import Info from './components/Info';
import ProductsCarousel from '@/components/components/productsCarousel';
import Reviews from './components/Reviews';

interface Props {
  product: IProductFullset,
  similarProducts: IProduct[]
}

const ProductsSinglePage: FC<Props> = ({ product, similarProducts }) => {
  const { dict } = useTranslation();

  return (
    <div className={s.page}>
      <div className={s.page__main}>
        <Slider images={product?.images} />
        <Info product={product} />
      </div>
      <Characteristics characteristics={product.productCharacteristic} />
      <Description description={product.description} />
      <Reviews reviews={product?.reviews} productId={product?.id} />
      <ProductsCarousel id="similar" title={dict.similar_goods} products={similarProducts} />
    </div>
  )
}

export default ProductsSinglePage