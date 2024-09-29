import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const CitySearch = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);

  const apiKey = "ce767c132de6a62ff022bc27e0f2544e"; // Введіть свій API-ключ OpenWeatherMap

  const searchCities = async (text) => {
    setQuery(text);
    if (text?.length > 2) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${apiKey}`
        );
        // setCities(response.data
        console.log(response?.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setCities([]);
    }
  };

  const selectCity = (city) => {
    // Вибір міста і отримання його координат
    console.log(
      `Selected city: ${city.name}, Lon: ${city.lon}, Lat: ${city.lat}`
    );
    setQuery(city.name);
    setCities([]); // Очищаємо список після вибору
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="white"
        style={styles.input}
        placeholder="Search city"
        value={query}
        onChangeText={(text) => searchCities(text)}
      />
      {cities.length > 0 && (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.lon.toString() + item.lat.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectCity(item)}>
              <Text
                style={styles.cityItem}
              >{`${item.name}, ${item.country}`}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "90%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cityItem: {
    padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default CitySearch;
