import axios from "axios";
import { returnErrors } from "./messages";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

//LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//LOGIN USER
export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content_Type": "application/json"
    }
  };

const body = {username, password}
  axios
    .post("/api/auth/login", body, config)
    .then(res =>
     dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout",null,  tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LOGOUT_SUCCESS
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//register user
export const register = ({username, password, email}) => dispatch => {

  const config = {
    headers: {
      "Content_Type": "application/json"
    }
  };

const body = {username, email, password}
  axios
    .post("/api/auth/register", body, config)
    .then(res =>
     dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//setup confiq with token
export const tokenConfig = getState => {

  const token = getState().auth.token;
  const config = {
    headers: {
      'Content_Type': "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = 'Token ' + token;
  }

  return config
}
