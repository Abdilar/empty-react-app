import * as types from '../types';
import api from '../../api/general.api';
import {CONFIG} from '../../config/variables.config';

export const setConfigs = (configs) => ({type: types.GENERAL_SET_CONFIGS, data: configs})

export function fetchConfigs() {
  return () => {
    return api.fetchConfigs()
      .then(response => localStorage.setItem(CONFIG, JSON.stringify(response)))
      .catch(error => Promise.reject(error));
  }
}
