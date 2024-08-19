import React, { FC } from 'react'
import s from "./index.module.scss";

const Loader: FC = () => {
    return (
        <div className={s.loader}>
            <span></span>
        </div>
    )
}

export default Loader