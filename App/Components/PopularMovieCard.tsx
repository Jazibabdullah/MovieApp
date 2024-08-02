import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface PopularMovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
  onPress: (movie: any) => void;
}

const PopularMovieCard: React.FC<PopularMovieCardProps> = ({
  movie,
  onPress,
}) => {
  const imageUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300';

  return (
    <TouchableOpacity
      style={styles.popularCardContainer}
      onPress={() => onPress(movie)}>
      <Image source={{uri: imageUri}} style={styles.popularMovieImage} />
      <View style={styles.overlay}>
        <Text style={styles.popularMovieTitle}>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  popularCardContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: 'hidden',
  },
  popularMovieImage: {
    width: '100%',
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularMovieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default PopularMovieCard;
