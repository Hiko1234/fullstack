"use client"

import React, { FC } from 'react'
import s from "./index.module.scss";
import { EnumProductSort } from '@/enums';
import { useTranslation } from '@/components/hooks/useTranslation';
// import icons 
import { ArrowIcon } from '@/icons';
// import components
import Popover from '../UI/popover';

interface Props {
    className?: string,
    onClick: (value: EnumProductSort) => void,
}

const SortSelect: FC<Props> = ({ className, onClick, ...rest }) => {
    const { dict } = useTranslation();

    return (
        <Popover {...rest} className={`${s.select} ${className}`}>
            <Popover.Button className="card">
                <h3>{dict.sort.title}</h3>
                <ArrowIcon />
            </Popover.Button>
            <Popover.List className="card">
                <Popover.ListItem className="card" onClick={() => onClick(EnumProductSort.OLDEST)}>
                    {dict.sort.oldest}
                </Popover.ListItem>
                <Popover.ListItem className="card" onClick={() => onClick(EnumProductSort.NEWEST)}>
                    {dict.sort.new}
                </Popover.ListItem>
                <Popover.ListItem className="card" onClick={() => onClick(EnumProductSort.HIGH_PRICE)}>
                    {dict.sort.high_price}
                </Popover.ListItem>
                <Popover.ListItem className="card" onClick={() => onClick(EnumProductSort.LOW_PRICE)}>
                    {dict.sort.low_price}
                </Popover.ListItem>
            </Popover.List>
        </Popover>
    )
}

export default SortSelect