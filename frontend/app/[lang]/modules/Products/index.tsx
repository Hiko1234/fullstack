"use client"

import React, { FC } from 'react'
import { IProductsPagination, IProductDto } from '@/interfaces/products.interface';
import { IFilters } from '@/interfaces/filters.interface';
import { EnumLang } from '@/enums';
import { getProducts } from "@/services/products/products.data";
// import components
import Catalog from '@/components/components/catalog';

interface Props {
    item: IProductsPagination
    filters: IFilters,
}

const ProductsPage: FC<Props> = ({ item, filters }) => {
    return (
        <div className="page-wrapper">
            <Catalog
                item={item}
                filters={filters}
                api={(lang: EnumLang, args: IProductDto) => getProducts(lang, { ...args })}
            />
        </div>
    )
}

export default ProductsPage