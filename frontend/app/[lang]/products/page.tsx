import MainLayout from "../layout/horizontal";
import Container from "../components/UI/container";
import ProductsPage from "../modules/Products";
// import types
import { EnumLang } from "@/enums";
// import service
import { getProducts } from "@/services/products/products.data";
import { getFilters } from "@/services/filters/filters.data";
// import utils
import { validateSortParam } from "@/utils/validateSortParam";
import { getFiltersArray } from "@/utils/getFiltersArray";

type Props = {
    params: { lang: EnumLang };
    searchParams: {
        page: string,
        sort: string,
        colors: string,
        countries: string,
        searchTerm: string,
        brands: string,
    }
}

export const revalidate = 600;

export default async function Products({
    params: { lang },
    searchParams: { page, sort, colors, countries, searchTerm, brands }
}: Props) {
    const filters = await getFilters(lang);
    const item = await getProducts(lang, {
        searchTerm: searchTerm || "",
        sort: validateSortParam(sort),
        page: page || "1",
        colors: getFiltersArray(colors || ""),
        countries: getFiltersArray(countries || ""),
        brands: getFiltersArray(brands || ""),
    });

    return (
        <MainLayout>
            <Container>
                <ProductsPage
                    item={item}
                    filters={filters}
                />
            </Container>
        </MainLayout>
    )
}