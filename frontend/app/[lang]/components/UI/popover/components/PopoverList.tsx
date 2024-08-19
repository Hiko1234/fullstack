"use client"

import React, { FC, ComponentPropsWithoutRef } from 'react'
import { usePopoverContext } from './PopoverProvider'
import useOnClickOutside from '@/components/hooks/useOnClickOutside';

interface Props extends ComponentPropsWithoutRef<'div'> { }

const PopoverList: FC<Props> = ({ children, className }) => {
    const props = usePopoverContext();
    const ref = useOnClickOutside(props.onClose);

    if (!props.open) return null;

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export default PopoverList