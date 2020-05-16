/*
* Http interceptor is defined here
* */
import axios from "axios";
import * as environments from "@common/environments/environment";
import * as variables from "@/common/config/variables";
import * as functions from "./functions";

let cancelRequest;

class HttpService {
  constructor() {
    axios.defaults.baseURL = environments.BASE_URL;
    axios.defaults.timeout = 50000;

    axios.interceptors.request.use(
      (config) => {
        const separator = config.url.indexOf("?") !== -1 ? "&" : "?";
        config.url = config.url.concat(`${separator}_format=json`);
        const token = localStorage.getItem(variables.ACCESS_TOKEN);
        if (!(
            config.method === "post" &&
            config.data instanceof FormData &&
            config.data.get("grant_type") === "refresh_token"
          ) && token) {
          // we must not send expired token as a header to refresh our token
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
          const refreshToken = localStorage.getItem(variables.REFRESH_TOKEN);
          cancelRequest && cancelRequest();
          if (refreshToken && !cancelRequest) {
            try {
              await axios.request(originalRequest);
              cancelRequest = null;
            } catch (e) {
              cancelRequest = null;
              if (!axios.isCancel(error)) {
                  functions.errorHandler(e);
                  return Promise.reject(e);
              }
            }
          } else {
            // not to show error toast when refresh token is OK to be user friendly
            if (!axios.isCancel(error)) {
              functions.errorHandler(error);
            }
          }
        } else {
          // not to show error toast when is cancelled form axios
          if (!axios.isCancel(error)) {
            functions.errorHandler(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return axios.get(url, config);
  }

  post(url, data, config) {
    config = config || { headers: { "content-type": "application/json" } };
    if (config.headers && !config.headers["content-type"]) {
      config.headers["content-type"] = "application/json";
    }
    return axios.post(url, data, config);
  }

  put(url, data, config) {
    config = config || { headers: { "content-type": "application/json" } };
    return axios.put(url, data, config);
  }

  delete(url, data, config) {
    config = config || { headers: { "content-type": "application/json" } };
    return axios.delete(url, data, config);
  }
}

export default new HttpService();
