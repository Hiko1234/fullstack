"use client"

import React, { ComponentPropsWithoutRef, useId, forwardRef, } from 'react'
import s from "./index.module.scss";

interface Props extends ComponentPropsWithoutRef<"input"> {
    error?: string,
    label?: string,
}

const Input = forwardRef<HTMLInputElement, Props>(({ error, label, ...rest }, ref) => {
    const id = useId();

    return (
        <article className={s.input}>
            {!!label && <label htmlFor={id}>{label}</label>}
            <input ref={ref} {...rest} className="input" id={id} />
            {!!error && <span>{error}</span>}
        </article>
    )
})

export default Input