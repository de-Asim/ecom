import axios from "axios"
import { ANALYTICS_FAIL, ANALYTICS_REQUEST, ANALYTICS_SUCCESS, CLEAR_ERRORS } from "../constants/adminConstant"

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
export const clearError=(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
