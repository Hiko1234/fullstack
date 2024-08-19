"use client"

import React, { FC } from 'react'
import s from "./index.module.scss";
import { useFilters } from '@/components/hooks/useFilters';
import { useTranslation } from '@/components/hooks/useTranslation';
// import types
import { ICategory } from '@/interfaces/category.interface';
import { IProductsPagination, IProductDto, IProduct } from '@/interfaces/products.interface';
import { IFilters } from '@/interfaces/filters.interface';
import { EnumFilters, EnumLang } from '@/enums';
// import icons
import { CooliconIcon } from '@/icons';
// import constants
import { productsPerPage } from 'constants/perPage';
// import components
import SortSelect from '@/components/components/sortSelect';
import Button from '@/components/components/UI/buttons/Button';
import Dropdown from '@/components/components/UI/dropdown';
import Checkbox from '@/components/components/UI/inputs/checkbox';
import Card from '@/components/components/UI/cards/product-item';
import Pagination from '@/components/components/UI/pagination';
import MobileFilters from '@/components/components/mobileFilters';
import Skeleton from '../UI/skeleton';

interface Props {
    searchTerm?: string,
    category?: ICategory
    item: IProductsPagination
    filters: IFilters,
    api: (lang: EnumLang, args: IProductDto) => Promise<any>,
}

const Catalog: FC<Props> = ({ category, item, filters, api }) => {
    const {
        handleClearFilters,
        handlePage,
        handleFilters,
        handleSort,
        filtersParams,
        data,
        loading,
    } = useFilters(item, api);
    const { dict } = useTranslation();

    return (
        <section className={s.page}>
            <div className={s.page__header}>
                <h2>{category?.name || dict.products}</h2>
                <span>{data?.length} {dict.goods}</span>
                <SortSelect className={s.page__sortSelect} onClick={handleSort} />
                <Button className={`card ${s.page__clearBtn}`} onClick={handleClearFilters}>
                    <span>{dict.filters.filtering}</span>
                    <CooliconIcon />
                </Button>
            </div>
            <div className={s.page__wrapper}>
                <div>
                    <div className={s.page__cards}>
                        {loading ? new Array(9).fill(1)?.map((_, index: number) => (
                            <Skeleton key={`skeleton-${index}`} className={s.skeleton} />
                        )) : data?.products?.length > 0 ? data?.products?.map((product: IProduct, index: number) => (
                            <Card key={`product-${index}`} data={product} />
                        )) : <h3>{dict.no_goods}</h3>}
                    </div>
                    {Math.ceil(data?.length / +productsPerPage) > 1 && (
                        <div>
                            <Pagination
                                pages={Math.ceil(data?.length / +productsPerPage)}
                                selectedPage={+filtersParams?.page}
                                onClick={handlePage}
                            />
                        </div>
                    )}
                </div>
                <div className="card" style={{ padding: "10px 20px" }}>
                    <Dropdown title={<h3>{dict.color}</h3>}>
                        {filters.colors.map((item, index) => (
                            <div key={`color-${index}`} className={s.page__filters}>
                                <Checkbox
                                    checked={filtersParams[EnumFilters.COLORS].some(el => el === String(item?.id))}
                                    onChange={(e) => handleFilters(e, item?.id, EnumFilters.COLORS)}
                                >{item.name}</Checkbox>
                            </div>
                        ))}
                    </Dropdown>
                    <Dropdown title={<h3>{dict.country}</h3>}>
                        {filters.countries.map((item, index) => (
                            <div key={`country-${index}`} className={s.page__filters}>
                                <Checkbox
                                    checked={filtersParams[EnumFilters.COUNTRIES].some(el => el === String(item?.id))}
                                    onChange={(e) => handleFilters(e, item?.id, EnumFilters.COUNTRIES)}
                                >{item.name}</Checkbox>
                            </div>
                        ))}
                    </Dropdown>
                    <Dropdown title={<h3>{dict.brand}</h3>}>
                        {filters.brands.map((item, index) => (
                            <div key={`brand-${index}`} className={s.page__filters}>
                                <Checkbox
                                    checked={filtersParams[EnumFilters.BRANDS].some(el => el === String(item?.id))}
                                    onChange={(e) => handleFilters(e, item?.id, EnumFilters.BRANDS)}
                                >{item.name}</Checkbox>
                            </div>
                        ))}
                    </Dropdown>
                </div>
            </div>
            <div className={s.page__mobileFilters}>
                <MobileFilters>
                    <SortSelect className={s.page__sortSelect} onClick={handleSort} />
                    <Button className={`card ${s.page__clearBtn}`} onClick={handleClearFilters}>
                        <span>{dict.filters.filtering}</span>
                        <CooliconIcon />
                    </Button>
                    <Dropdown title={<h3>{dict.color}</h3>}>
                        {filters.colors.map((item, index) => (
                            <div key={`color-${index}`} className={s.page__filters}>
                                <Checkbox
                                    checked={filtersParams[EnumFilters.COLORS].some(el => el === String(item?.id))}
                                    onChange={(e) => handleFilters(e, item?.id, EnumFilters.COLORS)}
                                >{item.name}</Checkbox>
                            </div>
                        ))}
                    </Dropdown>
                    <Dropdown title={<h3>{dict.country}</h3>}>
                        {filters.countries.map((item, index) => (
                            <div key={`country-${index}`} className={s.page__filters}>
                                <Checkbox
                                    checked={filtersParams[EnumFilters.COUNTRIES].some(el => el === String(item?.id))}
                                    onChange={(e) => handleFilters(e, item?.id, EnumFilters.COUNTRIES)}
                                >{item.name}</Checkbox>
                            </div>
                        ))}
                    </Dropdown>
                    <Dropdown title={<h3>{dict.brand}</h3>}>
                        {filters.brands.map((item, index) => (
                            <div key={`brand-${index}`} className={s.page__filters}>
                                <Checkbox
                                    checked={filtersParams[EnumFilters.BRANDS].some(el => el === String(item?.id))}
                                    onChange={(e) => handleFilters(e, item?.id, EnumFilters.BRANDS)}
                                >{item.name}</Checkbox>
                            </div>
                        ))}
                    </Dropdown>
                </MobileFilters>
            </div>
        </section>
    )
}

export default Catalog