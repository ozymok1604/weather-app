import { Image, StyleSheet, Text, View } from "react-native";
import { kelvinToCelsius } from "../../../utils";

const MainWeather = ({ weatherData }) => {
  console.log(weatherData.main.feels_like);
  return (
    <View style={styles.container}>
      <Text style={styles.city}>
        <Image
          source={require("../../assets/location.png")}
          style={styles.locationImg}
        />
        <Text>{weatherData.name}</Text>
      </Text>
      <Text style={styles.temp}>
        {kelvinToCelsius(weatherData.main.temp) + "°C"}
      </Text>
      <Text style={styles.description}>{weatherData.weather[0].main}</Text>
      <Text style={styles.feelsLike}>
        Feels like {kelvinToCelsius(weatherData.main.feels_like) + "°C"}
      </Text>
    </View>
  );
};

export { MainWeather };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    flexDirection: "column",
    alignItems: "center",
  },
  city: {
    fontSize: 24,
    color: "white",

    flexDirection: "row",
    justifyContent: "space-between",
  },
  temp: {
    fontSize: 50,
    textAlign: "center",
    color: "white",
  },
  description: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  feelsLike: {
    marginTop: 20,
    fontSize: 30,

    color: "white",
  },
  locationImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
