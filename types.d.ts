export type RootStore = {
  weather: WeatherStore;
};

export type WeatherStore = {
  isLoading: boolean;
  location: any;
  currentWeather: any;
  hourlyWeather: any;
};
