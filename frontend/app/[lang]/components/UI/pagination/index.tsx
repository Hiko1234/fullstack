"use client"

import React, { FC, useEffect, useState } from 'react';
import s from "./index.module.scss";
import { EnumStyleVariables } from '@/enums';
import { ArrowIcon } from '@/icons';
// import components
import Button from '../buttons/Button';

interface Props {
    pages: number;
    selectedPage: number,
    onClick: (value: number) => void,
}

const Pagination: FC<Props> = ({ pages, onClick, selectedPage }) => {
    // set number of pages
    const numberOfPages: number[] = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);
    }
    // array of buttons what we see on the page
    const [buttons, setButtons] = useState<Array<string | number>>([]);

    useEffect(() => {
        let tempNumberOfPages: Array<string | number> = [...buttons];

        const dotsInitial = '...';
        const dotsLeft = '... ';
        const dotsRight = ' ...';

        if (numberOfPages.length < 6) {
            tempNumberOfPages = numberOfPages;
        } else if (selectedPage >= 1 && selectedPage <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
        } else if (selectedPage === 4) {
            const sliced = numberOfPages.slice(0, 5);
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
        } else if (selectedPage > 4 && selectedPage < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(selectedPage - 2, selectedPage);
            const sliced2 = numberOfPages.slice(selectedPage, selectedPage + 1);
            tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length];
        } else if (selectedPage > numberOfPages.length - 3) {
            const sliced = numberOfPages.slice(numberOfPages.length - 4);
            tempNumberOfPages = [1, dotsLeft, ...sliced];
        }

        setButtons(tempNumberOfPages);
    }, [selectedPage, pages]);

    const handleDotsClick = (dot: string) => {
        if (dot === '...') {
            onClick((buttons[buttons.length - 3] as number) + 1);
        } else if (dot === ' ...') {
            onClick((buttons[3] as number) + 2);
        } else if (dot === '... ') {
            onClick((buttons[3] as number) - 2);
        }
    };

    return (
        <article className={s.pagination}>
            <Button disabled={selectedPage === 1} onClick={() => onClick(selectedPage - 1)}>
                <ArrowIcon style={{
                    stroke: EnumStyleVariables.LIGHT,
                    width: "10px",
                    heigth: "2.5px",
                    transform: "rotate(90deg)",
                }} />
            </Button>
            {buttons?.map((item: string | number, index: number) => (
                <Button
                    key={`page-${index}`}
                    className={selectedPage === item ? s.active : ""}
                    onClick={() => typeof item === 'number' ? item !== selectedPage ? onClick(item) : {} : handleDotsClick(item)}
                >{item}</Button>
            ))}
            <Button disabled={selectedPage === buttons?.length} onClick={() => onClick(selectedPage + 1)}>
                <ArrowIcon style={{
                    stroke: EnumStyleVariables.LIGHT,
                    width: "10px",
                    heigth: "2.5px",
                    transform: "rotate(-90deg)",
                }} />
            </Button>
        </article>
    )
}

export default Pagination;
