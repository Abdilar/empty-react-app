/*
* Functions are defined here. They are global functions
* */
import React from 'react';
import moment from 'moment';
import {toast as toastify} from "react-toastify";
import errorMessage from "../asset/data/error";
import patterns from "../asset/data/pattern";
import {PAGE} from "../config/routes.config";
import {BASE_URL} from "../config/variables.config";
import history from '../utils/history.util';

export function toCamelCase(value, separator = ' ') {
  return value.split(separator).map((item, index) => {
    return index ?
      item.split('').reduce((acc, char, index) => index ? acc + char : char.toUpperCase() + acc, '') :
      item;
  }).join('')
}

/*
* Show error toast message
* @param {Object} error - The API error response
* */
export function errorHandler(err) {
  if (!navigator.onLine) {
    history.push(PAGE.ERROR);
    toastify.error('Connection Failed, Please check your network connection');
  }
  else if (err.response && err.response.data) {
    toastify.error(errorMessage[err.response.data.status]);
  }
  else if (err.request) {
    toastify.error("Connection Failed, Please check your network connection");
  } else {
    toastify.error("Error, Please try again");
  }
}

// DONE
export function isWebcamSupported() {
  if (typeof window === 'undefined') {
    return false;
  }
  const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (!getUserMedia && (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || (Object.keys(navigator.mediaDevices.__proto__).length == 0))) {
    return false;
  }
  // we can take a picture up to this part
  const isInlineRecordingSupported = !!window.MediaSource && !!window.MediaRecorder;
  if (isInlineRecordingSupported) {
    return true;
  }
  // we can capture a video up to this part
  return document.createElement('input').capture !== undefined;
}

export function getIsSupportedConstraints(constraints = {}) {
  if (navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints) {
    const supported = {};
    const all = navigator.mediaDevices.getSupportedConstraints();
    Object.entries(constraints).map((single) => {
      if (all[single[0]]) {
        supported[single[0]] = single[1];
      }
    });
    return supported;
  } else {
    return true;
  }
}

export function toastConfirm(message, actionText = 'Confirm', handleAction, type = 'error') {
  if (typeof handleAction !== 'function') return;
  const Render = () => (
    <div>
      <div className="padding__vertical__10">{message}</div>
      <button className="button__default padding__vertical__5 padding__horizontal__10" onClick={handleAction}>{actionText}</button>
    </div>
  );
  toastify.error(<Render />);
}

/*
* Get image based on base 64 structure
* @Param {String} image - The base 64 value
* */
// DONE
export function imageBase64(image) {
  return `data:image/png;base64,${image}`;
}

/*
* Show invalid warning message
* @param {String} message - The message text that must be displayed
* */
export function invalidWarning(message = null) {
  toastify.warn(message ? message : "Please input fields correctly");
}

/*
* Show success message
* @param {String} message - The message text that must be displayed
* */
export function successToast(message = null) {
  toastify.success(message ? message : "Operation has been done successfully");
}

/*
* Show success message
* @param {String} message - The message text that must be displayed
* */
export function errorToast(message = null) {
  toastify.error(message ? message : "Error has been accord ");
}

/*
* Convert illegible texts into legible texts
* @param {String} text - The text that needs to be converted
* */
// DONE
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
export function getImage(id, validLink){
  if (!validLink) return;
  return `${BASE_URL}files/${validLink}/${id}`;
}

/*
* Show jalali data
* @param {Number} timestamp - The timestamp
* @param {String} format - format of date
* @param {Boolean} milisecond - if it's milisecond not set it
* */
// export function jalaliDate(timestamp, format = 'jYYYY/jMM/jDD', milisecond = true) {
//   return momentJalaali(timestamp * (milisecond ? 1 : 1000)).format(format);
// }

export function getDate(timestamp, format = 'YYYY/MM/DD', milisecond = true) {
  const time = timestamp * (milisecond ? 1 : 1000);
  return moment(time).format(format);
}

export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/*
* Show time ago format
* @param {Number} timestamp - The timestamp
* @param {Boolean} milisecond - if it's milisecond not set it
* */
export function timeAgo(timestamp, milisecond = true) {
  return moment(timestamp * (milisecond ? 1 : 1000)).fromNow();
}

/*
* Convert text to masked text
* @param {String} text - A text that will be masked
* @param {String} mask - The mask value
* */
export function mask(text, mask) {
  const regxTerm = "^" + mask + ".*";
  if ((text.length < mask.length) || !text.match(regxTerm)) return mask;

  return text;
}

/*
* Map arrays to value label object
* @Param {Array} data - A data that will be mapped to value label object
* @Param {String} valueKey - A key of data items
* @Param {String} labelKey - A key of data items
* */
/*export function mapToOption(data = [], valueKey, labelKey) {
  return data.map(item => {
    return {
      value: item[valueKey],
      label: item[labelKey]
    }
  });
}*/

