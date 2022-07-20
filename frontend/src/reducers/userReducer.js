import { CLEAR_ERRORS, CLEAR_MSG, FORGOT_PASS_FAIL, FORGOT_PASS_REQUEST, FORGOT_PASS_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, PROFILE_FAIL, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASS_FAIL, RESET_PASS_REQUEST, RESET_PASS_SUCCESS, UPDATE_FAIL, UPDATE_PASS_FAIL, UPDATE_PASS_REQUEST, UPDATE_PASS_SUCCESS, UPDATE_REQUEST, UPDATE_SUCCESS } from "../constants/userConstant";

export const userReducer = ((state = { user: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                user: {}
            };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            };
        case LOGIN_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };
        case REGISTER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                user: {}
            };
        case REGISTER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            };
        case REGISTER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };
        case UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                msg: 'Update Successfull'
            };
        case UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_PASS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                msg: 'Password Updated Successfully'
            };
        case UPDATE_PASS_FAIL:
            return {
                ...state,
                loading: false,
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
        case PROFILE_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                isAdmin: false,
                user: {}
            }
        case PROFILE_SUCCESS:
            if (action.payload.role === 'admin') {
                return {
                    loading: false,
                    isAuthenticated: true,
                    isAdmin: true,
                    user: action.payload
                }

            }
            return {
                loading: false,
                isAuthenticated: true,
                isAdmin: false,
                user: action.payload
            }
        case PROFILE_FAIL:
            return {
                loading: false,
                isAdmin: false,
                isAuthenticated: false,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                isAdmin: false,
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FORGOT_PASS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FORGOT_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: 'Recovery mail sent'
            }
        case FORGOT_PASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case RESET_PASS_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        case RESET_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated: true,
                msg: 'Password changed successfully'
            }
        case RESET_PASS_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            }
        default:
            return state
    }
})