import { current } from "@reduxjs/toolkit";
import {
  SET_LOCATION,
  SET_CURRENT_WEATHER,
  SET_HOURLY_WEATHER,
} from "./actions";

const initialState = {
  isLoading: false,
  location: {},
  currentWeather: {},
  hourlyWeather: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
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
    default:
      return state;
  }
};

export default weatherReducer;
