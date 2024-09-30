function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}
const getTimeFromUnixTimestamp = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export { kelvinToCelsius, getTimeFromUnixTimestamp };
