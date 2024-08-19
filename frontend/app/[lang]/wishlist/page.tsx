import MainLayout from "../layout/horizontal"
import Container from "../components/UI/container";
import WishlistPage from "../modules/Wishlist";

const Wishlist = () => {
    return (
        <MainLayout>
            <Container>
                <WishlistPage />
            </Container>
        </MainLayout>
    )
}

export default Wishlist