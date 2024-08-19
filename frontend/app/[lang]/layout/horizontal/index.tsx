import React, { FC, PropsWithChildren } from 'react';
import s from "./layout.module.scss";
// import components
import Header from './header';
import Footer from './footer';

type Props = { center?: boolean };

const itemsCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const MainLayout: FC<PropsWithChildren<Props>> = ({ children, center }) => {
    return (
        <div className={s.wrapper}>
            <Header />
            <main style={center ? itemsCenter : {}}>{children}</main>
            <Footer />
        </div>
    )
}

export default MainLayout