function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}
const getTimeFromUnixTimestamp = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000); // Додаємо зсув часової зони та конвертуємо в мілісекунди

  const hours = date.getUTCHours().toString().padStart(2, "0"); // Отримуємо години з часу UTC
  const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Отримуємо хвилини з часу UTC

  return `${hours}:${minutes}`; // Повертаємо відформатовані години і хвилини
};

export { kelvinToCelsius, getTimeFromUnixTimestamp };