/*
* Initial sweet alert
* It's private function!
* */
// function alert() {
//   return Swal
//     .mixin({
//       heightAuto: false,
//       buttonsStyling: false,
//       customClass: option
//   });
// }


/*
* Show delete confirm
* @Param {String} title - A title of the confirm
* @Param {String} text - A description of the confirm
* @Param {String} confirmText - A confirm button text
* @Param {String} cancelText - A cancel button text
* @Param {Boolean} showCancelButton - Show cancel button in  the confirm
* */

// TODO: showCancelButton ro biar ghabl confirmText
// export function confirm(title = '', text = '', html = null, classNameForHtmlMode = {}, icon = '', confirmText = '', cancelText = '', showCancelButton = true) {
//   const newAlert = alert();
//   const contentConfig = html ? {
//     html,
//     customClass: {
//       ...option,
//       ...classNameForHtmlMode,
//       // popup: '!height__auto',
//       // content: 'sweet-alert__content !margin__remove__vertical'
//     }
//   } : {
//     title: title ? title : 'آیا از انجام عملیات اطمینان دارید؟',
//     text: text ? text : "این عملیات غیرقابل بازگشت می باشد!",
//     customClass: {
//       ...option,
//       ...classNameForHtmlMode
//     }
//   };
//   return new Promise((resolve, reject) => {
//     newAlert.fire({
//       showClass: {
//         popup: 'animate__animated animate__fadeInUp'
//       },
//       hideClass: {
//         popup: 'animate__animated animate__fadeOutDown'
//       },
//       ...contentConfig,
//       icon,
//       confirmButtonText: confirmText ? confirmText : 'Confirm',
//       cancelButtonText: cancelText ? cancelText : 'Cancel',
//       showCancelButton: showCancelButton,
//       reverseButtons: true
//     }).then((result) => {
//       if (result.value) {
//         resolve(result);
//       } else {
//         reject(result);
//       }
//     }).catch((result) => {
//       reject(result);
//     });
//   });
// }

/*
* Show success alert
* @Param {String} title - A title of the alert
* @Param {String} text - A description of the alert
* @Param {String} confirmText - A confirm button text
* */
// export function successAlert(title = '', text = '', confirmText = '', timer, icon = 'success') {
//   const newAlert = alert();
//   return new Promise((resolve) => {
//     newAlert.fire({
//       customClass: {
//         container: 'sweet-alert__container',
//         popup: 'sweet-alert__error__popup',
//         title: 'sweet-alert__title',
//         content: 'sweet-alert__content',
//         icon: 'sweet-alert__icon',
//         confirmButton: 'uk-button uk-button-primary margin__horizontal__5 flex-1',
//         cancelButton: 'uk-button uk-button-default margin__horizontal__5',
//       },
//       title: title ? title : 'موفق!',
//       text: text ? text : "عملیات مورد نظر با موفقیت انجام شد.",
//       icon,
//       confirmButtonText: confirmText ? confirmText : 'سپاس',
//       ...(timer ? {timer} : {})
//     }).then(() => resolve());
//   });
// }

/*
* Show error alert
* @Param {String} title - A title of the alert
* @Param {String} text - A description of the alert
* @Param {String} confirmText - A confirm button text
* */
// export function errorAlert(title = '', text = '', confirmText = '') {
//   const newAlert = alert();
//   newAlert.fire({
//     customClass: {
//       container: 'sweet-alert__container',
//       popup: 'sweet-alert__error__popup',
//       title: 'sweet-alert__title',
//       content: 'sweet-alert__content',
//       icon: 'sweet-alert__icon',
//       confirmButton: 'uk-button uk-button-primary margin__horizontal__5 flex-1',
//       cancelButton: 'uk-button uk-button-default margin__horizontal__5',
//     },
//     title: title ? title : 'خطا!',
//     text: text ? text : "متاسفانه مشکلی پیش آمده است. لطفا دوباره امتحان کنید.",
//     icon: 'error',
//     confirmButtonText: confirmText ? confirmText : 'باشه'
//   });
// }

/*
* Specifies whether or not there is an object in the array
* @Param {Array} array - Search array
* @Param {Object} object - An object to search
* @Param {String} arrayKey - A key of array
* @Param {String} objectKey - A key of object
* */
/*export function existObjectArray(array = [], object, arrayKey, objectKey) {
  if (!array) return false;
  return array.findIndex(item => item[arrayKey] === object[objectKey]) !== -1;
}*/

/*
* Return the filtered array
* @Param {Array} array - An array that is filtered
* @Param {String} arrayKey - A key of array
* @Param {String} filter - A filter value
* @Param {Boolean} equal - Equal item of array and filter
* */
/*export function filterArray(array = [], arrayKey, filter, equal = true) {
  if (!array) return false;

  if (equal) {
    return array.filter(item => item[arrayKey] === filter);
  } else {
    return array.filter(item => item[arrayKey] !== filter);
  }
}*/

