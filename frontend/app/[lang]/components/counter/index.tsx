import React, { FC } from 'react'
import s from "./index.module.scss";
import { useCart } from '@/components/hooks/useCart';
// import types
import { IProductCart } from '@/interfaces/products.interface';

interface Props {
  product: IProductCart,
}

const Counter: FC<Props> = ({ product }) => {
  const { disabled, incProductCart, decProductCart } = useCart();

  return (
    <article className={s.counter}>
      <button disabled={disabled || product.quantity <= 1} onClick={(e) => decProductCart(e, product)}>-</button>
      <h2>{product.quantity}</h2>
      <button disabled={disabled} onClick={(e) => incProductCart(e, product)}>+</button>
    </article>
  )
}

export default Counter