"use client"

import React, { FC, useState } from 'react'
import s from "../index.module.scss";
import { useInput } from '@/components/hooks/useInput';
import { useActions } from '@/components/hooks/useActions';
import { useAuth } from '@/components/hooks/useAuth';
import { useAuthRedirect } from '@/components/hooks/useAuthRedirect';
import { useTranslation } from '@/components/hooks/useTranslation';
// import components
import Button from '@/components/components/UI/buttons/Button';
import Input from '@/components/components/UI/inputs/input';
// import constants
import { validEmail } from 'constants/email';

const Login: FC = () => {
    const email = useInput();
    const password = useInput();
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    useAuthRedirect("/dashboard");
    const { dict } = useTranslation();
    const { isLoading, error } = useAuth();
    const { login } = useActions();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = email.current?.value ?? "";
        const passwordValue = password.current?.value ?? "";

        const emailError = !validEmail.test(emailValue) ? dict.auth.error_email : "";
        const passwordError = passwordValue.length < 8 ? dict.auth.error_password : "";

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        login({
            email: emailValue,
            password: passwordValue,
        });

        if (email.current) email.current.value = "";
        if (password.current) password.current.value = "";

        setErrors({ email: "", password: "" });
    };

    return (
        <form className={`card ${s.form}`} onSubmit={onSubmit}>
            <Input ref={email} type="text" placeholder={dict.email} name="email" error={errors.email} label={dict.email} />
            <Input ref={password} type="password" placeholder={dict.password} name="password" error={errors.password} label={dict.password} />
            <Button>{isLoading ? dict.download : dict.auth.authorisation}</Button>
            {error && <span>{error}</span>}
        </form>
    );
}

export default Login