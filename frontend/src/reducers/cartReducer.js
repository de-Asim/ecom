import {ADD_TO_CART_SUCCESS, REMOVE_FROM_CART } from "../constants/cartConstant";

export const cartReducer =((state={ cartItems:[]},action)=>{

    switch(action.type){
        case ADD_TO_CART_SUCCESS:
            const item = action.payload
            const isAlreadyExist = state.cartItems.find((i)=>i.productId===item.productId)
            if(isAlreadyExist){
                return{
                    ...state,
                    cartItems:state.cartItems.map((i)=>
                        i.productId===isAlreadyExist.productId ? item : i
                    )
                }
            }
            else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                };
            }
        case REMOVE_FROM_CART:
                return{
                    ...state,
                    cartItems:state.cartItems.filter((i)=>
                        i.productId!==action.payload
                    )
                }
        default:
            return state
    }
})