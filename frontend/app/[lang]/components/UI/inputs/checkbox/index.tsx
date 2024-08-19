import React, { FC, ComponentPropsWithoutRef } from 'react'
import s from "./index.module.scss";

interface Props extends ComponentPropsWithoutRef<'input'> { }

const Checkbox: FC<Props> = ({ children, ...rest }) => {
    return (
        <label className={s.checkbox}>
            <input {...rest} type="checkbox" />
            <span className={s.checkbox__action}></span>
            <span>{children}</span>
        </label>
    )
}

export default Checkbox