export function deleteObjectField(object = {}, keys = []) {
  const {...newObject} = object;
  keys.forEach(key => delete newObject[key]);
  return newObject;
}

/*export function matchPattern(pattern, event, callback = null) {
  const allowKeys = ['Tab', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Meta', 'Alt', 'Control', 'Shift', 'CapsLock', 'Meta'];
  if (allowKeys.includes(event.key)) return;
  const regx = new RegExp(patterns[pattern]);
  if (!regx.test(event.key)) {
    event.preventDefault();
    callback && callback();
  }
}*/

export function setAppLanguage(key, defaultLanguage = 'fa') {
  const language = localStorage.getItem(key) || defaultLanguage;
  document.head.parentElement.setAttribute('lang', language);
}

export function setAppDirection(key, defaultDir = 'rtl') {
  const direction = localStorage.getItem(key) || defaultDir;
  document.head.parentElement.setAttribute('dir', direction);
}

export function getAppLanguage() {
  return document.head.parentElement.getAttribute('lang');
}

export function matchPattern(pattern, value, callback = null) {
  let result = value;
  const regx = new RegExp(patterns[pattern]);
  if (!regx.test(value[value.length - 1])) {
    callback?.();
    result = value.substring(0, value.length -1);
  }
  return result;
}

export function toggleTooltip(element, time = 5000) {
  const className = "!display__block";
  const tooltipElement = document.querySelector(".input-tooltip");
  if (!tooltipElement || tooltipElement.classList.contains(className)) return;
  tooltipElement.classList.add(className);
  setTimeout(() => {
    tooltipElement.classList.remove(className);
  }, time);
}

export function parseQuery(query = '') {
  const queryString = isEmpty(query) ? window.location.search : query;
  const queryData = queryString.replace("?", "").split("&");
  if (!queryData.length || !queryData[0]) return {};

  return queryData.reduce((acc, current) => {
    const singleQuery = current.split("=");
    const queryParameter = singleQuery.length === 2 ? {[singleQuery[0]]: singleQuery[1]} : {};
    return { ...acc, ...queryParameter};
  }, {});
}

export function getQueryParameter(query, parameterName) {
  const parsedQuery = parseQuery(query);
  return parsedQuery[parameterName];
}

export function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  const urlparts = url.split('?');
  if (urlparts.length >= 2) {
    const prefix = encodeURIComponent(parameter) + '=';
    const pars = urlparts[1].split(/[&;]/g);
    //reverse iteration as may be destructive
    for (let i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }
    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Number} SliceSize to process the byteCharacters
 * @return Blob
 */
export function b64toBlob(b64Data, contentType, sliceSize = 512) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}

/**
 * @return {string}
 */
export function secondsToMMSS(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds - (minutes * 60);
  seconds = Math.round(seconds * 100) / 100;
  let result = "";
  result += (seconds < 10 ? "0" + seconds : seconds);
  result += " : " +  (minutes < 10 ? "0" + minutes : minutes);
  return result;
}

/**
 * Group by function
 * @param list
 * @param key
 * @returns {Map<any, any>}
 */
export function groupBy(list, key) {
  const map = new Map();
  const keyGetter = request => request[key];
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function isNationalCodeValid(nationalCode) {
  if (nationalCode.length !== 10) {
    return false
  }
  const level1 = Number(nationalCode.charAt(9));
  const level2 = Number(nationalCode.charAt(0)) * 10 +
    Number(nationalCode.charAt(1)) * 9 + Number(nationalCode.charAt(2)) * 8 +
    Number(nationalCode.charAt(3)) * 7 +
    Number(nationalCode.charAt(4)) * 6 +
    Number(nationalCode.charAt(5)) * 5 +
    Number(nationalCode.charAt(6)) * 4 +
    Number(nationalCode.charAt(7)) * 3 + Number(nationalCode.charAt(8)) * 2;
  const level3 = level2 - Math.floor(Number(level2 / 11)) * 11;
  return ((level3 === 0 && level3 === level1) || (level3 === 1 && level1 === 1) || (level3 > 1 && level1 === 11 - level3))
}

export function dispatchSave(form) {
  const event = new Event('submit', {
    'bubbles': true,
    'cancelable': true
  });
  form.current.dispatchEvent(event);
}

export function shortText(text = '', number = 20) {
  if (!text || text.length <= number) return text;

  return text.substr(0, number) + '...';
}

export function lightOrDark(color) {
  let r, g, b, hsp;
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 180) return 'light';
  return 'dark';
}

