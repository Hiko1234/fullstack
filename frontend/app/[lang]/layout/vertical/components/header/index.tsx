"use client"

import React, { FC } from 'react'
import s from "./index.module.scss";
import { useActions } from '@/components/hooks/useActions';
// import icons
import { LogoutIcon } from '@/icons';
// import components
import User from './components/User';
import Nav from './components/Nav';
import LinkApp from '@/components/components/UI/appLink';

const Header: FC = () => {
  const { logout } = useActions();
  return (
    <header className={`card ${s.header}`}>
      <LinkApp className={s.header__logo} href="/">
        <h1>L</h1>
      </LinkApp>
      <div className={s.header__body}>
        <User />
        <Nav />
      </div>
      <button onClick={() => logout()}>
        <LogoutIcon style={{ minWidth: "20px", minHeight: "26px" }} />
      </button>
    </header>
  )
}

export default Header