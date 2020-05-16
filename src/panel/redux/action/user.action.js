import * as commonVariables from "@/common/config/variables";
import api from "../../api/user.api";
import * as types from "./types";

export const setUser = (user) => {
  return { type: types.USER_SET_USER, data: user };
};
export const setIsLoggedIn = (value) => {
  return { type: types.USER_SET_IS_LOGGED_IN, data: value };
};

export function login(data) {
  return (dispatch) => {
    return api.login(data)
      .then((response) => {
        localStorage.setItem(commonVariables.ACCESS_TOKEN, response.access_token);
        localStorage.setItem(commonVariables.REFRESH_TOKEN, response.refresh_token);
        return new Promise((resolve, reject) =>
          dispatch(whoami()).then(
            async (response) => {
              await dispatch(setIsLoggedIn(true));
              return resolve(response);
            },
            (error) => reject(error)
          )
        );
      })
      .catch((error) => Promise.reject(error));
  };
}

export function whoami() {
  return (dispatch) => {
    return api.whoami()
      .then((response) => {
        localStorage.setItem(commonVariables.USER_INFO, JSON.stringify(response));
        dispatch(setUser(response));
      })
      .catch((error) => Promise.reject(error));
  };
}

export function logout() {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      localStorage.removeItem(commonVariables.USER_INFO);
      localStorage.removeItem(commonVariables.ACCESS_TOKEN);
      localStorage.removeItem(commonVariables.REFRESH_TOKEN);
      await dispatch(setIsLoggedIn(false));
      await dispatch(setUser({}));
      resolve();
    });
  };
}
