"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';

interface Props {
    description: string,
}

const Description: FC<Props> = ({ description }) => {
    const { dict } = useTranslation();

    if (!description) return null;
    return (
        <section id="description" className={`card ${s.block}`}>
            <h2>{dict.description}</h2>
            <p>{description}</p>
        </section>
    )
}

export default Description;