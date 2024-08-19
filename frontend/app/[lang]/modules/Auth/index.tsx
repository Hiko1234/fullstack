"use client"

import React, { FC, useState } from 'react'
import s from "./index.module.scss";
import { EnumAuthMethod } from '@/enums';
import { useTranslation } from '@/components/hooks/useTranslation';
import img from "./hero.jpg";
import Image from 'next/image';
// import components
import Register from './components/Register'
import Login from './components/Login';
import Button from '@/components/components/UI/buttons/Button';

const AuthPage: FC = () => {
    const { dict } = useTranslation();
    const [type, setType] = useState<EnumAuthMethod>(EnumAuthMethod.REGISTER);
    return (
        <section className={s.auth}>
            <Image className={s.auth_bg} src={img} alt="BG" width={5000} height={5000} />
            {type === EnumAuthMethod.LOGIN ? <Login /> : <Register />}
            <Button className={`card ${s.auth__typeBtn}`} onClick={() => setType((prev) => prev === EnumAuthMethod.REGISTER ? EnumAuthMethod.LOGIN : EnumAuthMethod.REGISTER)}>
                {type === EnumAuthMethod.REGISTER ? dict.auth.authorisation : dict.auth.register}
            </Button>
        </section>
    )
}

export default AuthPage