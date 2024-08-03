import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const TicketSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('5 Mar');
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const dates = ['5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar'];

  const showtimes = [
    {
      time: '12:30',
      price: '50$',
      bonus: '2500',
      layout: generateSeatLayout(),
    },
    {
      time: '13:30',
      price: '75$',
      bonus: '3000',
      layout: generateSeatLayout(),
    },
  ];

  function generateSeatLayout() {
    return [
      ['available', 'available', 'taken', 'available', 'available'],
      ['available', 'taken', 'available', 'taken', 'available'],
      ['available', 'available', 'available', 'available', 'available'],
      ['taken', 'available', 'taken', 'available', 'available'],
      ['available', 'available', 'available', 'available', 'available'],
      ['available', 'available', 'available', 'available', 'available'],
      ['available', 'available', 'available', 'available', 'available'],
      ['available', 'taken', 'available', 'available', 'available'],
      ['available', 'available', 'available', 'taken', 'available'],
      ['available', 'available', 'available', 'available', 'available'],
    ];
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleShowtimeSelect = showtime => {
    setSelectedShowtime(showtime);
  };

  const handleSelectSeats = () => {
    if (selectedShowtime) {
      // Navigate to the seat selection screen with showtime and date details
      navigation.navigate('SeatSelection', {
        showtime: selectedShowtime,
        date: selectedDate,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.movieTitle}>The King’s Man</Text>
          <Text style={styles.subtitle}>In Theaters December 22, 2021</Text>
        </View>
      </SafeAreaView>
      <View style={styles.dateContainer}>
        <Text style={styles.sectionTitle}>Date</Text>
        <View style={styles.dateTabs}>
          {dates.map(date => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateTab,
                selectedDate === date && styles.selectedDateTab,
              ]}
              onPress={() => handleDateChange(date)}>
              <Text
                style={[
                  styles.dateTabText,
                  selectedDate === date && styles.selectedDateTabText,
                ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.showtimeScrollView}>
        <View style={styles.showtimeContainer}>
          {showtimes.map((showtime, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.showtimeCard,
                selectedShowtime === showtime && styles.selectedShowtimeCard,
              ]}
              onPress={() => handleShowtimeSelect(showtime)}>
              <Text style={styles.showtimeText}>{showtime.time}</Text>
              <Text style={styles.hallText}>Cinetech + Hall 1</Text>
              <View style={styles.seatLayout}>
                {showtime.layout.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.seatRow}>
                    {row.map((seat, seatIndex) => (
                      <View
                        key={seatIndex}
                        style={[
                          styles.seat,
                          seat === 'taken'
                            ? styles.takenSeat
                            : styles.availableSeat,
                        ]}
                      />
                    ))}
                  </View>
                ))}
              </View>
              <Text style={styles.priceText}>
                From <Text style={styles.boldText}>{showtime.price}</Text> or{' '}
                <Text style={styles.boldText}>{showtime.bonus} bonus</Text>
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.selectSeatsButton,
          !selectedShowtime && styles.disabledButton,
        ]}
        onPress={handleSelectSeats}
        disabled={!selectedShowtime}>
        <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 20,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  dateContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  dateTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  selectedDateTab: {
    backgroundColor: '#87CEEB',
  },
  dateTabText: {
    fontSize: 14,
    color: '#000',
  },
  selectedDateTabText: {
    color: '#fff',
  },
  showtimeScrollView: {
    marginVertical: 10,
  },
  showtimeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  showtimeCard: {
    width: width * 0.8, // Larger cards
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedShowtimeCard: {
    borderColor: '#87CEEB',
    borderWidth: 2,
  },
  showtimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  hallText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  seatLayout: {
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 10,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
  },
  seat: {
    width: 12,
    height: 12,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  availableSeat: {
    backgroundColor: '#87CEEB',
  },
  takenSeat: {
    backgroundColor: '#BDBDBD',
  },
  priceText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  selectSeatsButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  selectSeatsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketSelectionScreen;
