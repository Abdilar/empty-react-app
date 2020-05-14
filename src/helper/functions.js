/*
* Functions are defined here. They are global functions
* */
import moment from "moment";
import { toast } from "react-toastify";
import errorMessage from "../assets/data/error";
import * as environments from "../environments/environment";

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

/*
* Get random number
* @param {Number} number - A number that must be generated randomly
* */
export function getRandomNumber(number = 1) {
  return Math.floor(Math.random() * number);
}

/*
* Convert illegible texts into legible texts
* @param {String} text - The text that needs to be converted
* */
export function slugify(text = "") {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
}

/*
* Get images from the server
* @param {Number} id - The image ID
* @param {String} size - The image size
* */
export function getImage(id, size = "d04_standard"){
  return `${environments.BASE_URL}/file/${size}/${id}`;
}

/*
* Show time ago format
* @param {number} timestamp - The timestamp
* @param {boolean} thousand - if has thousand not set it
* */
export function timeAgo(timestamp, thousand = true) {
  return moment(timestamp * (thousand ? 1 : 1000)).fromNow();
}
