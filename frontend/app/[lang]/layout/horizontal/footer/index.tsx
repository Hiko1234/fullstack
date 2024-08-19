import React from 'react'
import s from "./index.module.scss";
// import components
import Container from '@/components/components/UI/container';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <p>@2024 - {new Date().getFullYear()} | Shop, Всі права захищені</p>
      </Container>
    </footer>
  )
}

export default Footer