export type RootStore = {
  weather: WeatherStore;
};

export type WeatherStore = {
  isLoading: boolean;
  location: any;
  currentWeather: WeatherData;
  cities: City[];
  selectedCity: City;
  isConnectionModalOpen: boolean;
};

interface City {
  coords: { latitude: string; longitude: string };
  city: string;
  properties?: {
    lon: string;
    lat: string;
    city: string;
    address_line1: string;
  };
}

interface CitySearchProps {
  cities: City[]; // масив об'єктів міст
  onTextChange: (text: string) => void; // функція для обробки зміни тексту
  value: string; // значення текстового поля
  onCitySelect: (city: City) => void; // функція для обробки вибору міста
}

interface WeatherData {
  main: {
    humidity: number; // вологість
    pressure: number; // тиск
    temp: number; // температура в Кельвінах
    feels_like: number; // відчувається як
  };
  wind: {
    speed: number; // швидкість вітру
  };
  visibility: number; // видимість
  sys: {
    sunrise: number; // час сходу сонця (Unix timestamp)
    sunset: number; // час заходу сонця (Unix timestamp)
  };
  timezone: number; // часова зона
  name: string; // назва міста
  weather: {
    main: string; // основний опис погоди
    description: string; // детальний опис погоди
    icon: string; // іконка погоди
  }[]; // масив об'єктів опису погоди
}

interface WeatherDetailsProps {
  weatherData: WeatherData; // дані погоди
}

interface MainWeatherProps {
  city?: string; // необов'язковий параметр
  weatherData: WeatherData; // дані погоди
}

interface WidgetProps {
  icon: React.ReactNode; // Компонент іконки
  title: string; // Заголовок віджету
  value: string; // Значення, яке буде відображатися
}
