import http from "../utils/http";

const generalAPIs = {
  fetchConfigs() {
    return new Promise((resolve, reject) => {
      http.get('')
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    })
  }
};

export default generalAPIs;
