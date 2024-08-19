"use client"

import React, { FC, PropsWithChildren } from 'react'
// import redux
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider;