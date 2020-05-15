import http from "../helper/http";
import * as urls from "../config/urls";
import { BASE_URL } from "../environments/environment";

export default {
  login(loginData) {
    return new Promise((resolve, reject) => {
      http.post(`${BASE_URL}/${urls.LOGIN}`, loginData)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },

  whoami() {
    return new Promise((resolve, reject) => {
      http.get(urls.WHOAMI)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
};
