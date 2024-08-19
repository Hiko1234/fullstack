import MainLayout from "./layout/horizontal";
import HomePage from "./modules/home";
import { EnumLang, EnumProductSort } from "@/enums";
// import service
import { getCategory } from "@/services/category/category.data";
import { getProducts } from "@/services/products/products.data";

type Props = {
  params: { lang: EnumLang };
}

export const revalidate = 600;

export default async function Home({ params: { lang } }: Props) {
  const categories = await getCategory(lang, 9);
  const item = await getProducts(lang, {
    searchTerm: "",
    sort: EnumProductSort.NEWEST,
    page: "1",
    colors: [],
    countries: [],
    brands: [],
  });

  return (
    <MainLayout>
      <HomePage categories={categories} item={item} />
    </MainLayout >
  );
}
