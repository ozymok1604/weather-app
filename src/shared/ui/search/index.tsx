import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { CitySearchProps } from '@types';

const CitySearch: React.FC<CitySearchProps> = ({
  cities,
  onTextChange,
  value,
  onCitySelect,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="white"
        style={styles.input}
        placeholder="Search city"
        value={value}
        onChangeText={onTextChange}
      />

      {cities?.length > 0 && (
        <FlatList
          style={styles.list}
          data={cities}
          keyExtractor={item =>
            item.properties.lon.toString() + item.properties.lat.toString()
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cityItem}
              onPress={() =>
                onCitySelect({
                  city: item.properties?.city,
                  coords: {
                    latitude: item.properties.lat,
                    longitude: item.properties.lon,
                  },
                })
              }
            >
              <Text style={styles.cityName}>
                {`${item.properties?.city}, ${item.properties?.address_line1}`}
              </Text>
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
    width: '90%',
    position: 'relative', // Додаємо цю властивість
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cityName: {
    padding: 10,
    fontSize: 16,
    color: 'white',
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cityItem: {
    width: '100%',
  },
  list: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    borderRadius: 10,
    elevation: 5,
    shadowRadius: 4,
    zIndex: 20,
  },
});

export { CitySearch };
