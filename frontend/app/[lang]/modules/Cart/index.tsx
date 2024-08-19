import React, { FC } from 'react'
import s from "./index.module.scss";
// import components
import Cart from './components/Cart';
import Order from './components/Order';

const CartPage: FC = () => {
    return (
        <div className={s.page}>
            <Cart />
            <Order />
        </div>
    )
}

export default CartPage