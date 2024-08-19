"use client"

import React, { FC, useState } from 'react'
import s from "./index.module.scss";
import { EnumStyleVariables } from '@/enums';
// import icons
import { StarIcon } from '@/icons';

interface Props {
    rate: number,
    onChange?: (value: number) => void,
}

const Stars: FC<Props> = ({ rate, onChange }) => {
    const [active, setActive] = useState<number>(0);

    const onClick = (value: number) => onChange ? onChange(value) : rate;

    const onEnter = (value: number) => {
        if (!value || rate) return;
        setActive(value);
    };

    const onLeave = () => {
        if (rate) return;
        setActive(0);
    }

    const logic = (value: number) => {
        if (rate) return value <= rate ? "#FFC107" : EnumStyleVariables.LIGHT;
        return value <= active ? "#FFC107" : EnumStyleVariables.LIGHT;
    };

    return (
        <article className={s.stars}>
            {[...Array(5)].map((_, index) => (
                <label key={`star-${index}`}>
                    <input type="radio" name="rating" value={rate} />
                    <button
                        type="button"
                        onMouseEnter={() => onEnter(index + 1)}
                        onMouseLeave={onLeave}
                        onClick={() => onClick(index + 1)}
                    >
                        <StarIcon style={{
                            fill: logic(index + 1),
                            stroke: "#FFC107",
                            cursor: "pointer",
                        }} />
                    </button>
                </label>
            ))}
        </article>
    )
}

export default Stars