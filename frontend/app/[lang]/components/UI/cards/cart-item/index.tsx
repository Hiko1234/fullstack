import React, { FC } from 'react'
import s from "./index.module.scss";
import img from "./image.jpg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/hooks/useCart';
import { useTranslation } from '@/components/hooks/useTranslation';
// import types
import { IProductCart } from '@/interfaces/products.interface';
import { EnumStyleVariables } from '@/enums';
// import icons
import { CrossIcon } from '@/icons';
// import utils
import { currentPath } from '@/utils/currentPath';
// import components
import Counter from '@/components/components/counter';

interface Props {
    data: IProductCart,
}

const CartCard: FC<Props> = ({ data }) => {
    const { id, name, images, price, brand, slug, quantity } = data;
    const { disabled, removeProductFromCart } = useCart();
    const { lang } = useTranslation();
    const { push } = useRouter();

    const redirect = () => push(currentPath(lang, `/products/${slug}`));

    return (
        <article className={`card ${s.card}`} onClick={redirect}>
            <div className={s.card__info}>
                <Image src={images[0] || img} alt={`product-${name}`} width={1000} height={1000} />
                <div>
                    <h2>{name}</h2>
                    <p>{brand?.name}</p>
                </div>
            </div>
            <div className={s.card__user}>
                <Counter product={data} />
                <div style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                    {quantity > 1 && <h4>₴ {price * quantity} <span style={{ fontWeight: 500, fontSize: 12 }}>({price} * {quantity})</span></h4>}
                    <h2>₴ {price}</h2>
                </div>
                <button disabled={disabled} onClick={(e) => removeProductFromCart(e, id)}>
                    <CrossIcon style={{
                        stroke: EnumStyleVariables.PRIMARY,
                        width: 28,
                        height: 28,
                    }} />
                </button>
            </div>
        </article>
    )
}

export default CartCard