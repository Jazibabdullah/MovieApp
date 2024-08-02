import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

interface SearchMovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
  };
  onPress: (movie: any) => void;
}

const SearchMovieCard: React.FC<SearchMovieCardProps> = ({movie, onPress}) => {
  const imageUri = movie.poster_path
    ? `${BASE_IMAGE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/150';

  return (
    <TouchableOpacity
      style={styles.searchCardContainer}
      onPress={() => onPress(movie)}>
      <View style={styles.searchCardContent}>
        <Image source={{uri: imageUri}} style={styles.searchMovieImage} />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieGenre}>
            {movie.genre_ids && movie.genre_ids.length > 0
              ? getGenreName(movie.genre_ids[0])
              : 'Unknown Genre'}
          </Text>
        </View>
        <Icon name="ellipsis-horizontal" size={24} color="#00AEEF" />
      </View>
    </TouchableOpacity>
  );
};

const getGenreName = (genreId: number) => {
  const genreMap: {[key: number]: string} = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  return genreMap[genreId] || 'Unknown';
};

const styles = StyleSheet.create({
  searchCardContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchMovieImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343434',
  },
  movieGenre: {
    fontSize: 14,
    color: '#A4A4A4',
    marginTop: 4,
  },
});

export default SearchMovieCard;
