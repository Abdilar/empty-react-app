/*
* Http interceptor is defined here
* */
import axios from "axios";
import * as variables from "../config/variables";
import * as functions from "./functions";
// import {store} from 'redux/store';

// import history from "../helper/history";
// import { toast } from "react-toastify";
// const ACCESS_TOKEN_URL = 'users/accessToken';
// let cancelRequest;

class HttpService {
  constructor() {
    axios.defaults.baseURL = variables.BASE_URL;
    axios.defaults.timeout = variables.AXIOS_TIMEOUT;

    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(variables.ACCESS_TOKEN);
        // TODO: dar refresh token, token ghabli ro dar header nafres. in check shavad va shart monaseb inja neveshte shavad
        if (token) {
          // we must not send expired token as a header to refresh our token
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
          // toast.error(JSON.stringify(error.response.data));
        // const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
          functions.errorHandler(error);
          // const refreshToken = localStorage.getItem(variables.REFRESH_TOKEN);
          // cancelRequest && cancelRequest();
          // if (refreshToken && !cancelRequest) {
            // try {
              // await store.dispatch(actions.refreshToken(refreshToken));
              // return new Promise(async (resolve, reject) => {
              //    await axios
              //      .request(originalRequest)
              //        .then(response => resolve(response))
              //        .catch(error => reject(error))
              //        .finally(() => cancelRequest = null);
              // });
            // } catch (e) {
            //   cancelRequest = null;
            //   if (!axios.isCancel(error)) {
            //     functions.errorHandler(e);
            //     return Promise.reject(e);
            //   }
            // }
            // functions.errorHandler(error);

          // } else {
          //   // not to show error toast when refresh token is OK to be user friendly
          //   if (!axios.isCancel(error)) {
          //     functions.errorHandler(error);
          //   }
          // }
        } else {
          // not to show error toast when is cancelled form axios
          // if (!axios.isCancel(error)) {
          functions.errorHandler(error);
          // }
        }
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    try {
      let mainConfig;
      if (config && config.captcha) {
        mainConfig = {...config, headers: { "captcha": config.captcha }};
        delete config['captcha'];
      }
      config = (mainConfig ? mainConfig : config);
    } catch (e) {
      console.log('http get error: ', e);
    }
    return axios.get(url, config);
  }

  post(url, data, config) {
    try {
      let mainConfig;
      if (config && config.captcha) {
        mainConfig = {...config, headers: { "captcha": config.captcha }};
        delete config['captcha'];
      }
      config = (mainConfig ? mainConfig : config) || { headers: { "content-type": "application/json"} };
      if (config.headers && !config.headers["content-type"]) {
        config.headers["content-type"] = "application/json";
      }
    } catch (e) {
      console.log('http post error: ', e);
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
