import { ADMIN_ALL_ORDER_FAIL, ADMIN_ALL_ORDER_REQUEST, ADMIN_ALL_ORDER_SUCCESS, ADMIN_ALL_PRODUCT_FAIL, ADMIN_ALL_PRODUCT_REQUEST, ADMIN_ALL_PRODUCT_SUCCESS, ADMIN_ALL_USER_FAIL, ADMIN_ALL_USER_REQUEST, ADMIN_ALL_USER_SUCCESS, ANALYTICS_FAIL, ANALYTICS_REQUEST, ANALYTICS_SUCCESS, CLEAR_ERRORS, CLEAR_MSG, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_ORDER_STATUS_FAIL, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS } from "../constants/adminConstant";

export const adminReducer = ((state = { analytics: [], allProducts: [], allUser: [], allOrder: [] }, action) => {
    switch (action.type) {
        case ANALYTICS_REQUEST:
            return {
                loading: true,
                analytics: []
            }
        case ANALYTICS_SUCCESS:
            return {
                ...state,
                loading: false,
                analytics: action.payload
            }
        case ANALYTICS_FAIL:
            return {
                ...state,
                loading: false,
                analytics: [],
                error: action.payload
            }
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "product created successfully"
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_ALL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                allProducts: action.payload
            }
        case ADMIN_ALL_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                allProducts: [],
                error: action.payload
            }
        case ADMIN_ALL_USER_REQUEST:
            return {
                ...state,
                allUser: [],
                loading: true,
            }
        case ADMIN_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                allUser: action.payload
            }
        case ADMIN_ALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                allUser: [],
                error: action.payload
            }
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "Product deleted successfully"
            }
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "Product deleted successfully"
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "Product updated successfully"
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "User updated successfully"
            }
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_ALL_ORDER_REQUEST:
            return {
                ...state,
                allOrder: [],
                loading: true,
            }
        case ADMIN_ALL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                allOrder: action.payload
            }
        case ADMIN_ALL_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                allOrder: [],
                error: action.payload
            }
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: "Order status updated successfully"
            }
        case UPDATE_ORDER_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
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
            return state;
    }
})