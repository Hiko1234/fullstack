'use client';

import { createContext, FC, PropsWithChildren, useState, useCallback } from 'react';
import s from "../components/UI/notify/index.module.scss";
// import components
import Notify from '../components/UI/notify';

type Props = { timer: number };

interface ISnack {
    id: number,
    msg: string,
    variant: "success" | "error" | "warning",
}

type TSnackFunc = Omit<ISnack, 'id'>;
export type TSnackVariant = Omit<TSnackFunc, 'msg'>;

interface TContext {
    notify: (data: TSnackFunc) => void,
    snacks: ISnack[],
};

export const SnackbarContext = createContext<TContext>({ notify: () => { }, snacks: [] });

const SnackBarProvider: FC<PropsWithChildren<Props>> = ({ children, timer }) => {
    const [snacks, setSnacks] = useState<ISnack[]>([]);

    const notify = useCallback((data: TSnackFunc) => {
        const id: number = Date.now();
        setSnacks((prev) => [...prev, {
            id: id,
            ...data
        }]);
        setTimeout(() => {
            setSnacks((prev) => {
                const currentPrev = prev.filter((item) => item?.id !== id);
                return currentPrev
            });
        }, timer)
    }, []);

    return (
        <SnackbarContext.Provider value={{ notify, snacks }}>
            {children}
            <div className={s.wrapper}>
                {snacks.map((item: ISnack) => (
                    <Notify
                        key={`notify-${item.id}`}
                        variant={item.variant}
                        timer={timer - 500}
                    >{item.msg}</Notify>
                ))}
            </div>
        </SnackbarContext.Provider>
    )
}

export default SnackBarProvider