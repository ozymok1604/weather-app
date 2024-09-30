import { current } from '@reduxjs/toolkit';
import {
  SET_LOCATION,
  SET_CURRENT_WEATHER,
  SET_HOURLY_WEATHER,
  SET_CITIES,
  SET_SELECTED_CITY,
  SET_IS_CONNECTED,
  SET_ERROR,
  SET_IS_CONNECTION_MODAL_OPEN,
} from './actions';

const initialState = {
  isLoading: false,
  error: false,
  location: {},
  currentWeather: {},
  hourlyWeather: [],
  cities: [],
  selectedCity: {},
  isConnected: false,
  isConnectionModalOpen: false,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SET_IS_CONNECTION_MODAL_OPEN:
      return {
        ...state,
        isConnectionModalOpen: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload,
      };
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
      };
    case SET_HOURLY_WEATHER:
      return {
        ...state,
        hourlyWeather: action.payload,
      };
    case SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload,
      };

    default:
      return state;
  }
};

export default weatherReducer;
