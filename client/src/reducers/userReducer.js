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

export const getUserByIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_BYID_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_BYID_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_BYID_FAIL:
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const adminUserByIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_BYID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_USER_BYID_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };

    case ADMIN_USER_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GETALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GETALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
      };

    case GETALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateUserByAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_BY_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_BY_ADMIN_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
      };

    case UPDATE_USER_BY_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
