"use client"

import React, { FC } from 'react';
import s from "./index.module.scss";
import { useTranslation } from '@/components/hooks/useTranslation';
import { useCart } from '@/components/hooks/useCart';
import { useNotify } from '@/components/hooks/useNotify';
// import types
import { IProduct } from '@/interfaces/products.interface';
// import icons
import { CartIcon2 } from '@/icons';
// import components
import Button from '../Button';
import Tooltip from '../../tooltip';

interface Props {
  large?: boolean
  inStock: boolean,
  product: IProduct
}

const CartButton: FC<Props> = ({ large, inStock, product }) => {
  const { dict } = useTranslation();
  const { notify } = useNotify();
  const { disabled, addProductToCart } = useCart();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(!inStock) return notify({ msg: dict.cart.no_in_stock, variant: "warning" });
    addProductToCart(e, { ...product, quantity: 1 });
  };

  if (large) {
    return (
      <Tooltip title={dict.no_in_stock} active={!inStock}>
        <Button disabled={disabled} className={s.large} type="button" onClick={onClick}>
          {dict.cart.add}
        </Button>
      </Tooltip>
    )
  }

  return (
    <Tooltip title={dict.no_in_stock} active={!inStock}>
      <button disabled={disabled} className={s.small} type="button" onClick={onClick}>
        <CartIcon2 />
      </button>
    </Tooltip>
  )
}

export default CartButton