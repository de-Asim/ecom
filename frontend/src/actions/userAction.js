import axios from "axios";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  CLEAR_MSG,
  UPDATE_PASS_REQUEST,
  UPDATE_PASS_SUCCESS,
  UPDATE_PASS_FAIL,
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAIL,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
} from "../constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.err,
    });
  }
};
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.err,
    });
  }
};

export const userProfile = () => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_REQUEST });
    const { data } = await axios.get(`/api/v1/user`);
    dispatch({
      type: PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload: error.response.data.err,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    await axios.get(`/api/v1/logout`);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.err,
    });
  }
};
export const update = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/user/update`, userData, config);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
      payload: error.response.data.err,
    });
  }
};
export const updatePass = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASS_REQUEST });
    const config = { headers: { "Content-Type": "form-data" } };

    const { data } = await axios.put(
      `/api/v1/password/change`,
      passwordData,
      config
    );
    dispatch({
      type: UPDATE_PASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASS_FAIL,
      payload: error.response.data.err.split(":")[2] || error.response.data.err,
    });
  }
};

export const forgotPass = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      { email},
      config
    );
    dispatch({
      type: FORGOT_PASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASS_FAIL,
      payload: error.response.data.err,
    });
  }
};
export const resetPass = (token,password,confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { password,confirmPassword},
      config
    );
    dispatch({
      type: RESET_PASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASS_FAIL,
      payload: error.response.data.err,
    });
  }
};
export const clearMsg = () => async (dispatch) => {
  dispatch({ type: CLEAR_MSG });
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
