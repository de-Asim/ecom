import axios from "axios";
import{ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, CLEAR_ERRORS, FRONTPAGE_CATEGORY_FAIL, FRONTPAGE_CATEGORY_REQUEST, FRONTPAGE_CATEGORY_SUCCESS} from "../constants/categoryConstant"
export const getAllCAtegories=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_CATEGORY_REQUEST})
        const {data}=await axios.get(`/api/v1/categories`)
        dispatch({
            type:ALL_CATEGORY_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_CATEGORY_FAIL,
            payload:error.response.data.err
        })
    }
}
export const getFrontPageCategories=()=>async(dispatch)=>{
    try {
        dispatch({type:FRONTPAGE_CATEGORY_REQUEST})
        const {data}=await axios.get(`/api/v1/frontpagecategories`)
        console.log(data);
        dispatch({
            type:FRONTPAGE_CATEGORY_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:FRONTPAGE_CATEGORY_FAIL,
            payload:error.response.data.err
        })
    }
}

export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}