export function getFileExtension(filename) {
  if (!filename) return undefined;
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export function getExtensionRegex(extensions = []) {
  if (!Array.isArray(extensions) && !extensions.length) return /[a-zA-Z0-9]+/i;
  const regex = extensions.reduce((accumulator, currentValue, currentIndex) => {
    return accumulator + ("." + currentValue + (extensions.length - 1 !== currentIndex ? "|" : ""))
  }, '');
  return new RegExp(`(${regex})`, 'i');
}

export function intersectionObserver(selector, threshold = 0) {
  return new Promise((resolve, reject) => {
    try {
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting === true)
          resolve('Element is fully visible in screen:');
      }, { threshold: [threshold] });
      observer.observe(document.querySelector(selector));
    } catch (e) {
      reject(e);
    }
  })
}


export function resizeObserver(callback) {
  try {
    return new ResizeObserver(() => callback.call());
  } catch (error) {
    console.log('Error on resizeObserver : ', error);
  }
}

export function getAbbrName(firstName, lastName, defaultValue = 'D') {
  if (!firstName || !lastName) return defaultValue[0].toUpperCase();
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}


export function getPath(pathname) {
  const path = (pathname && pathname.split('/')) || window.location.pathname.split('/');
  const result = [];
  path.forEach(item => {
    if (!!item) result.push(item);
  });
  return  result;
}

export function capitalize(text) {
  if (!text) return '';
  return text[0].toUpperCase() + text.slice(1);
}

// ******** SAFFRON UTILS FUNCTIONS
// DONE
function checkTypeError() {
  let errorMessages = '';
  [...arguments].map((argument, index) => {
    if (!isObject(argument)) throw `${index}th index of the argument is not an object!`;
    const type = Object.keys(argument)[0];
    switch (type) {
      case 'symbol':
        if (!isSymbol(argument[type])) errorMessages += `${index}th of the argument is not a symbol.\n`;
        return;
      case 'undefined':
        if (!isUndefined(argument[type])) errorMessages += `${index}th of the argument is not a undefined.\n`;
        return;
      case 'bigint':
        if (!isBigInt(argument[type])) errorMessages += `${index}th of the argument is not a bigint.\n`;
        return;
      case 'string':
        if (!isString(argument[type])) errorMessages += `${index}th of the argument is not a string.\n`;
        return;
      case 'number':
        if (!isNumber(argument[type])) errorMessages += `${index}th of the argument is not a number.\n`;
        return;
      case 'boolean':
        if (!isBoolean(argument[type])) errorMessages += `${index}th of the argument is not a boolean.\n`;
        return;
      case 'array':
        if (!isArray(argument[type])) errorMessages += `${index}th of the argument is not an array.\n`;
        return;
      case 'object':
        if (!isObject(argument[type])) errorMessages += `${index}th of the argument is not an object.\n`;
        return;
      case 'node':
        if (!isNode(argument[type])) errorMessages += `${index}th of the argument is not a node.\n`;
        return;
      case 'element':
        if (!isElement(argument[type])) errorMessages += `${index}th of the argument is not an element.\n`;
        return;
      case 'function':
        if (!isFunction(argument[type])) errorMessages += `${index}th of the argument is not a function.\n`;
        return;
      default:
        return;
    }
  });

  if (errorMessages) throw errorMessages;

  return false;
}


function isValidAttrs(attr) {
  checkTypeError({string: attr});

  const attrs = ['className', 'id', 'onclick', 'style'];
  return attrs.includes(attr);
}

function isSameArray(source, target) {
  checkTypeError({array: source}, {array: target});
  if (isEmptyArray(source) || isEmptyArray(target)) return isEqualLength(source, target);
  if (!isEqualLength(source, target)) return false;

  return source.every((sourceValue, index) => {
    return isArray(sourceValue) && isArray(target[index]) ?
      isEqualLength(sourceValue.length, target[index].length) ?
        isSameArray(sourceValue, target[index]) :
        false :
      isObject(sourceValue) && isObject(target[index]) ?
        isSameObject(sourceValue, target[index]):
        isPrimitive(sourceValue) && isPrimitive(target[index]);
  });
}

// DONE
export function isRequired() {
  throw Error('Argument is missing');
}

// DONE
export const {isArray} = Array;

// DONE
export function isObject(data) {
  return data !== null && typeof data === 'object' && !isArray(data);
}

// DONE
export function isNode(data) {
  return isObject(data) && data.nodeType >= 1;
}

// DONE
export function isElement(data) {
  return isObject(data) && data.nodeType === 1;
}

// DONE
export function isString(data) {
  return typeof data === 'string';
}

// DONE
export function isNumber(data) {
  return typeof data === 'number';
}

// DONE
export function isBigInt(data) {
  return typeof data === 'bigint';
}

// DONE
export function isSymbol(data) {
  return typeof data === 'symbol';
}

// DONE
export function isBoolean(data) {
  return typeof data === 'boolean';
}

// DONE
export function isUndefined(data) {
  return typeof data === 'undefined';
}

