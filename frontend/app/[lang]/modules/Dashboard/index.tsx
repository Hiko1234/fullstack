"use client"

import React from 'react'
import s from "./index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';

const DashboardPage = () => {
    const { dict } = useTranslation();

    return (
        <div className="page-wrapper">
            <div className={s.dashboard}>
                <h1>{dict.dashboard.title}</h1>
                <p>{dict.dashboard.text1}</p>
                <p>{dict.dashboard.text2}</p>
            </div>
        </div>
    )
}

export default DashboardPage