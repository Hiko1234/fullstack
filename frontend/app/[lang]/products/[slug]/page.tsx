import MainLayout from "../../layout/horizontal";
import Container from "../../components/UI/container";
import ProductsSinglePage from "@/components/modules/ProductsSingle";
// import types
import { EnumLang } from "@/enums";
import { IProductFullset } from "@/interfaces/products.interface";
// import service
import { getProductBySlug } from "@/services/products/products.data";
import { getSimilarProducts } from "@/services/products/products.data";

type Props = {
    params: { lang: EnumLang, slug: string };
}

export default async function SingleProduct({ params: { lang, slug } }: Props) {
    const product: IProductFullset = await getProductBySlug(lang, slug);
    const similarProducts = await getSimilarProducts(lang, product?.id);

    return (
        <MainLayout>
            <Container>
                <ProductsSinglePage
                    product={product}
                    similarProducts={similarProducts}
                />
            </Container>
        </MainLayout>
    )
}