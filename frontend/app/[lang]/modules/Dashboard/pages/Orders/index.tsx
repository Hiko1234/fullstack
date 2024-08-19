"use client"

import React, { FC } from 'react'
import s from "./index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
// import components
import TableOrders from './components/TableOrders';

const DashboardOrdersPage: FC = () => {
    const { dict } = useTranslation();

    return (
        <div className="page-wrapper">
            <section className={s.description}>
                <h1>{dict.dashboard.title2}</h1>
                <p>{dict.dashboard.text3}</p>
            </section>
            <TableOrders />
        </div>
    )
}

export default DashboardOrdersPage