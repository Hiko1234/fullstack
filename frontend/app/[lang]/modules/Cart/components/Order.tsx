"use client"

import React, { FC, useState } from 'react'
import s from "../index.module.scss";
import { useInput } from '@/components/hooks/useInput';
import { useCart } from '@/components/hooks/useCart';
import { useAuth } from '@/components/hooks/useAuth';
import { useNotify } from '@/components/hooks/useNotify';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useRouter } from 'next/navigation';
// import types
import { EnumStyleVariables } from '@/enums';
// import utils
import { currentPath } from '@/utils/currentPath';
// import service
import { OrdersService } from '@/services/orders/orders.service';
// import components
import Input from '@/components/components/UI/inputs/input';
import Dropdown from '@/components/components/UI/dropdown';
import Button from '@/components/components/UI/buttons/Button';
import Tooltip from '@/components/components/UI/tooltip';

const Order: FC = () => {
    const { isAuthorised } = useAuth();
    const { totalLength, totalPrice, clearProductsCart, products } = useCart();
    const { lang, dict } = useTranslation();
    const { notify } = useNotify();
    const { push } = useRouter();
    const address = useInput();
    const [disabled, setDisabled] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);

        if (!isAuthorised) {
            notify({ msg: dict.order.auth, variant: "warning" });
            push(currentPath(lang, "/auth"));
            return setDisabled(false);
        };

        if (!address?.current?.value || address?.current?.value?.length === 0) {
            notify({ msg: "Заповніть поле адреси!", variant: "warning" });
            return setDisabled(false);
        };

        try {
            await OrdersService.create({
                poshta: address?.current?.value,
                products: products.map((item) => ({ productId: item.id, quantity: item.quantity })),
            });
            notify({ msg: dict.order.created, variant: "success" });
            clearProductsCart();
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
        } finally {
            address.current.value = "";
            setDisabled(false);
        }
    };

    if (totalLength() === 0) return null;

    return (
        <section className={`card ${s.order}`}>
            <article className={s.order__data}>
                <h3>{dict.order.total_price} {totalLength() > 0 && `(${totalLength()} ${dict.goods})`}</h3>
                <h3 style={{ color: EnumStyleVariables.PRIMARY }}>₴ {totalPrice()}</h3>
            </article>
            <Dropdown title={<h3>{dict.delivery}</h3>}>
                <form className={s.order__form} onSubmit={onSubmit}>
                    <Input ref={address} type="text" name="address" placeholder="м. Київ, вул. Пирогівський шлях, 135, відділення №1" />
                    <div>
                        <Tooltip title={dict.order.auth} active={!isAuthorised}>
                            <Button disabled={disabled} type="submit">{dict.order.create}</Button>
                        </Tooltip>
                        <Button className={s.whiteBtn} link href="/products">{dict.order.continue}</Button>
                    </div>
                </form>
            </Dropdown>
        </section>
    )
}

export default Order