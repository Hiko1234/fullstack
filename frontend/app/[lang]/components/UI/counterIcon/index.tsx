import React, { FC, PropsWithChildren } from 'react';
import s from "./counter.module.scss";

interface Props {
    count: number,
}

const Counter: FC<PropsWithChildren<Props>> = ({ children, count }) => {
    return (
        <article className={s.counter}>
            {count > 0 && <span className={s.counter__count}>{count}</span>}
            {children}
        </article>
    )
}

export default Counter