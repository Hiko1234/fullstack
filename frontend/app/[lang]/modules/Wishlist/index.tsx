import React, { FC } from 'react'
import s from "./index.module.scss";
// import components
import Wishlist from './components/Wishlist';

const WishlistPage: FC = () => {
    return (
        <div className="page-wrapper">
            <Wishlist />
        </div>
    )
}

export default WishlistPage