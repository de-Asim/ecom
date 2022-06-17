import { ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, CLEAR_ERRORS, FRONTPAGE_CATEGORY_FAIL, FRONTPAGE_CATEGORY_REQUEST, FRONTPAGE_CATEGORY_SUCCESS } from "../constants/categoryConstant";

export const AllCategoryReducer =((state={ AllCategories:[]},action)=>{

    switch(action.type){
        case ALL_CATEGORY_REQUEST:
            return {
                loading:true,
                AllCategories:[]
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                loading:false,
                AllCategories:action.payload.AllCategories,
            };
        case ALL_CATEGORY_FAIL:
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
export const FrontPageCategoryReducer =((state={ frontPageCategories:[],loading:true},action)=>{

    switch(action.type){
        case FRONTPAGE_CATEGORY_REQUEST:
            return {
                loading:true,
                frontPageCategories:[]
            };
        case FRONTPAGE_CATEGORY_SUCCESS:
            return {
                loading:false,
                frontPageCategories:action.payload.categories,
            };
        case FRONTPAGE_CATEGORY_FAIL:
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