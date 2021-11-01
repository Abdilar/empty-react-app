import http from "service/http.service";

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
