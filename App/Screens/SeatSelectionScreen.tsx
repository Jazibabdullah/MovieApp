import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const SeatSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {showtime, date} = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [unavailableSeats, setUnavailableSeats] = useState([]);

  // Define seat layout and types
  const seats = generateSeatLayout();
  const vipSeats = seats[9]; // Row 10 is VIP

  const ticketPrice = 50; // Regular seat price
  const vipPrice = 150; // VIP seat price

  // Function to generate seat layout
  function generateSeatLayout() {
    return [
      ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
      ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
      ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
      ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'],
      ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
      ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'],
      ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'],
      ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'],
      ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10'],
      ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10'], // VIP row
    ];
  }

  // Set some seats as unavailable
  useEffect(() => {
    // Randomly select some seats to be unavailable
    const allSeats = seats.flat();
    const numUnavailable = Math.floor(allSeats.length * 0.2); // 20% unavailable
    const shuffledSeats = [...allSeats].sort(() => Math.random() - 0.5);
    setUnavailableSeats(shuffledSeats.slice(0, numUnavailable));
  }, []);

  // Handle seat selection
  const handleSeatSelect = seat => {
    if (unavailableSeats.includes(seat)) return; // Can't select unavailable seats

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Calculate total price based on selected seats
  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + (vipSeats.includes(seat) ? vipPrice : ticketPrice);
    }, 0);
  };

  // Handle proceed to payment
  const handleProceedToPay = () => {
    // Implement payment logic or navigation
    console.log('Proceed to payment');
  };

  // Handle zoom in and out
  const handleZoom = type => {
    if (type === 'in' && zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1);
    } else if (type === 'out' && zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  // Remove a selected seat
  const handleRemoveSeat = seat => {
    setSelectedSeats(selectedSeats.filter(s => s !== seat));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.movieTitle}>The King’s Man</Text>
        <Text style={styles.subtitle}>
          {date} | {showtime.time} Hall 1
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.seatSelectionContainer}>
        <Text style={styles.screenText}>SCREEN</Text>

        <View
          style={[styles.seatMapContainer, {transform: [{scale: zoomLevel}]}]}>
          {seats.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.seatRow}>
              <Text style={styles.rowLabel}>{rowIndex + 1}</Text>
              {row.map(seat => (
                <TouchableOpacity
                  key={seat}
                  style={[
                    styles.seat,
                    unavailableSeats.includes(seat) && styles.notAvailableSeat,
                    selectedSeats.includes(seat) && styles.selectedSeat,
                    vipSeats.includes(seat)
                      ? styles.vipSeat
                      : styles.regularSeat,
                  ]}
                  onPress={() => handleSeatSelect(seat)}
                  disabled={unavailableSeats.includes(seat)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => handleZoom('in')}>
            <Icon name="add" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => handleZoom('out')}>
            <Icon name="remove" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.selectedSeatsContainer}>
          {selectedSeats.length > 0 && (
            <View style={styles.selectedSeatDisplay}>
              {selectedSeats.map(seat => (
                <View key={seat} style={styles.selectedSeatItem}>
                  <Text style={styles.selectedSeatText}>{seat}</Text>
                  <TouchableOpacity onPress={() => handleRemoveSeat(seat)}>
                    <Icon name="close-circle" size={16} color="#999" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.selectedSeat]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.vipSeat]} />
            <Text style={styles.legendText}>VIP (${vipPrice})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.regularSeat]} />
            <Text style={styles.legendText}>Regular (${ticketPrice})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.notAvailableSeat]} />
            <Text style={styles.legendText}>Not available</Text>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>${calculateTotalPrice()}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.proceedButton,
            selectedSeats.length === 0 && styles.disabledButton,
          ]}
          onPress={handleProceedToPay}
          disabled={selectedSeats.length === 0}>
          <Text style={styles.proceedButtonText}>Proceed to pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
    color: '#87CEEB',
    marginTop: 4,
  },
  seatSelectionContainer: {
    padding: 16,
    alignItems: 'center',
  },
  screenText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    paddingBottom: 10,
    width: '100%',
  },
  seatMapContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  seatRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  rowLabel: {
    marginRight: 10,
    fontSize: 12,
    color: '#999',
    width: 20,
    textAlign: 'right',
  },
  seat: {
    width: 20,
    height: 20,
    marginHorizontal: 3,
    marginVertical: 2,
    borderRadius: 3,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSeat: {
    backgroundColor: '#FFD700', // Gold for selected seats
  },
  vipSeat: {
    backgroundColor: '#1E90FF', // Blue for VIP seats
  },
  regularSeat: {
    backgroundColor: '#87CEEB', // Light blue for regular seats
  },
  notAvailableSeat: {
    backgroundColor: '#BDBDBD', // Gray for unavailable seats
  },
  zoomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  zoomButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSeatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'center',
    width: '90%',
  },
  selectedSeatDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedSeatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedSeatText: {
    marginRight: 5,
    fontSize: 14,
    color: '#555',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  totalPriceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  totalPriceText: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  priceBox: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  proceedButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SeatSelectionScreen;
