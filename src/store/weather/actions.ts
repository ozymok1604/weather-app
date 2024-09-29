import apiService from "../../services/api.service";

export const SET_LOCATION = "SET_LOCATION";

export const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";

export const SET_HOURLY_WEATHER = "SET_HOURLY_WEATHER";

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});

export const setCurrentWeather = (weather) => ({
  type: SET_CURRENT_WEATHER,
  payload: weather,
});

export const setHourlyWeather = (weather) => ({
  type: SET_HOURLY_WEATHER,
  payload: weather,
});

export const getCurrentWeather =
  (lat: string, lon: string) => async (dispatch) => {
    try {
      const response = await apiService.get(`/weather?lat=${lat}&lon=${lon}`);
      console.log(response.data, "hour");
      dispatch(setCurrentWeather(response.data));
    } catch (error) {}
  };

// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

export const searchCity = (cityName: string) => async (dispatch) => {
  console.log(cityName, "cityName");
  const response = await apiService.get(`/find?q=${cityName}&limit=5`);

  console.log(response.data, "datadatadatadata");
};
