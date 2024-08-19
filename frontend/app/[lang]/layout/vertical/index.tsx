import React, { FC, PropsWithChildren } from 'react'
import s from "./index.module.scss";
// import components
import Header from './components/header';
import Footer from './components/footer';

const VerticalLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={s.wrapper}>
            <Header />
            <div className={s.wrapper__page}>
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    )
}

export default VerticalLayout