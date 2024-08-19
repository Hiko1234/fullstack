"use client"

import React, { FC } from 'react'
import { ICategory } from '@/interfaces/category.interface';
import { IProductsPagination, IProductDto } from '@/interfaces/products.interface';
import { IFilters } from '@/interfaces/filters.interface';
import { EnumLang } from '@/enums';
import { getProductsBySlug } from "@/services/products/products.data";
import { useParams } from 'next/navigation';
// import components
import Catalog from '@/components/components/catalog';

interface Props {
  category: ICategory
  item: IProductsPagination
  filters: IFilters,
}

const CategoriesSinglePage: FC<Props> = ({ category, item, filters }) => {
  const params = useParams<{ slug: string }>();

  return (
    <div className="page-wrapper">
      <Catalog
        category={category}
        item={item}
        filters={filters}
        api={(lang: EnumLang, args: IProductDto) => getProductsBySlug(lang, { slug: params?.slug, ...args })}
      />
    </div>
  )
}

export default CategoriesSinglePage