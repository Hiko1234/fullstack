import React, { FC } from 'react'
import s from "./index.module.scss";

const Footer: FC = () => {
  return (
    <footer className={s.footer}>
      <p>@2024 - {new Date().getFullYear()} | Shop, Всі права захищені</p>
    </footer>
  )
}

export default Footer