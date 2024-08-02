import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FETCH_UPCOMING_MOVIES_REQUEST} from '../Redux/Actions/types';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader'; // Import the header component

const {width} = Dimensions.get('window');
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const WatchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const movies = useSelector((state: any) => state.movie.movies);
  const error = useSelector((state: any) => state.movie.error);
  const loading = useSelector((state: any) => state.movie.loading);

  // State to manage filtered movies
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    dispatch({type: FETCH_UPCOMING_MOVIES_REQUEST});
  }, [dispatch]);

  // Update filtered movies whenever the original movies change
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  // Function to handle search and filter movies
  const handleSearchSubmit = (query: string) => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Watch" onSearchSubmit={handleSearchSubmit} />
      <FlatList
        data={filteredMovies} // Use the filtered movies here
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const imageUri = item.poster_path
            ? `${BASE_IMAGE_URL}${item.poster_path}`
            : 'https://via.placeholder.com/300';

          return (
            <TouchableOpacity
              style={styles.movieContainer}
              onPress={() =>
                navigation.navigate('MovieDetailScreen', {movie: item})
              }>
              <ImageBackground
                source={{uri: imageUri}}
                style={styles.movieImage}
                imageStyle={styles.imageStyle} // Apply image styles
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                  style={styles.gradient}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F4F4F8', // Set background color
  },
  listContentContainer: {
    paddingVertical: 16,
  },
  movieContainer: {
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 15, // Use rounded corners
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  movieImage: {
    width: width - 32,
    height: 250,
    justifyContent: 'flex-end',
    borderRadius: 15,
  },
  imageStyle: {
    borderRadius: 15, // Ensure images also have rounded corners
  },
  gradient: {
    width: '100%',
    padding: 16,
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F8',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WatchScreen;
