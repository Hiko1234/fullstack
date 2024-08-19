"use client"

import React, { FC, useState } from 'react'
import s from "../index.module.scss";
import { useInput } from '@/components/hooks/useInput';
import { useActions } from '@/components/hooks/useActions';
import { useAuth } from '@/components/hooks/useAuth';
import { useAuthRedirect } from '@/components/hooks/useAuthRedirect';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useTypedSelector } from '@/components/hooks/useTypedSelector';
// import components
import Button from '@/components/components/UI/buttons/Button';
import Input from '@/components/components/UI/inputs/input';
// import constants
import { validEmail } from 'constants/email';

const Register: FC = () => {
    const name = useInput();
    const phone = useInput();
    const email = useInput();
    const password = useInput();
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });
    useAuthRedirect("/dashboard");
    const { dict } = useTranslation();
    const { isLoading, error } = useAuth();
    const { register } = useActions();
    const wishlist = useTypedSelector((state) => state.wishlist);
    const cart = useTypedSelector((state) => state.cart);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameValue = name.current?.value ?? "";
        const phoneValue = phone.current?.value ?? "";
        const emailValue = email.current?.value ?? "";
        const passwordValue = password.current?.value ?? "";

        const nameError = nameValue.length < 3 ? dict.auth.error_name : "";
        const phoneError = phoneValue.length === 0 ? dict.auth.error_phone : "";
        const emailError = !validEmail.test(emailValue) ? dict.auth.error_email : "";
        const passwordError = passwordValue.length < 8 ? dict.auth.error_password : "";

        if (nameError || phoneError || emailError || passwordError) {
            setErrors({ name: nameError, phone: phoneError, email: emailError, password: passwordError });
            return;
        }

        register({
            name: nameValue,
            phone: phoneValue,
            favorite: wishlist.products.map((item) => item.id),
            cart: cart.products.map((item) => ({ productId: item.id, quantity: item.quantity })),
            email: emailValue,
            password: passwordValue,
        });

        if (name.current) name.current.value = "";
        if (phone.current) phone.current.value = "";
        if (email.current) email.current.value = "";
        if (password.current) password.current.value = "";
        setErrors({ name: "", phone: "", email: "", password: "" });
    };

    return (
        <form className={`card ${s.form}`} onSubmit={onSubmit}>
            <Input ref={name} name="name" type="text" placeholder={dict.name} error={errors.name} label={dict.name} />
            <Input ref={phone} name="phone" type="text" placeholder="+38 068 1234 123" error={errors.phone} label={dict.phone} />
            <Input ref={email} name="email" type="text" placeholder={dict.email} error={errors.email} label={dict.email} />
            <Input ref={password} name="password" type="password" placeholder={dict.password} error={errors.password} label={dict.password} />
            <Button>{isLoading ? dict.download : dict.auth.register}</Button>
            {error && <span>{error}</span>}
        </form>
    );
}

export default Register