// DONE
export function isFunction(data) {
  return typeof data === 'function';
}

//
export function isPrimitive(data) {
  return !(isArray(data) || isObject(data) || isFunction(data)) && data !== null
}

export function isEmpty(data) {
  return !(isArray(data) ?
    data.length : (
    isObject(data) ?
      isElement(data) || Object.keys(data).length : (
        !(isNumber(data) || isBoolean(data)) ? data : true
      )
    )
  );
}

export function isEmptyObject(data) {
  return !(isObject(data) ? Object.keys(data).length : false);
}

export function isEmptyArray(data) {
  return !(isArray(data) ? data.length : false);
}

export function isEmptyString(data) {
  return !(isString(data) ? data : false);
}

export function isEqualLength(source, target) {
  checkTypeError({array: source}, {array: target});
  return [...source].length === [...target].length;
}

export function isEqualArray(source, target) {
  checkTypeError({array: source}, {array: target});
  if (isEmptyArray(source) || isEmptyArray(target)) return isEqualLength(source, target);
  if (!isEqualLength(source, target)) return false;

  return source.every((sourceValue) => {
    return isArray(sourceValue) ?
      target.filter(item => isArray(item)).findIndex(item => isEqualArray(sourceValue, item)) !== -1 :
      isObject(sourceValue) ?
        target.filter(item => isObject(item)).findIndex(item => isEqualObject(sourceValue, item)) !== -1 :
        target.includes(sourceValue);
  });
}

export function isEqualObject(source, target) {
  checkTypeError({object: source}, {object: target});
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);
  if (isEmptyArray(sourceKeys) || isEmptyArray(targetKeys)) return isEqualLength(sourceKeys, targetKeys);
  if (!isEqualLength(sourceKeys, targetKeys)) return false;

  return sourceKeys.every((sourceKey) => {
    return isObject(source[sourceKey]) && isObject(target[sourceKey]) ?
      isEqualObject(source[sourceKey], target[sourceKey]) :
      isArray(source[sourceKey]) && isArray(target[sourceKey]) ?
        isEqualArray(source[sourceKey], target[sourceKey]) :
        targetKeys.includes(sourceKey) && source[sourceKey] === target[sourceKey];
  });
}

export function isSameObject(source, target) {
  checkTypeError({object: source}, {object: target});
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);
  if (isEmptyArray(sourceKeys) || isEmptyArray(targetKeys)) return isEqualLength(sourceKeys, targetKeys);
  if (!isEqualLength(sourceKeys, targetKeys)) return false;

  return sourceKeys.every((sourceKey) => {
    return isObject(source[sourceKey]) && isObject(target[sourceKey]) ?
      isSameObject(source[sourceKey], target[sourceKey]) :
      isArray(source[sourceKey]) && isArray(target[sourceKey]) ?
        isSameArray(source[sourceKey], target[sourceKey]) :
        targetKeys.includes(sourceKey);
  });
}

export function isEqual(source, target) {
  return (isArray(source) && isArray(target)) || (isObject(source) && isObject(target)) ?
    isArray(source) ?
      isEqualArray(source, target) :
      isEqualObject(source, target) :
    !(isArray(source) || isArray(target) || isObject(source) || isObject(target)) ?
      Object.is(source, target) :
      false;
}

export function isUnitMeasurement(data, unit) {
  checkTypeError({string: data}, {string: unit});

  const matchData = data.replace(unit, '').match(/^[0-9]+/);
  const unitData = data.substr(data.length - unit.length, unit.length);
  return unitData === unit && matchData.input === matchData[0];
}

export function isLast(array, index) {
  return !isEmptyArray(array) ? array.length - 1 === index : false;
}

export function isFirst(array, index) {
  return !isEmptyArray(array) && index === 0;
}

export function getLastItem(array) {
  return isEmptyArray(array) ? undefined : array[array.length - 1];
}

export function sortObjects(data = isRequired(), sortKey = isRequired(), isAscending = true) {
  checkTypeError({array: data}, {string: sortKey});
  const asc = isAscending ? -1 : 1;
  return data.sort((a, b) => {
    const propA = a[sortKey] ? a[sortKey].toString().toUpperCase() : '';
    const propB = b[sortKey] ? b[sortKey].toString().toUpperCase() : '';

    return (propA < propB) ?
      asc :
      (propA > propB) ? asc * -1 : 0;
  });
}

export function objectsToFlatString(target, key) {
  if (!isArray(target) ) return "";
  const flatString = target.reduce((accumulator, currentValue) => accumulator + `${isEmpty(currentValue[key]) ? "" : currentValue[key] + ','}`, '');
  return flatString.replace(/,*$/, '');
}

export function objectsToFlatObject(target) {
  if (!isArray(target) ) return {};
  return target.reduce((accumulator, currentValue) => {
    const key = Object.keys(currentValue)[0];
    return {...accumulator, [key]: currentValue[key]}
  }, {});
}

