import MainLayout from "../layout/horizontal"
import Container from "../components/UI/container";
import CartPage from "../modules/Cart";

const Cart = () => {
    return (
        <MainLayout>
            <Container>
                <CartPage />
            </Container>
        </MainLayout>
    )
}

export default Cart