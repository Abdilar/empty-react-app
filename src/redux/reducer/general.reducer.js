import {
  GENERAL_SET_CONFIGS
} from "../types";

const initialState = {
  configs: {}
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_SET_CONFIGS:
      return { ...state, configs: action.data };
    default:
      return state;
  }
};

export default GeneralReducer;
