"use client"

import React, { FC, ChangeEvent, useState } from 'react'
import s from "./index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
// import types
import { ICategory } from '@/interfaces/category.interface';
import { IProduct } from '@/interfaces/products.interface';
// import utils
import { scrollTop } from '@/utils/scrollTop';
// import components
import CategoryCard from '@/components/components/UI/cards/category-item';
import Checkbox from '@/components/components/UI/inputs/checkbox';
import Dropdown from '@/components/components/UI/dropdown';
import MobileFilters from '@/components/components/mobileFilters';
import Container from '@/components/components/UI/container';
import BrandsLine from '@/components/components/brandsLine';
import ProductsCarousel from '@/components/components/productsCarousel';

interface Props {
  categories: ICategory[],
  products: IProduct[]
}

const CategoriesPage: FC<Props> = ({ categories, products }) => {
  const [categoriesData, setCategoriesData] = useState<ICategory[]>(categories || []);
  const [filters, setFilters] = useState<number[]>([]);
  const { dict } = useTranslation();

  const onChange = (e: ChangeEvent<HTMLInputElement>, value: number) => {
    if (!value) return;
    scrollTop();
    const { checked } = e.target;
    setFilters((prev) => {
      const checking = checked ? [...prev, value] : prev?.filter((item) => item !== value);
      const filteringCategories = checking?.length > 0 ? categories?.filter((category) => checking.includes(category?.id)) : categories;
      setCategoriesData(filteringCategories);
      return checking;
    });
  };

  return (
    <>
      <Container>
        <div className="page-wrapper">
          <section className={s.categories}>
            <div>
              <h2>{dict.categories.categories}</h2>
              <div className={s.categories__cards}>
                {categoriesData?.length > 0 ? categoriesData.map((item: ICategory, index: number) => (
                  <CategoryCard
                    key={`category-${index}`}
                    style={(index + 1) % 4 === 0 ? { gridColumn: "span 2", gridRow: "span 2" } : {}}
                    data={item}
                  />
                )) : <h3>{dict.categories.clear}</h3>}
              </div>
            </div>
            <div>
              <h2>{dict.list}</h2>
              <div className="card" style={{ padding: "10px 20px" }}>
                <Dropdown title={<h3>{dict.categories.categories}</h3>}>
                  {categories?.length > 0 ? categories?.map((item: ICategory, index: number) => (
                    <Checkbox
                      key={`checkbox-${index}`}
                      checked={filters.some(el => el === item?.id)}
                      onChange={(e) => onChange(e, item?.id)}
                    >{item.name}</Checkbox>
                  )) : <h5>{dict.filters.clear}</h5>}
                </Dropdown>
              </div>
            </div>
            <div>
              <MobileFilters>
                <Dropdown title={<h3>{dict.categories.categories}</h3>}>
                  {categories?.length > 0 ? categories?.map((item: ICategory, index: number) => (
                    <Checkbox
                      key={`checkbox-${index}`}
                      checked={filters.some(el => el === item?.id)}
                      onChange={(e) => onChange(e, item?.id)}
                    >{item.name}</Checkbox>
                  )) : <h5>{dict.filters.clear}</h5>}
                </Dropdown>
              </MobileFilters>
            </div>
          </section>
        </div>
      </Container>
      {products?.length > 0 && <BrandsLine className={s.brands} />}
      <Container>
        <ProductsCarousel title={dict.popular_products} products={products} />
      </Container>
    </>
  )
}

export default CategoriesPage