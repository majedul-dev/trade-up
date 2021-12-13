import axios from "axios";
import {
  USER_BYID_REQUEST,
  USER_BYID_SUCCESS,
  USER_BYID_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GETALL_USERS_REQUEST,
  GETALL_USERS_SUCCESS,
  GETALL_USERS_FAIL,
  UPDATE_USER_BY_ADMIN_REQUEST,
  UPDATE_USER_BY_ADMIN_SUCCESS,
  UPDATE_USER_BY_ADMIN_FAIL,
  ADMIN_USER_BYID_REQUEST,
  ADMIN_USER_BYID_SUCCESS,
  ADMIN_USER_BYID_FAIL,
} from "../constants/userConstants";

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_BYID_REQUEST });

    const { data } = await axios.get(`/api/users/user/${id}`);

    dispatch({
      type: USER_BYID_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("userById", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: USER_BYID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_BYID_REQUEST });

    const { data } = await axios.get(`/api/users/admin/user/${id}`);

    dispatch({
      type: ADMIN_USER_BYID_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("adminUserById", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: ADMIN_USER_BYID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/users/me/profile/update`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("userById", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUserByAdmin = (formData, userId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_BY_ADMIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/users/admin/user/${userId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_BY_ADMIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userById", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_BY_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GETALL_USERS_REQUEST });

    const { data } = await axios.get(`/api/users/admin/allusers`);

    dispatch({
      type: GETALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GETALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
