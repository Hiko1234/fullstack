"use client"

import React, { ComponentPropsWithoutRef, FC } from 'react'
import { usePopoverContext } from './PopoverProvider'

interface Props extends ComponentPropsWithoutRef<'button'> { }

const PopoverButton: FC<Props> = ({ className, children, onClick, ...rest }) => {
    const props = usePopoverContext();

    return (
        <button
            {...rest}
            className={className}
            onClick={(e) => {
                onClick?.(e);
                props.onOpen();
            }}>
            {children}
        </button>
    )
}

export default PopoverButton