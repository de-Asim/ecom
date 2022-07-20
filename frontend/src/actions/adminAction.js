import axios from "axios"
import { ADMIN_ALL_ORDER_FAIL, ADMIN_ALL_ORDER_REQUEST, ADMIN_ALL_ORDER_SUCCESS, ADMIN_ALL_PRODUCT_FAIL, ADMIN_ALL_PRODUCT_REQUEST, ADMIN_ALL_PRODUCT_SUCCESS, ADMIN_ALL_USER_FAIL, ADMIN_ALL_USER_REQUEST, ADMIN_ALL_USER_SUCCESS, ANALYTICS_FAIL, ANALYTICS_REQUEST, ANALYTICS_SUCCESS, CLEAR_ERRORS, CLEAR_MSG, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_ORDER_STATUS_FAIL, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS } from "../constants/adminConstant"

export const getAnalytics=()=>async(dispatch)=>{
    try {
        dispatch({type:ANALYTICS_REQUEST})
        const {data} = await axios.get(`/api/v1/admin/dashboard`)
        dispatch({
            type:ANALYTICS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ANALYTICS_FAIL,
            payload:error.response.data.err
        })
    }
}
export const createNewProduct=(formData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST})
        const config={headers: { "Content-Type": "multipart/form-data" }}
        const {data} = await axios.post(`/api/v1/product/new`,formData,config)
        dispatch({
            type:CREATE_PRODUCT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:CREATE_PRODUCT_FAIL,
            payload:error.response.data.err
        })
    }
}
export const updateProduct=(id,formData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST})
        const config={headers: { "Content-Type": "multipart/form-data" }}
        await axios.put(`/api/v1/product/${id}`,formData,config)
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.err
        })
    }
}

export const getAllProductsAdmin=()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_ALL_PRODUCT_REQUEST})
        const {data} = await axios.get(`/api/v1/admin/product`)
        dispatch({
            type:ADMIN_ALL_PRODUCT_SUCCESS,
            payload:data.allProducts
        })
    } catch (error) {
        dispatch({
            type:ADMIN_ALL_PRODUCT_FAIL,
            payload:error.response.data.err
        })
    }
}

export const deleteProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})
        await axios.delete(`/api/v1/product/${id}`)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.err
        })
    }
}
export const getAllUser=()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_ALL_USER_REQUEST})
        const {data} = await axios.get(`/api/v1/admin/user/all`)
        dispatch({
            type:ADMIN_ALL_USER_SUCCESS,
            payload:data.users
        })
    } catch (error) {
        dispatch({
            type:ADMIN_ALL_USER_FAIL,
            payload:error.response.data.err
        })
    }
}
export const deleteUser=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_USER_REQUEST})
        await axios.delete(`/api/v1/admin/user/delete/${id}`)
        dispatch({
            type:DELETE_USER_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:DELETE_USER_FAIL,
            payload:error.response.data.err
        })
    }
}
export const updateUserRole=(id,role)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_USER_ROLE_REQUEST})
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.put(`/api/v1/admin/user/update/${id}`,{role},config)
        dispatch({
            type:UPDATE_USER_ROLE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:UPDATE_USER_ROLE_FAIL,
            payload:error.response.data.err
        })
    }
}
export const getAllOrder=()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_ALL_ORDER_REQUEST})
        const {data} = await axios.get(`/api/v1/order/admin/all`)
        dispatch({
            type:ADMIN_ALL_ORDER_SUCCESS,
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:ADMIN_ALL_ORDER_FAIL,
            payload:error.response.data.err
        })
    }
}
export const updateOrderStatus=(id,status)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.put(`/api/v1/order/admin/update/${id}`,{status},config)
        dispatch({
            type:UPDATE_ORDER_STATUS_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_STATUS_FAIL,
            payload:error.response.data.err
        })
    }
}
export const clearError=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
export const clearMsg=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_MSG
    })
}
