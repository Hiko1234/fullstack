import type { Metadata } from "next";
import "../styles/globals.scss";
import { getDictionary } from "./dictionaries";
import { EnumLang } from "@/enums";
// import providers
import AuthProvider from "./providers/AuthProvider";
import ReduxProvider from "./providers/ReduxProvider";
import LangProvider from "./providers/LangProvider";
import SnackBarProvider from "./providers/SnackBarProvider";

export async function generateStaticParams() {
  return [{ lang: EnumLang.UK }, { lang: EnumLang.EN }];
};

export const metadata: Metadata = {
  title: "Shop",
  description: "Інтернет магазин",
};

type Props = {
  children: React.ReactNode;
  params: { lang: EnumLang };
}

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
        <ReduxProvider>
          <LangProvider dict={dict} lang={lang}>
            <AuthProvider>
              <SnackBarProvider timer={5000}>
                {children}
              </SnackBarProvider>
            </AuthProvider>
          </LangProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