export function objectToQueryParameter(object) {
  if (!isObject(object)) return "";
  const query = Object.keys(object).reduce((accumulator, currentKey) => {
    const parameter = isEmpty(object[currentKey]) ? '' : `${currentKey}=${isArray(object[currentKey]) ? objectsToFlatString(object[currentKey], 'id') : object[currentKey]}&`;
    return accumulator + parameter;
  }, '');
  return query.replace(/&*$/, '');
}

export function queryParameterToObject(query) {
  if (isEmpty(query) ) return {};

  return parseQuery(query);
}

export function calculateTextWidth(element) {
  checkTypeError({element: element});

  const canvas = createElement("canvas");
  const context = canvas.getContext("2d");
  const fontFamily = getComputedStyle(element, 'font-family');
  const fontSize = getComputedStyle(element, 'font-size');
  context.font = `${fontSize} ${fontFamily}`;
  const text = context.measureText(element.value);
  return Math.ceil(text.width);
}

export function convertMatrixToTransform(matrix, type) {
  checkTypeError({string: matrix}, {string: type});

  const convertedMatrix = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
  switch (type) {
    case 'translateY':
      return +convertedMatrix[5];
    case 'translateX':
      return +convertedMatrix[4];
    case 'scaleY':
      return +convertedMatrix[3];
    case 'skewX':
      return +convertedMatrix[2];
    case 'skewY':
      return +convertedMatrix[1];
    default:
      return +convertedMatrix[0];
  }
}
/*
* Get random number
* @param {Number} number - A number that must be generated randomly
* */
// DONE
export function randomNumber(number = 1) {
  checkTypeError({number: number});

  return Math.floor(Math.random() * number);
}

export function getComputedStyle(element, property) {
  checkTypeError({element: element},{string: property});

  return window.getComputedStyle(element).getPropertyValue(property);
}

export function getScrollBarWidth(element) {
  checkTypeError({element: element});

  return element.offsetWidth - element.clientWidth;
}

export function getElementByComputedStyle(sourceElement, property, values, startLevel = -1) {
  checkTypeError({element: sourceElement},{string: property},{array: values});

  const computedStyle = getComputedStyle(sourceElement, property);
  const isBody = sourceElement.tagName === 'BODY';
  return !values.includes(computedStyle) && !isBody ?
    getElementByComputedStyle(sourceElement.parentElement, property, values, startLevel + 1) :
    {element: sourceElement, level: startLevel};
}

export function toggleClassElement(element, className) {
  checkTypeError({element: element},{string: className});

  element.classList.toggle(className)
}

export function addClassElement(element, className) {
  checkTypeError({element: element},{string: className});

  element.classList.add(className)
}

export function removeClassElement(element, className) {
  checkTypeError({element: element},{string: className});

  element.classList.remove(className)
}

export function createElement(tag, content = '', attrs = {}) {
  checkTypeError({string: tag}, {object: attrs});

  const element = document.createElement(tag);
  if (!isEmptyString(content)) {
    element.innerHTML = content;
  }

  Object.keys(attrs).forEach(key => {
    if(isValidAttrs(key.toString())) {
      element[key] = attrs[key];
    }
  });
  return element;
}

// ******** SAFFRON COMPONENT FUNCTIONS

// MODAL COMPONENT
export function modal(body, option = {}, target = 'body') {
  const TYPE = {
    CONFIRM: 'confirm',
    DIALOG: 'dialog'
  };
  try {
    return new Promise((resolve, reject) => {
      const {
        backgroundClose = false,
        escClose = false,
        type = TYPE.CONFIRM,
        confirmButton = 'Confirm',
        rejectButton = 'Reject',
        footer = '',
        header = ''
      } = option;
      const preClass = 'saffron-modal';
      const openClass = `${preClass}--open`;
      const targetElement = document.querySelectorAll(target)[0];
      if (isEmpty(targetElement)) return reject('Modal target not found');
      if (!isString(body)) return reject("Body must be a string");

      const modal = createElement('section', '', {className: preClass});
      const modalDialog = createElement('div', '', {className: `${preClass}__dialog`});
      const modalBody = createElement('div', body, {className: `${preClass}__body`});
      modalDialog.appendChild(modalBody);

      if (!isEmptyString(header)) {
        const modalHeader = createElement('header', header, {className: `${preClass}__header`});
        modalDialog.insertAdjacentElement('afterbegin', modalHeader);
      }

      if (!isEmptyString(footer) && isEqual(type, TYPE.DIALOG)) {
        const modalFooter = createElement('footer', footer, {className: `${preClass}__footer`});
        modalDialog.insertAdjacentElement('beforeend', modalFooter);
      }

      if (isEqual(type, TYPE.CONFIRM)) {
        const confirm = createElement('button', confirmButton, {className: `${preClass}__button ${preClass}__button--confirm`, onclick: () => hide({confirmed: true})});
        const reject = createElement('button', rejectButton, {className: `${preClass}__button ${preClass}__button--reject`, onclick: () => hide({confirmed: false})});
        const modalFooter = createElement('footer', footer, {className: `${preClass}__footer`});
        modalFooter.appendChild(reject);
        modalFooter.appendChild(confirm);
        modalDialog.insertAdjacentElement('beforeend', modalFooter);
      }

      modal.appendChild(modalDialog);
      targetElement.appendChild(modal);

      setTimeout(() => show(), 0);

      if (backgroundClose) {
        modal.onclick = (event) => {
          const isOpen = event.srcElement.classList.contains(openClass);
          if (isOpen ) {
            hide();
          }
        };
      }

      if (escClose) {
        document.onkeydown = ({key}) => {
          if (key !== 'Escape') return;
          hide();
        };
      }

      function show() {
        modal.classList.add(openClass);
      }

      function hide(reason = 'closed') {
        modal.classList.remove(openClass);
        resolve(reason);
        setTimeout(() => targetElement.removeChild(modal), 500);
      }
    });
  } catch (error) {
    return Promise.reject(`Error in modal: ${error}`);
  }
}


