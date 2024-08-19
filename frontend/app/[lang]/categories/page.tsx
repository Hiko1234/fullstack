import MainLayout from "../layout/horizontal";
import CategoriesPage from "../modules/Categories";
// import types
import { EnumLang, EnumProductSort } from "@/enums";
// import service
import { getCategory } from "@/services/category/category.data";
import { getProducts } from "@/services/products/products.data";

type Props = {
  params: { lang: EnumLang };
}

export const revalidate = 600;

export default async function Categories({ params: { lang } }: Props) {
  const categories = await getCategory(lang);
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
      <CategoriesPage categories={categories} products={item?.products} />
    </MainLayout>
  )
}