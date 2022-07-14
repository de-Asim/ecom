import { ANALYTICS_FAIL, ANALYTICS_REQUEST, ANALYTICS_SUCCESS, CLEAR_ERRORS } from "../constants/adminConstant";

export const adminReducer = ((state = { analytics: [] },action) => {
    switch (action.type) {
        case ANALYTICS_REQUEST:
            return {
                loading: true,
                analytics: []
            }
        case ANALYTICS_SUCCESS:
            return {
                loading: false,
                analytics: action.payload
            }
        case ANALYTICS_FAIL:
            return {
                loading: false,
                analytics: [],
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
})