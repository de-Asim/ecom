import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS, ADD_NEW_ADDRESS_FAIL, ADD_NEW_ADDRESS_SUCCESS, ADD_ORDER_FAIL, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, CLEAR_ERRORS, CLEAR_MSG, GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDER_DETAILS_FAIL, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, ONE_ADDRESS_FAIL, ONE_ADDRESS_REQUEST, ONE_ADDRESS_SUCCESS, REMOVE_ADDRESS_FAIL, REMOVE_ADDRESS_SUCCESS } from "../constants/orderConstant";

export const orderReducer = ((state = { address: [], orders: [], shippingAddress: '' ,ordersCount:0,orderDetails:""}, action) => {

    switch (action.type) {
        case ADDRESS_REQUEST:
            return {
                loading: true,
                address: []
            };
        case ADDRESS_SUCCESS:
            return {
                loading: false,
                address: action.payload
            };
        case ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case ONE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ONE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                shippingAddress: action.payload
            };
        case ONE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_NEW_ADDRESS_SUCCESS:
            return {
                ...state,
                msg: "New Address Added Successfully"
            }
        case ADD_NEW_ADDRESS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case REMOVE_ADDRESS_SUCCESS:
            return {
                ...state,
                msg: "Address Removed Successfully"
            }
        case REMOVE_ADDRESS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ADD_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                msg:"Ordered placed successfully"
            };
        case ADD_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders:action.payload.orders,
                ordersCount:action.payload.ordersCount,
                loading: false
            };
        case GET_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                orders:[],
                ordersCount:0,
                error: action.payload
            };
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetails:action.payload,
                loading: false
            };
        case GET_ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                orderDetails:"",
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        case CLEAR_MSG:
            return {
                ...state,
                msg: null
            };
        default:
            return state
    }
})