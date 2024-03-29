import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, CLEAR_MSG, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS } from "../constants/productConstant";

export const getProduct = (currentPage=1,keyword="",category,priceRange=[0,1000000],rating=0)=>async(dispatch)=>{
    try {
        dispatch({ type:ALL_PRODUCT_REQUEST})
        let link=`/api/v1/product?keyword=${keyword}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${rating}&page=${currentPage}`
        if(category){
            link=`/api/v1/product?keyword=${keyword}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${rating}&category=${category}&page=${currentPage}`
        }
        console.log(link);
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.err
        })
    }
}
export const getProductDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({ type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.err
        })
    }
}
export const reviewProduct = (id,rating,message)=>async(dispatch)=>{
    try {
        dispatch({ type:PRODUCT_REVIEW_REQUEST})
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await axios.put(`/api/v1//product/review/${id}`,{rating,message},config);
        dispatch({
            type:PRODUCT_REVIEW_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_REVIEW_FAIL,
            payload:error.response.data.err
        })
    }
}
export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}
export const clearMsg =()=>async(dispatch)=>{
    dispatch({type:CLEAR_MSG})
}