import toast from "react-hot-toast";
import { State_cart,Reducer_Action } from "../../Types/reducer";

const initialState: State_cart = {
    cart: [],
    total: 0,
    totalItems: 0,
};
export default function cartReducer(state = initialState, action: Reducer_Action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const itemInCart = state.cart.find(
                (item) => item.menu_id === action.payload.menu_id
            );
            if (itemInCart) {
                toast.success("Item quantity updated in cart");
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.menu_id === action.payload.menu_id
                            ? { ...item, count: item.count + 1 }
                            : item
                    ),
                    totalItems: state.totalItems + 1,
                    total: state.total + itemInCart.price,
                };

            } else {
                toast.success("Item added to cart");
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, count: 1 }],
                    totalItems: state.totalItems + 1,
                    total: state.total + action.payload.price,
                };
            }
        }
        case "NEW_CART": {
            const itemInCart = state.cart.find(
                (item) => item.menu_id === action.payload.menu_id
            );
            if (itemInCart) {
                const newCount = itemInCart.count + action.payload.count;
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.menu_id === action.payload.menu_id
                            ? { ...item, count: newCount }
                            : item
                    ),
                    totalItems: state.totalItems + action.payload.count,
                    total: state.total + itemInCart.price * action.payload.count,
                };
            } else {
                const item = { ...action.payload };
                return {
                    ...state,
                    cart: [...state.cart, item],
                    totalItems: state.totalItems + item.count,
                    total: state.total + item.price * item.count,
                };
            }
        }
        case "INCREMENT_QUANTITY": {
            const item = state.cart.find((item) => item.menu_id === action.payload);
            if (item) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.menu_id === action.payload
                            ? { ...item, count: item.count + 1 }
                            : item
                    ),
                    total: state.total + item.price,
                    totalItems: state.totalItems + 1,
                };
            }
            return state;
        }
        case "DECREMENT_QUANTITY": {
            const item = state.cart.find((item) => item.menu_id === action.payload);
            if (item) {
                if (item.count === 1) {
                    return {
                        ...state,
                        cart: state.cart.filter((item) => item.menu_id !== action.payload),
                        total: state.total - item.price,
                        totalItems: state.totalItems - 1,
                    };
                } else {
                    return {
                        ...state,
                        cart: state.cart.map((item) =>
                            item.menu_id === action.payload
                                ? { ...item, count: item.count - 1 }
                                : item
                        ),
                        total: state.total - item.price,
                        totalItems: state.totalItems - 1,
                    };
                }
            }
            return state;
        }
        case "REMOVE_FROM_CART": {
            const itemId = action.payload;
            const item = state.cart.find((item) => item.menu_id === itemId);
            if (item) {
                toast.success("Item removed from cart");
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.menu_id !== itemId),
                    totalItems: state.totalItems - item.count,
                    total: state.total - item.price * item.count,
                };
            }
            return state;
        }
        case "EMPTY_CART": {
            return {
                ...state,
                cart: [],
                total: 0,
                totalItems: 0,
            };
        }
        default:
            return state;
    }
}

