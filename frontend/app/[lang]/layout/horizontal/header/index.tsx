import React, { FC } from 'react'
import s from "./index.module.scss";
import LinkApp from '@/components/components/UI/appLink';
// import components
import Container from '@/components/components/UI/container';
import Nav from './components/Nav';
import Burder from './components/Burder';
import User from './components/User';

const Header: FC = () => {
    return (
        <header className={s.header}>
            <Container>
                <div className={s.header__body}>
                    <div>
                        <Burder />
                        <LinkApp className={s.header__logo} href="/">
                            <h1>LOGO</h1>
                        </LinkApp>
                        <Nav />
                    </div>
                    <div>
                        <User />
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header