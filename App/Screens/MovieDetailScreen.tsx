import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  fetchMovieTrailer,
  fetchMovieDetails,
  fetchMovieImages,
} from '../Redux/Actions/MovieActions';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {movie} = route.params;
  const movieId = movie.id;

  // Selectors for Redux state
  const {movieDetails, movieImages, loading, error} = useSelector(
    state => state.movie,
  );

  // Memoize image URI calculation
  const imageUri = useMemo(() => {
    return movieImages.length > 0
      ? `${BASE_IMAGE_URL}${movieImages[0].file_path}` // Use the first backdrop image
      : 'https://via.placeholder.com/300';
  }, [movieImages]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieImages(movieId));
  }, [dispatch, movieId]);

  const handleWatchTrailer = () => {
    dispatch(fetchMovieTrailer(movieId));
    navigation.navigate('VideoPlayer');
  };
  const handleTicketSection = () => {
    dispatch(fetchMovieTrailer(movieId));
    navigation.navigate('TicketSelection');
  };
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={{uri: imageUri}} style={styles.movieImage}>
        <TopBar navigation={navigation} />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.gradient}>
          <MovieInfo
            movieDetails={movieDetails}
            onWatchTrailer={handleWatchTrailer}
            onTicketSection={handleTicketSection}
          />
        </LinearGradient>
      </ImageBackground>
      <MovieDetails movieDetails={movieDetails} />
    </ScrollView>
  );
};

// Functional Component: Loading Indicator
const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#00AEEF" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

// Functional Component: Error Display
const ErrorDisplay = ({error}) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);

// Functional Component: Top Bar
const TopBar = ({navigation}) => (
  <View style={styles.topBar}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}>
      <Icon name="arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Watch</Text>
  </View>
);

// Functional Component: Movie Info
const MovieInfo = ({movieDetails, onWatchTrailer, onTicketSection}) => (
  <View style={styles.imageOverlay}>
    <Text style={styles.title}>{movieDetails.title}</Text>
    <Text style={styles.releaseDate}>
      In Theaters {movieDetails.release_date}
    </Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onTicketSection}>
        <Text style={styles.buttonText}>Get Tickets</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOutline} onPress={onWatchTrailer}>
        <Text style={styles.buttonOutlineText}>
          <Icon name="play-circle-outline" size={16} color="#fff" /> Watch
          Trailer
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Functional Component: Movie Details
const MovieDetails = ({movieDetails}) => (
  <View style={styles.detailContainer}>
    <Genres genres={movieDetails.genres} />
    <View style={styles.separator} />
    <Overview overview={movieDetails.overview} />
  </View>
);

// Functional Component: Genres
const Genres = ({genres}) => (
  <View style={styles.genresContainer}>
    <Text style={styles.sectionTitle}>Genres</Text>
    <View style={styles.genres}>
      {genres &&
        genres.map(genre => (
          <View
            key={genre.id}
            style={[styles.genre, {backgroundColor: getGenreColor(genre.id)}]}>
            <Text style={styles.genreText}>{genre.name}</Text>
          </View>
        ))}
    </View>
  </View>
);

// Functional Component: Overview
const Overview = ({overview}) => (
  <View style={styles.overviewContainer}>
    <Text style={styles.sectionTitle}>Overview</Text>
    <Text style={styles.overviewText}>{overview}</Text>
  </View>
);

// Helper functions for genre colors
const getGenreColor = genreId => {
  switch (genreId) {
    case 28:
      return '#FF6F61'; // Action
    case 12:
      return '#FFA726'; // Adventure
    case 16:
      return '#BA68C8'; // Animation
    case 35:
      return '#4DB6AC'; // Comedy
    case 80:
      return '#F06292'; // Crime
    case 99:
      return '#AED581'; // Documentary
    case 18:
      return '#9575CD'; // Drama
    case 10751:
      return '#FFD54F'; // Family
    case 14:
      return '#4FC3F7'; // Fantasy
    case 36:
      return '#A1887F'; // History
    case 27:
      return '#E57373'; // Horror
    case 10402:
      return '#F06292'; // Music
    case 9648:
      return '#7986CB'; // Mystery
    case 10749:
      return '#FF8A65'; // Romance
    case 878:
      return '#90CAF9'; // Science Fiction
    case 10770:
      return '#CE93D8'; // TV Movie
    case 53:
      return '#FFB74D'; // Thriller
    case 10752:
      return '#A1887F'; // War
    case 37:
      return '#8D6E63'; // Western
    default:
      return '#BDBDBD'; // Default
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
  },
  movieImage: {
    width: width,
    height: 500,
    justifyContent: 'flex-end',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    padding: 20,
    marginHorizontal: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00AEEF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonOutline: {
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailContainer: {
    width: '100%',
    padding: 20,
  },
  genresContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
  },
  separator: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  overviewContainer: {
    marginBottom: 20,
  },
  overviewText: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});

export default MovieDetailScreen;
