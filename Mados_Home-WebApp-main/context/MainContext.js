import react, { useReducer } from "react";
import createDataContext from "./createDataContext";
import axios from "axios";
import {houses} from '../constants/data'

const initialState = {
  houses:null,
};

const housesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "set_houses":
      return{...state,houses:action.payload}
      default:
      return state;
    }
};


const setHouses = (dispatch) => {
	return async (houses) => {
      await dispatch({
        type: 'set_houses',
        payload: houses,
      });
	};
};


export const { Context, Provider } = createDataContext(
  housesReducer,
  {
    setHouses
  },
  initialState
);
