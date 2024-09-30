import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { getAuth, signOut } from '@firebase/auth';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useSelector } from 'react-redux';
import {
  getCities,
  getCurrentWeather,
  setLocation,
  setCities,
  setIsConnectionModalOpen,
} from '@actions';
import { useAppDispatch } from '@hooks';
import { RootStore } from '@types';

import NetInfo from '@react-native-community/netinfo';
import {
  CitySearch,
  NotConnectedModal,
  WheatherDetails,
  MainWeather,
} from '@ui';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = getAuth() as any;
  const [searchValue, setSearchValue] = useState('');
  const rootNavigationState = useRootNavigationState();
  const cities = useSelector((store: RootStore) => store.weather.cities);
  const currentWeather = useSelector(
    (store: RootStore) => store.weather.currentWeather
  );
  const location = useSelector((store: RootStore) => store.weather.location);
  const isConnectionModalOpen = useSelector(
    (store: RootStore) => store.weather.isConnectionModalOpen
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rootNavigationState?.key && auth?.apiKey && !auth?.currentUser) {
        router.replace('/auth');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [auth, rootNavigationState]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        dispatch(setIsConnectionModalOpen(true));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const onConnectionModalClose = () => {
    dispatch(setIsConnectionModalOpen(false));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await SecureStore.deleteItemAsync('email');
      await SecureStore.deleteItemAsync('password');
      console.log('User logged out and credentials cleared from SecureStore');
      router.replace('/auth');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      dispatch(setLocation(location));
    })();
  }, [dispatch]);

  useEffect(() => {
    if (location?.coords) {
      dispatch(
        getCurrentWeather(location.coords.latitude, location.coords.longitude)
      );
    }
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(getCities(searchValue));
  }, [searchValue, dispatch]);

  const onCitySelect = location => {
    dispatch(setLocation(location));

    setTimeout(() => {
      dispatch(setCities([]));
    }, 1000);
  };

  const weatherMain = currentWeather?.weather?.[0]?.main || 'Clear';

  const background = (() => {
    switch (weatherMain) {
      case 'Clear':
        return require('@assets/clear.jpg');
      case 'Clouds':
        return require('@assets/clouds.jpg');
      case 'Rain':
        return require('@assets/rain.jpg');
      default:
        return require('@assets/rain.jpg');
    }
  })();
  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <NotConnectedModal
            visible={isConnectionModalOpen}
            onClose={onConnectionModalClose}
          />
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logoutTxt}>Logout</Text>
              </TouchableOpacity>
            </View>
            <CitySearch
              onCitySelect={onCitySelect}
              onTextChange={setSearchValue}
              cities={cities}
              value={searchValue}
            />
            {currentWeather?.weather ? (
              <>
                <MainWeather
                  city={location.city}
                  weatherData={currentWeather}
                />
                <WheatherDetails weatherData={currentWeather} />
              </>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutTxt: {
    color: 'red',
    fontSize: 18,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default HomeScreen;
