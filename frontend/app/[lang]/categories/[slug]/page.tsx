import MainLayout from "../../layout/horizontal";
import Container from "../../components/UI/container";
import CategoriesSinglePage from "../../modules/CategoriesSingle";
// import types
import { EnumLang } from "@/enums";
// import service
import { getCategoryBySlug } from "@/services/category/category.data";
import { getProductsBySlug } from "@/services/products/products.data";
import { getFilters } from "@/services/filters/filters.data";
// import utils
import { getFiltersArray } from "@/utils/getFiltersArray";
import { validateSortParam } from "@/utils/validateSortParam";

type Props = {
  params: { lang: EnumLang, slug: string };
  searchParams: {
    page: string,
    sort: string,
    colors: string,
    countries: string,
    brands: string,
  }
}

export const revalidate = 600;

export default async function CategoriesSlug({
  params: { lang, slug },
  searchParams: { page, sort, colors, countries, brands }
}: Props) {
  const category = await getCategoryBySlug(lang, slug);
  const filters = await getFilters(lang);
  const item = await getProductsBySlug(lang, {
    slug,
    sort: validateSortParam(sort),
    page: page || "1",
    colors: getFiltersArray(colors || ""),
    countries: getFiltersArray(countries || ""),
    brands: getFiltersArray(brands || "")
  });

  return (
    <MainLayout>
      <Container>
        <CategoriesSinglePage
          category={category}
          item={item}
          filters={filters}
        />
      </Container>
    </MainLayout>
  )
}