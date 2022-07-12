import axios from "axios"
import {ADD_TO_CART_SUCCESS, REMOVE_FROM_CART } from "../constants/cartConstant"
import { CLEAR_ERRORS, CLEAR_MSG } from "../constants/orderConstant"

export const addToCart = (id,quantity) => async (dispatch,getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: {
            productId:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.image[0].source,
            stock:data.product.stock,
            quantity
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id) => async (dispatch,getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload:id,
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}
export const clearMsg = () => async (dispatch) => {
    dispatch({ type: CLEAR_MSG });
  };
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };