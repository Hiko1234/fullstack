"use client"

import React, { FC, useState, useEffect } from 'react'
import s from "../index.module.scss";
import img from "./image.jpg";
import Image from 'next/image';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useFetch } from '@/components/hooks/useFetch';
// import services
import { OrdersService } from '@/services/orders/orders.service';
// import types
import { EnumOrderStatus } from '@/enums';
import { IOrderResponse } from '@/interfaces/orders.interface';
// import components
import Loader from '@/components/components/UI/loader';

const Row: FC<{ data: IOrderResponse }> = ({ data }) => {
    const { dict, lang } = useTranslation();
    const [active, setActive] = useState<boolean>(false);
    const { id, poshta, status, createdAt, items } = data;

    const onClick = () => setActive((prev) => !prev);

    const getStatus = (): string => {
        if (status === EnumOrderStatus.DELIVERED) {
            return dict.status.delivered;
        } else if (status === EnumOrderStatus.SHIPPED) {
            return dict.status.shipped;
        } else {
            return dict.status.processing
        }
    };

    return (
        <tbody onClick={onClick}>
            <tr>
                <td>#{id}</td>
                <td>{new Date(createdAt)?.toLocaleDateString()}</td>
                <td>{poshta}</td>
                <td>{getStatus()}</td>
            </tr>
            {active && items.length > 0 && (
                <tr>
                    <td colSpan={12}>
                        <div className={`card ${s.orders__products}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>{dict?.photo}</th>
                                        <th>{dict?.brand}</th>
                                        <th>{dict?.title}</th>
                                        <th>{dict?.price}</th>
                                        <th>{dict?.quantity}</th>
                                    </tr>
                                </thead>
                                {items.map((item, index) => (
                                    <tbody key={`order-${id}-product-${index}`}>
                                        <tr>
                                            <td>
                                                <Image src={item?.images[0] || img} alt={item[`name_${lang}`] || `Product ${index}`} width={250} height={250} />
                                            </td>
                                            <td>{item?.brand?.name}</td>
                                            <td>{item[`name_${lang}`]}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>₴ {item?.price}</td>
                                            <td>{item?.quantity || 0}</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    )
};

const row = {
    id: 1,
    createdAt: "2024-08-05T19:47:42.528Z",
    poshta: "вул. Сонячна, б. 2, кв. 80",
    status: "PROCESSING",
    items: [{
        id: 1,
        brand: { id: 8, name: "Franke 7" },
        createdAt: "2024-08-05T19:47:42.528Z",
        inStock: true,
        name_en: "Cooker product 7",
        name_uk: "Кухонна плита продукт 7",
        price: 800,
        quantity: 2,
        slug: "kuhonna-plita-produkt-7",
        images: ["https://franke-lux.com.ua/wp-content/uploads/2020/01/PP001_335.0588.221-nd1000w.jpg"],
    }],
}

const TableOrders: FC = () => {
    const { dict } = useTranslation();

    const { data, error, loading, fetch } = useFetch(OrdersService.getByUser);

    const handle = async () => await fetch();

    useEffect(() => {
        handle();
    }, []);

    return (
        <section className={`card ${s.orders}`}>
            <table>
                <thead>
                    <tr>
                        <th>{dict.number}</th>
                        <th>{dict.date}</th>
                        <th>{dict.address}</th>
                        <th>{dict.status.title}</th>
                    </tr>
                </thead>
                {error ? new Array(3)?.fill(row)?.map((item, index) => (
                    <Row key={`row-${index}`} data={item} />
                )) : data && data?.length > 0 && data?.map((item, index) => (
                    <Row key={`row-${index}`} data={item} />
                ))}
            </table>
            {loading && <Loader />}
            {error && <div className="empty">{error || dict.unknown_error}</div>}
            {data && data?.length === 0 && <h3 style={{ textAlign: "center", padding: "15px" }}>{dict.order.no_orders}</h3>}
        </section>
    )
}

export default TableOrders