import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import { useRoute } from '@react-navigation/native';

const BookingComponent = () => {
  const route = useRoute();
  const { charger } = route.params;
  
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking</Text>
      <Text style={styles.title}>{charger?.AddressInfo?.Title || "Tom's Charger"}</Text>
      <Text style={styles.subtitle}>{charger?.AddressInfo?.AddressLine1 || "361 Tennyson Ave"}</Text>
      <Text style={styles.distance}>{charger?.Distance?.toFixed(1) || "1.1"} km away</Text>
      <Text style={styles.minimumFee}>Minimum Fee ${charger?.UsageCost || "0.99"}</Text>

      <View style={styles.inputContainer}>
        <Text>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text>Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
          <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text>Duration</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={duration}
            onValueChange={(itemValue) => setDuration(itemValue)}
            mode="dropdown"
          >
            <Picker.Item label="1 hour" value={1} />
            <Picker.Item label="2 hours" value={2} />
            <Picker.Item label="3 hours" value={3} />
            <Picker.Item label="4 hours" value={4} />
            <Picker.Item label="5 hours" value={5} />
          </Picker>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text>Approximate kWh</Text>
        <Text style={styles.infoValue}>30 kWh</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text>Total cost</Text>
        <Text style={styles.infoValue}>$13.50</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  distance: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  minimumFee: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    justifyContent: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoValue: {
    fontWeight: 'bold',
    color: 'green',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingComponent;
