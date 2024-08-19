import React, { FC, ComponentPropsWithoutRef } from 'react';
import LinkApp from '../../appLink';

interface Props extends ComponentPropsWithoutRef<'button'> {
    link?: boolean;
    className?: string;
    [key: string]: unknown;
}

const Button: FC<Props> = ({ children, className, link, ...props }) => {

    if (link) {
        return (
            <LinkApp {...props} className={`btn ${className || ''}`} href={String(props.href) || "/"}>
                {children}
            </LinkApp>
        );
    }

    return (
        <button {...props} className={`btn ${className || ''}`}>
            {children}
        </button>
    );
}

export default Button;