import { Image, StyleSheet, View } from 'react-native';
import { Widget } from '@ui';
import { getTimeFromUnixTimestamp } from '@utils';

const WheatherDetails = ({ weatherData }) => {
  return (
    <View style={styles.grid}>
      <Widget
        icon={
          <Image style={styles.icon} source={require('@assets/humidity.png')} />
        }
        title={'Humidity'}
        value={weatherData.main.humidity + '%'}
      />
      <Widget
        icon={
          <Image style={styles.icon} source={require('@assets/wind.png')} />
        }
        title={'Wind'}
        value={weatherData.wind.speed + ' m/s'}
      />
      <Widget
        icon={
          <Image style={styles.icon} source={require('@assets/pressure.png')} />
        }
        title={'Pressure'}
        value={weatherData.main.pressure + ' millibar'}
      />
      <Widget
        icon={
          <Image
            style={styles.icon}
            source={require('@assets/visibility.png')}
          />
        }
        title={'Visibility'}
        value={weatherData.visibility + ' m'}
      />
      <Widget
        icon={
          <Image style={styles.icon} source={require('@assets/sunrise.png')} />
        }
        title={'Sunrise'}
        value={getTimeFromUnixTimestamp(
          weatherData.sys.sunrise,
          weatherData.timezone
        )}
      />
      <Widget
        icon={
          <Image style={styles.icon} source={require('@assets/sunset.png')} />
        }
        title={'Sunset'}
        value={getTimeFromUnixTimestamp(
          weatherData.sys.sunset,
          weatherData.timezone
        )}
      />
    </View>
  );
};

export { WheatherDetails };

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: -1,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
