"use client"

import React, { FC, PropsWithChildren, useState } from 'react'
import s from "./index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
import { FiltersIcon, CrossIcon } from '@/icons'
// import components
import Button from '../UI/buttons/Button'

const MobileFilters: FC<PropsWithChildren> = ({ children }) => {
    const { dict } = useTranslation();
    const [show, setShow] = useState<boolean>(false);

    const handleOpenModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    return (
        <>
            <Button className={`${s.button} ${show && s.active}`} onClick={handleOpenModal}>
                <FiltersIcon />
                <span>{dict.filters.filters}</span>
            </Button>
            <div className={`${s.modal} ${show && s.active}`} onClick={handleCloseModal}>
                <article onClick={(e) => e.stopPropagation()}>
                    <h4>
                        <span>{dict.filters.filters}</span>
                        <button onClick={handleCloseModal}>
                            <CrossIcon />
                        </button>
                    </h4>
                    <section>
                        {children}
                    </section>
                </article>
            </div>
        </>
    )
}

export default MobileFilters