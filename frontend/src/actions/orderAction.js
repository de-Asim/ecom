import axios from "axios"
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS, ADD_NEW_ADDRESS_FAIL, ADD_NEW_ADDRESS_REQUEST, ADD_NEW_ADDRESS_SUCCESS, ADD_ORDER_FAIL, ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, CLEAR_ERRORS, CLEAR_MSG, GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDER_DETAILS_FAIL, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, ONE_ADDRESS_FAIL, ONE_ADDRESS_REQUEST, ONE_ADDRESS_SUCCESS, REMOVE_ADDRESS_FAIL, REMOVE_ADDRESS_REQUEST, REMOVE_ADDRESS_SUCCESS } from "../constants/orderConstant"

export const getAllAddresses = () => async (dispatch) => {
    try {
        dispatch({
            type: ADDRESS_REQUEST,
        })
        const { data } = await axios.get(`/api/v1/order/address/all`)
        dispatch({
            type: ADDRESS_SUCCESS,
            payload: data.addresees
        })
    } catch (error) {
        dispatch({
            type: ADDRESS_FAIL,
            payload:error.response.data.err
        })
        
    }

}
export const getAddress = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ONE_ADDRESS_REQUEST,
        })
        const { data } = await axios.get(`/api/v1/order/address/${id}`)
        dispatch({
            type: ONE_ADDRESS_SUCCESS,
            payload: data.address
        })
    } catch (error) {
        dispatch({
            type: ONE_ADDRESS_FAIL,
            payload:error.response.data.err
        })
        
    }

}
export const addNewAddress = (myForm) => async (dispatch) => {
    try {
        dispatch({type: ADD_NEW_ADDRESS_REQUEST})
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1//order/address/add`, myForm, config)
        dispatch({
            type: ADD_NEW_ADDRESS_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ADD_NEW_ADDRESS_FAIL,
            payload:error.response.data.err.split(':')[2].split(',')[0]
        })
        
    }

}
export const removeAddress = (id) => async (dispatch) => {
    try {
        dispatch({type: REMOVE_ADDRESS_REQUEST})

        const { data } = await axios.delete(`/api/v1/order/address/remove?id=${id}`)
        dispatch({
            type: REMOVE_ADDRESS_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: REMOVE_ADDRESS_FAIL,
            payload:error.response.data.err
        })
        
    }

}
export const newOrder = (formData) => async (dispatch) => {
    try {
        dispatch({type: ADD_ORDER_REQUEST})
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/order/new`,formData,config)
        dispatch({
            type: ADD_ORDER_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ADD_ORDER_FAIL,
            payload:error.response.data.err
        })
        
    }

}
export const getOrders = (page=1) => async (dispatch) => {
    try {
        dispatch({type: GET_ORDERS_REQUEST})
        const { data } = await axios.get(`/api/v1/orders?page=${page}`)
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAIL,
            payload:error.response.data.err
        })
        
    }

}
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_ORDER_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/v1/order/details/${id}`)
        dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload:data.orderDetails
        })
    } catch (error) {
        dispatch({
            type: GET_ORDER_DETAILS_FAIL,
            payload:error.response.data.err
        })
        
    }

}
export const clearMsg = () => async (dispatch) => {
    dispatch({ type: CLEAR_MSG });
  };
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };