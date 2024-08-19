"use client"

import MainLayout from "./layout/horizontal"
import Button from "./components/UI/buttons/Button";
import { useTranslation } from "./hooks/useTranslation";

export default function NotFound() {
    const { dict } = useTranslation();
    return (
        <MainLayout center>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                <h1>404 {dict.not_found_page}</h1>
                <Button link href="/">{dict.nav.home}</Button>
            </div>
        </MainLayout>
    )
}