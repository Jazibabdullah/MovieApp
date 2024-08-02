import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovieSearch} from '../Redux/Actions/MovieActions';
import {fetchPopularMoviesApi} from '../res/api';
import CustomHeader from '../Components/CustomHeader';
import PopularMovieCard from '../Components/PopularMovieCard';
import SearchMovieCard from '../Components/SearchMovieCard';

const {width} = Dimensions.get('window');

const MovieSearchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const searchResults = useSelector((state: any) => state.movie.searchResults);
  const loading = useSelector((state: any) => state.movie.loading);
  const error = useSelector((state: any) => state.movie.error);

  const [query, setQuery] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await fetchPopularMoviesApi();
      setPopularMovies(response.results || []);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() !== '') {
      dispatch(fetchMovieSearch(searchQuery));
    } else {
      fetchPopularMovies();
    }
  };

  const handleMoviePress = (movie: any) => {
    navigation.navigate('MovieDetailScreen', {movie});
  };

  const moviesToDisplay = query.trim() === '' ? popularMovies : searchResults;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <CustomHeader title="Search" onSearchSubmit={handleSearchSubmit} />

      <FlatList
        data={moviesToDisplay}
        keyExtractor={item => item.id.toString()}
        numColumns={query.trim() === '' ? 2 : 1} // Show two columns for popular movies
        renderItem={({item}) =>
          query.trim() === '' ? (
            <PopularMovieCard movie={item} onPress={handleMoviePress} />
          ) : (
            <SearchMovieCard movie={item} onPress={handleMoviePress} />
          )
        }
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },
  listContentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F8',
  },
  errorContainer: {
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

export default MovieSearchScreen;
