import * as userActions from "./features/user/user.actions";
import * as wishlistActions from "./features/wishlist/wishlist.actions";
import * as cartActions from "./features/cart/cart.actions";

export const rootActions = {
    ...userActions,
    ...wishlistActions,
    ...cartActions,
}