"use client"

import React, { FC } from 'react'
import s from "../index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
// import types
import { IProductCharacteristic } from '@/interfaces/characteristic.interface';

interface Props {
    characteristics: IProductCharacteristic[],
}

const Characteristics: FC<Props> = ({ characteristics }) => {
    const { dict } = useTranslation();

    if (!characteristics || characteristics?.length === 0) return null;
    return (
        <section id="characteristics" className={`card ${s.block}`}>
            <h2>{dict.characteristics}</h2>
            <div className={s.block__items}>
                {characteristics?.map((item, index) => (
                    <article key={`characteristics-${index}`}>
                        <p>{item?.characteristicItem?.characteristic?.name}:</p>
                        <p>{item?.characteristicItem?.name}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Characteristics