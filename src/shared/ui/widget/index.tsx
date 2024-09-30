import { StyleSheet, Text, View } from 'react-native';
import { WidgetProps } from '@types';

const Widget: React.FC<WidgetProps> = ({ icon, title, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: '48%',
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    marginTop: 20,
    color: 'white',
    fontSize: 24,
  },
  title: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    paddingLeft: 5,
  },
});
export { Widget };
