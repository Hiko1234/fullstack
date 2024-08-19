import React, { FC, ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'article'> {
    colors?: [string, string]
}

const Skeleton: FC<Props> = ({ className, colors }) => {
    return (
        <article className={`skeleton ${className}`}>
            <style jsx>{`
                .skeleton {
                    background-image: linear-gradient(
                        90deg,
                        ${colors ? colors[0] : "#eee"} 0%, ${colors ? colors[0] : "#eee"} 40%,
                        ${colors ? colors[1] : "#ddd"} 50%, ${colors ? colors[1] : "#ddd"} 55%,
                        ${colors ? colors[0] : "#eee"} 65%, ${colors ? colors[1] : "#ddd"} 100%
                    );
                    background-size: 400%;
                    animation: skeleton 3s infinite;
                }

                @keyframes skeleton {
                    from {
                        background-position: 100%;
                    }
                    to {
                        background-position: 0%;
                    }
                }
            `}</style>
        </article>
    )
}

export default Skeleton;