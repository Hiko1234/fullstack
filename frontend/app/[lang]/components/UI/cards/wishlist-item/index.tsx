import React, { FC } from 'react'
import s from "./index.module.scss";
import img from "./image.jpg";
import Image from 'next/image';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useWishlist } from '@/components/hooks/useWishlist';
import { useRouter } from 'next/navigation';
// import types
import { IProduct } from '@/interfaces/products.interface';
import { EnumStyleVariables } from '@/enums';
// import icons
import { CrossIcon } from '@/icons';
// import utils
import { currentPath } from '@/utils/currentPath';
// import components
import CartButton from "../../buttons/CartButton";

interface Props {
    data: IProduct,
}

const WishlistCard: FC<Props> = ({ data }) => {
    const { dict, lang } = useTranslation();
    const { name, images, inStock, price, brand, slug } = data;
    const { disabled, removeProductFromWishlist } = useWishlist(data);
    const { push } = useRouter();

    const redirect = () => push(currentPath(lang, `/products/${slug}`));

    return (
        <article className={`card ${s.card}`} onClick={redirect}>
            <div className={s.card__info}>
                <Image src={images[0] || img} alt={`product-${name}`} width={1000} height={1000} />
                <div>
                    <h2>{name}</h2>
                    <p>{brand?.name}</p>
                    <span style={{
                        textDecoration: inStock ? "none" : "line-through",
                    }}>{dict.in_stock}</span>
                </div>
            </div>
            <div className={s.card__user}>
                <h2 style={{ whiteSpace: "nowrap" }}>₴ {price}</h2>
                <button disabled={disabled} onClick={(e) => removeProductFromWishlist(e, data)}>
                    <CrossIcon style={{
                        stroke: EnumStyleVariables.PRIMARY,
                        width: 28,
                        height: 28,
                    }} />
                </button>
                <CartButton inStock={inStock} product={data} />
            </div>
        </article>
    )
}

export default WishlistCard