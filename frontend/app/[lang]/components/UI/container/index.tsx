import React, { FC, PropsWithChildren } from 'react'

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ maxWidth: "1270px", margin: "0 auto", padding: "0 15px" }}>{children}</div>
  )
}

export default Container