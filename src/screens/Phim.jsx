import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';

const Phim = () => {
  const [selectedDate, setSelectedDate] = useState('Hôm nay');
  const [selectedTime, setSelectedTime] = useState('12:00');
  const cinemas = [
    { name: 'TD Center', address: '10 Lê Lợi, Quận 1, TP.Hồ Chí Minh', distance: '2.1 km', times: ['08:00', '10:00', '12:00', '14:00', '16:00', '20:00', '21:00', '22:00'] },
    { name: 'TD Điện Biên Phủ', address: '651A Điện Biên Phủ, Quận 3, TP.Hồ Chí Minh', distance: '5.6 km', times: ['08:00', '10:00', '12:00', '14:00'] },
    { name: 'TD Thống Nhất', address: '414 Thống nhất, Quận Gò Vấp, TP.Hồ Chí Minh', distance: '7.1 km', times: ['10:00', '12:00', '14:00', '16:00'] },
    { name: 'TD Phan Văn Trị', address: '1014 Phan Văn Trị, Quận Gò Vấp, TP.Hồ Chí Minh', distance: '9.5 km', times: ['12:00', '16:00', '20:00'] },
  ];

  const renderCinemas = () => {
    return cinemas.map((cinema, index) => (
      <View key={index} style={styles.cinemaContainer}>
        <Text style={styles.cinemaName}>{cinema.name}</Text>
        <Text style={styles.cinemaAddress}>{cinema.address}</Text>
        <Text style={styles.cinemaDistance}>{cinema.distance}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cinema.times.map((time, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.timeButton,
                time === selectedTime ? styles.selectedTimeButton : null,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  time === selectedTime ? styles.selectedTimeText : null,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" type="material" color="#fff" />
        <Text style={styles.movieTitle}>Đẹp Trai Thấy Sai Sai</Text>
        <Text style={styles.allCinemas}>Tất cả rạp</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateContainer}>
        {['Hôm nay', 'T4', 'T5', 'T6'].map((date, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.dateButton,
              date === selectedDate ? styles.selectedDateButton : null,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={styles.dateText}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.cinemasContainer}>
        {renderCinemas()}
      </ScrollView>
      <Button title="Tiếp tục" buttonStyle={styles.continueButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  allCinemas: {
    color: '#ff9500',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: '#ff3b30',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  cinemasContainer: {
    marginBottom: 20,
  },
  cinemaContainer: {
    marginBottom: 20,
  },
  cinemaName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cinemaAddress: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 5,
  },
  cinemaDistance: {
    color: '#ff9500',
    fontSize: 14,
    marginBottom: 10,
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTimeButton: {
    backgroundColor: '#ff3b30',
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#ff9500',
    borderRadius: 10,
    paddingVertical: 15,
  },
});

export default Phim;
