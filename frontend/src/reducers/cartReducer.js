import { ADD_TO_CART_SUCCESS, REMOVE_FROM_CART } from "../constants/cartConstant";

export const cartReducer = ((state = { cartItems: [] }, action) => {

    function getTotal(e) {
        let total = 0
        e.forEach((elem) => {
            total += (elem.price * elem.quantity)
        })
        return total
    }

    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            const item = action.payload
            const isAlreadyExist = state.cartItems.find((i) => i.productId === item.productId)
            if (isAlreadyExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.productId === isAlreadyExist.productId ? item : i
                    ),
                    total: getTotal(state.cartItems.map((i) =>
                        i.productId === isAlreadyExist.productId ? item : i
                    ))
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    total: getTotal([...state.cartItems, item])
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) =>
                    i.productId !== action.payload
                ),
                total: getTotal(state.cartItems.filter((i) =>
                i.productId !== action.payload))
            }
        default:
            return state
    }
})