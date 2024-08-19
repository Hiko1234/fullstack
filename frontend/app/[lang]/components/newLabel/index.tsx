"use client"

import React, { FC, useEffect, useState } from 'react';
import { EnumStyleVariables } from '@/enums';
import { useTranslation } from '@/components/hooks/useTranslation';

interface Props {
    createdAt: Date,
}

const NewLabel: FC<Props> = ({ createdAt }) => {
    const { dict } = useTranslation();
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const today: Date = new Date();
        const productDate: Date = new Date(createdAt);
        const timeDifference: number = today?.getTime() - productDate?.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);
        setShow(dayDifference <= 5);
    }, [createdAt]);

    if (!show) return null;

    return (
        <li>
            <article style={{ backgroundColor: EnumStyleVariables.PRIMARY }}>{dict.new}</article>
        </li>
    )
}

export default NewLabel