// TOAST COMPONENT
export const TOAST_TYPE = {
  DEFAULT: 'default',
  INFO: 'info',
  DANGER: 'danger',
  WARNING: 'warning',
  SUCCESS: 'success'
};

export const TOAST_ICON = {
  TRASH: 'trash',
  WARNING: 'warning',
};

export const TOAST_ALERT_OPTION = {
  autoClose: 0,
  close: false,
  confirmButtonText: 'Ok',
  content: 'This is a alert',
  icon: TOAST_ICON.WARNING,
  isAbsolute: true,
  type: TOAST_TYPE.DANGER,
};

const TOAST_CONFIRM_OPTION = {
  autoClose: 0,
  close: false,
  confirmButtonText: 'Confirm',
  rejectButtonText: 'Reject',
  content: 'This is a confirm',
  icon: TOAST_ICON.WARNING,
  isAbsolute: true,
  type: TOAST_TYPE.DEFAULT
};

export const toast = {
  preClass: 'saffron-toast',
  count: randomNumber(10000),
  timeout: 50,
  getOpenClass() { return`${this.preClass}--open` },
  addTranslateY(toast) {
    const isAbsolute = getComputedStyle(toast, 'position') === 'absolute';
    if (!isAbsolute) return;

    const height = +getComputedStyle(toast, 'height').split('px')[0];
    let toasts = [...toast.parentElement.children].filter(item => item.classList.contains(this.preClass));

    toasts = toasts.filter((item, index) => index !== 0);
    toasts.forEach((item, index) => {
      setTimeout(() => item.style['transform'] = `translateY(${(index + 1) * height}px)`, this.timeout * (toasts.length - index))
    });
  },
  removeTranslateY(toast, isAbsolute) {
    const toastId = toast.getAttribute('id');
    const height = +getComputedStyle(toast, 'height').split('px')[0];
    let toasts = [...toast.parentElement.children].filter(item => item.classList.contains(this.preClass));
    const selectedToastIndex = toasts.findIndex(item => item.getAttribute('id') === toastId) - 1;
    toasts = toasts.filter((item, index) => index !== 0);
    selectedToastIndex >= 0 && (toasts[selectedToastIndex].style['z-index'] = 1);
    if (!isAbsolute) return;
    toasts.forEach((item, index) => {
      if (index < selectedToastIndex) return;
      const isLastItem = isLast(toasts, selectedToastIndex);
      setTimeout(() => item.style['transform'] = `translateY(${(isLastItem ? index - 1 : index) * height}px)`, this.timeout * index)
    });
  },
  show(toast, target) {
    const toastsCount = [...target.getElementsByClassName(this.preClass)].length;
    const openClass = this.getOpenClass();
    const targetFirstChild = target.children[0];
    target.insertBefore(toast, targetFirstChild);
    target.classList.add(`parent__${this.preClass}`);
    this.addTranslateY(toast);
    setTimeout(() => toast.classList.add(openClass), toastsCount * this.timeout);
  },
  hide(toast, promise, promiseText) {
    const isAbsolute = getComputedStyle(toast, 'position') === 'absolute';
    const openClass = this.getOpenClass();
    toast.classList.remove(openClass);
    promise(promiseText);
    this.removeTranslateY(toast, isAbsolute);
    const hasSingleToast = !(toast.parentElement.getElementsByClassName(this.preClass).length > 1);
    hasSingleToast && (toast.style['transform'] = '');

    setTimeout(() => {
      hasSingleToast && toast.parentElement.classList.remove(`parent__${this.preClass}`);
      toast.parentElement.removeChild(toast);
    }, isAbsolute ? 500 : 175);
  },
  closeAutomatically(toast, reject, time) {
    setTimeout(() => {
      const exist = !isEmpty(toast.parentElement);
      exist && this.hide(toast, reject, 'closed')
    }, time);
  },
  createToast(option, resolve, reject) {
    const {
      autoClose = 0,
      close = true,
      confirmButtonText,
      content = '',
      icon,
      isAbsolute = true,
      rejectButtonText,
      type = TOAST_TYPE.DEFAULT
    } = option;

    const toastEl = createElement('section', '', {id: `${this.preClass}-${this.count}`,className: `${this.preClass} ${this.preClass}--${type} ${isAbsolute ? this.preClass + '--absolute' : ''}`});
    const toastWrapperEl = createElement('div', '', {className: `${this.preClass}__wrapper`});
    const iconEl = createElement('span', '', {className: `${this.preClass}__icon`});
    const iconContentEl = createElement('i', '', {className: `icon-${icon}`});
    const contentEl = createElement('div', '', {className: `${this.preClass}__content`});
    const textEl = createElement('span', content, {className: `${this.preClass}__text`});
    const controllerEl = createElement('span', '', {className: `${this.preClass}__controller`});
    const confirmButtonEl = createElement('button', confirmButtonText, {className: `${this.preClass}__button ${this.preClass}__button--confirm`, onclick: () => this.hide(toastEl, resolve, 'confirmed')});
    const rejectButtonEl = createElement('button', rejectButtonText, {className: `${this.preClass}__button ${this.preClass}__button--reject`, onclick: () => this.hide(toastEl, reject, 'rejected')});
    const closeEl = createElement('span', '', {className: `${this.preClass}__close`, onclick: () => this.hide(toastEl, reject, 'closed')});
    const closeIconEl = createElement('i', '', {className: 'icon-close'});
    const progressEl = createElement('div', '', {className: `${this.preClass}__progress--${type}`});
    const progressContentEl = createElement('div', '', {className: 'progress__content animation--progress', style: `animation-duration: ${autoClose/1000}s`});

    close && closeEl.appendChild(closeIconEl);
    !isEmptyString(rejectButtonText) && controllerEl.appendChild(rejectButtonEl);
    !isEmptyString(confirmButtonText) && controllerEl.appendChild(confirmButtonEl);
    close && controllerEl.appendChild(closeEl);
    contentEl.appendChild(textEl);
    contentEl.appendChild(controllerEl);
    !isEmptyString(icon) && iconEl.appendChild(iconContentEl);
    toastWrapperEl.appendChild(iconEl);
    toastWrapperEl.appendChild(contentEl);
    toastEl.appendChild(toastWrapperEl);
    progressEl.appendChild(progressContentEl);
    !!autoClose && toastEl.appendChild(progressEl);
    this.count++;
    return toastEl;
  },

  alert() {
    switch (arguments.length) {
      case 0:
        this.callAlert();
        break;
      case 1:
        const firstArg = arguments[0];
        if (isObject(firstArg)) {
          this.callAlert('body', firstArg);
        } else {
          this.callAlert(firstArg);
        }
        break;
      default:
        this.callAlert(...arguments);
        break;
    }
  },

  confirm() {
    switch (arguments.length) {
      case 0:
        this.callConfirm();
        break;
      case 1:
        const firstArg = arguments[0];
        if (isObject(firstArg)) {
          this.callConfirm('body', firstArg);
        } else {
          this.callConfirm(firstArg);
        }
        break;
      default:
        this.callConfirm(...arguments);
        break;
    }
  },

  callAlert(target = 'body', option = {}) {
    return new Promise( (resolve, reject) => {
      try {
        const targetElement = document.querySelectorAll(target)[0];
        if (isEmpty(targetElement)) return reject('Toast target not found');
        const options = {...TOAST_ALERT_OPTION, ...option};
        const toastElement = this.createToast(options, resolve, reject);
        this.show(toastElement, targetElement);
        !!options.autoClose && this.closeAutomatically(toastElement, reject, options.autoClose);
      } catch (error) {
        return reject(`Error in toast: ${error}`);
      }
    });
  },

  callConfirm(target = 'body', option = {})   {
    return new Promise((resolve, reject) => {
      try {
        const targetElement = document.querySelectorAll(target)[0];
        if (isEmpty(targetElement)) return reject('Toast target not found');
        const options = {...TOAST_CONFIRM_OPTION, ...option};
        const toastElement = this.createToast(options, resolve, reject);
        this.show(toastElement, targetElement);
        !!options.autoClose && this.closeAutomatically(toastElement, reject, options.autoClose);
      } catch (error) {
        return Promise.reject(`Error in toast: ${error}`);
      }
    });
  }
};
