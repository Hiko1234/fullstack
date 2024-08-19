"use client"

import React, { FC, ComponentPropsWithoutRef } from 'react'
import { usePopoverContext } from './PopoverProvider'

interface Props extends ComponentPropsWithoutRef<'button'> { }

const PopoverListItem: FC<Props> = ({ children, onClick, className }) => {
    const props = usePopoverContext();

    return (
        <button className={className} onClick={(e) => {
            onClick?.(e);
            props.onClose();
        }}>
            {children}
        </button>
    )
}

export default PopoverListItem