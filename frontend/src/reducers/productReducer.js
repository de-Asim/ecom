import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, CLEAR_MSG, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS }from "../constants/productConstant"
export const productReducer =((state={ products:[]},action)=>{

    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.allProducts,
                productsCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };
        default:
            return state
    }
})
export const productDetailsReducer =((state={ product:{}},action)=>{

    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload.product
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            };
        case PRODUCT_REVIEW_SUCCESS:
            return {
                ...state,
                loading:false,
                msg:"Review submitted successfully"
            };
        case PRODUCT_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };
        case CLEAR_MSG:
            return {
                ...state,
                msg:null
            };
        default:
            return state
    }
})