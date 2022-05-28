import react, { useReducer } from "react";
import createDataContext from "./createDataContext";
import axios from "axios";

const initialState = {
  isAuthenticated:false,
  user:null,
  favorites:[],
  booked:[]
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    /* case 'login':
      return {isAuthenticated:true,user:action.payload}
    case 'make_publisher':
      return {...state,subscription:action.payload,isPublisher:true}
    case 'logout':
      return {...initialState} */
    case 'set_user':
      return {...state,user:action.payload}
    case 'add_to_favorites':
      return {...state,favorites:state.favorites.length>0?[...state.favorites,action.payload]:[action.payload]}
    case 'remove_from_favorites':
        return {...state,favorites:state.favorites.filter(val=>val!=action.payload)}
    case 'remove_from_booked':
      return {...state,booked:state.booked.filter(val=>val!=action.payload)}
    case 'add_to_booked':
        return {...state,booked:state.booked.length>0?[...state.booked,action.payload]:[action.payload]}
    default:
      return state;
    }
};

const makePublisher=(dispatch) => {
  return async (subscription) => {
    await dispatch({
      type: 'make_publisher',
      payload: {...subscription},
    });
  };
};

const login = (dispatch) => {
  return async (credentials) => {
    await dispatch({
      type: 'login',
      payload: {...credentials},
    });
  };
};

const addToBooked = (dispatch) => {
  return async (id) => {
    await dispatch({
      type: 'add_to_booked',
      payload: id,
    });
  };
};

const removeFromBooked = (dispatch) => {
  return async (id) => {
    console.log(id);
    await dispatch({
      type: 'remove_from_booked',
      payload: id,
    });
  };
};


const logout = (dispatch) => {
  return async () => {
    await dispatch({
      type: 'logout',
      payload: {},
    });
  };
};

const setUser= (dispatch) =>{
  return async (info) =>{
    await dispatch({
      type: 'set_user',
      payload: info,
    });
  }
}
const addToFavorites = (dispatch) => {
  return async (id) => {
    await dispatch({
      type: 'add_to_favorites',
      payload: id,
    });
  };
};

const removeFromFavorites = (dispatch) => {
  return async (id) => {
    await dispatch({
      type: 'remove_from_favorites',
      payload: id,
    });
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
   login,
   logout,
   makePublisher,
   addToFavorites,
   removeFromBooked,
   addToBooked,
   setUser,
   removeFromFavorites
  },
  initialState
);
