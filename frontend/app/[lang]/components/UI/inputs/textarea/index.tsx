"use client"

import React, { ComponentPropsWithoutRef, useId, forwardRef } from 'react'
import s from "./index.module.scss";

interface Props extends ComponentPropsWithoutRef<"textarea"> {
    error?: string,
    label?: string,
    classname?: string,
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ error, label, classname, ...rest }, ref) => {
    const id = useId();

    return (
        <article className={s.textarea}>
            {!!label && <label htmlFor={id}>{label}</label>}
            <textarea ref={ref} {...rest} className={`input ${classname}`} id={id}></textarea>
            {!!error && <span>{error}</span>}
        </article>
    )
})

export default Textarea