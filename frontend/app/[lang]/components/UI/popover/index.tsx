"use client";

import React, { ComponentPropsWithoutRef, FC, useState } from 'react';
import s from "./index.module.scss";
// import components
import { PopoverContext } from './components/PopoverProvider';
import PopoverButton from './components/PopoverButton';
import PopoverList from './components/PopoverList';
import PopoverListItem from './components/PopoverListItem';

interface Props extends ComponentPropsWithoutRef<'div'> {}

const PopoverComponent: FC<Props> = ({ className, children, ...rest }) => {
    const [open, setOpen] = useState<boolean>(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <PopoverContext.Provider value={{ open, onOpen, onClose }}>
            <div {...rest} className={`${s.popover} ${className}`}>
                {children}
            </div>
        </PopoverContext.Provider>
    );
};

const Popover = Object.assign(PopoverComponent, {
    Button: PopoverButton,
    List: PopoverList,
    ListItem: PopoverListItem,
});

export default Popover;