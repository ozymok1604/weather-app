import {
  Button,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MainWeather } from "../../shared/ui/main-weather";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "@firebase/auth";
import { useRouter } from "expo-router";
import {
  getCurrentWeather,
  searchCity,
  setLocation,
} from "../../store/weather/actions";
import { RootStore } from "../../../types";
import * as Location from "expo-location";
import { useAppDispatch } from "../../store/hooks";

import { WheatherDetails } from "../../shared/ui/wheather-details";
import CitySearch from "../../shared/ui/search";
import * as SecureStore from "expo-secure-store";
import { fontSize, spaces } from "../../styles";
import * as colors from "../../styles/colors";

const HomeScreen = ({ user, handleAuthentication }) => {
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const auth = getAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);

      // Delete stored credentials from SecureStore
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("password");

      console.log("User logged out and credentials cleared from SecureStore");

      // Navigate back to the authentication screen after logout
      router.replace("/auth");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const currentLocation = useSelector(
    (store: RootStore) => store.weather.location
  );

  const currentWeather = useSelector(
    (store: RootStore) => store.weather.currentWeather
  );

  const hourlyWeather = useSelector(
    (store: RootStore) => store.weather.hourlyWeather
  );
  console.log(hourlyWeather, "gggg");

  useEffect(() => {
    // dispatch(searchCity(searchValue));
    console.log(searchValue, "retert");
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      dispatch(setLocation(location));
    })();
  }, []);

  useEffect(() => {
    if (currentLocation?.coords) {
      dispatch(
        getCurrentWeather(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        )
      );
    }
  }, [currentLocation]);
  return (
    <ImageBackground
      source={require("../../shared/assets/blue.jpg")}
      style={styles.background}
      resizeMode="cover" // Покриває весь екран
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <TouchableOpacity>
                <Text style={styles.logoutTxt}>Logout</Text>
              </TouchableOpacity>
            </View>
            <CitySearch />

            {currentWeather?.weather && (
              <>
                <MainWeather weatherData={currentWeather} />
                <WheatherDetails weatherData={currentWeather} />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  background: {
    flex: 1,
    width: "100%", // Ширина 100% екрану
    height: "100%", // Висота 100% екрану
  },
  contentContainer: {
    paddingVertical: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: spaces.l,
    alignItems: "center",
  },
  logoutTxt: {
    color: colors.red,
    fontSize: fontSize.l,
  },
});
