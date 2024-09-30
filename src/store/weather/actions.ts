import apiService from '../../services/api.service';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_LOCATION = 'SET_LOCATION';

export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';

export const SET_HOURLY_WEATHER = 'SET_HOURLY_WEATHER';

export const SET_CITIES = 'SET_CITIES';

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';

export const SET_ERROR = 'SET_ERROR';

export const SET_IS_CONNECTION_MODAL_OPEN = 'SET_IS_CONNECTION_MODAL_OPEN';

export const setLocation = location => ({
  type: SET_LOCATION,
  payload: location,
});

export const setIsConnectionModalOpen = state => ({
  type: SET_IS_CONNECTION_MODAL_OPEN,
  payload: state,
});

export const setError = error => ({
  type: SET_LOCATION,
  payload: error,
});

export const setIsConnected = isConnected => ({
  type: SET_IS_CONNECTED,
  payload: isConnected,
});

export const setCities = location => ({
  type: SET_CITIES,
  payload: location,
});

export const setCurrentWeather = weather => ({
  type: SET_CURRENT_WEATHER,
  payload: weather,
});

export const setHourlyWeather = weather => ({
  type: SET_HOURLY_WEATHER,
  payload: weather,
});

export const getCurrentWeather =
  (lat: string, lon: string) => async dispatch => {
    try {
      // Спроба отримати дані з API
      const response = await apiService.get(`/weather?lat=${lat}&lon=${lon}`);
      console.log(response.data, 'hour');

      // Зберігаємо дані в async storage
      await AsyncStorage.setItem(
        'currentWeather',
        JSON.stringify(response.data)
      );

      // Диспетчимо action для оновлення стану з даними API
      dispatch(setCurrentWeather(response.data));
    } catch (error) {
      console.error('Error fetching weather data from API:', error);

      // Якщо є помилка, спробуємо витягнути дані з async storage
      try {
        const jsonValue = await AsyncStorage.getItem('currentWeather');
        if (jsonValue != null) {
          const storedData = JSON.parse(jsonValue);
          console.log('Fetched weather data from AsyncStorage:', storedData);

          // Диспетчимо збережені дані з AsyncStorage
          dispatch(setCurrentWeather(storedData));
        } else {
          console.error('No weather data found in AsyncStorage');
        }
      } catch (storageError) {
        console.error(
          'Error retrieving weather data from AsyncStorage:',
          storageError
        );
      }
    }
  };

export const getCities = (search: string) => async dispatch => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=2942bfc441e94879be0140bf9160d64b`
    );

    const data = await response.json();

    dispatch(setCities(data?.features));
  } catch (e) {
    console.log(e);
  }
};
