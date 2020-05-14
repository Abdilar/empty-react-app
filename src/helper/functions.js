/*
* Functions are defined here. They are global functions
* */

import { toast } from "react-toastify";
import errorMessage from "../assets/data/error";

/*
* Show error toast message
* @param {Object} error - The API error response
* */
export function errorHandler(error) {
  if (!navigator.onLine) {
    toast.error(errorMessage["connection"]);
  } else if (error.response && error.response.status) {
    if (error.response.status === 400 || error.response.status === 404) {
      toast.error(<span dangerouslySetInnerHTML={{__html: error.response.data.error_description || errorMessage[error.response.status]}} />);
    } else {
      toast.error(errorMessage[error.response.status]);
    }
  } else {
    toast.error(errorMessage["unknown"]);
  }
}

/*
* Show invalid form warning message
* @param {String} message - The message text that must be displayed
* */
export function invalidFormWarning(message = null) {
  toast.warn(message ? message : "Please input fields correctly");
}

