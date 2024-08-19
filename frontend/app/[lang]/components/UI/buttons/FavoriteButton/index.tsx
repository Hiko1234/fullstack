import React, { FC } from 'react'
import s from "./index.module.scss";
import { useWishlist } from '@/components/hooks/useWishlist';
import { useTranslation } from '@/components/hooks/useTranslation';
// import types
import { IProduct } from '@/interfaces/products.interface';
import { EnumStyleVariables } from '@/enums'
// import icons
import { FavoriteIcon2 } from '@/icons'
// import components
import Button from '../Button'

interface Props {
    product: IProduct,
    large?: boolean
}

const FavoriteButton: FC<Props> = ({ large, product }) => {
    const { dict } = useTranslation();
    const { isLiked, disabled, wishlistActions } = useWishlist(product);

    if (large) {
        return (
            <Button disabled={disabled} className={`card ${s.large}`} onClick={(e) => wishlistActions(e, product)}>
                <span>{dict.wishlist.btn_title}</span>
                <FavoriteIcon2 style={{ fill: isLiked ? EnumStyleVariables.PRIMARY : "" }} />
            </Button>
        )
    }

    return (
        <button disabled={disabled} onClick={(e) => wishlistActions(e, product)}>
            <FavoriteIcon2 style={{ fill: isLiked ? EnumStyleVariables.PRIMARY : "" }} />
        </button>
    )
}

export default FavoriteButton