import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {clearTrailer} from '../Redux/Actions/MovieActions'; // Import the clearTrailer action

const VideoPlayer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const trailerUrl = useSelector(state => state.movie.trailerUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Trailer URL:', trailerUrl); // Debugging the URL
    if (trailerUrl) {
      setIsLoading(false);
    } else {
      const timeoutId = setTimeout(() => {
        if (!trailerUrl) {
          navigation.goBack();
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [trailerUrl]);

  useFocusEffect(
    React.useCallback(() => {
      // Clear trailerUrl when the screen loses focus
      return () => {
        dispatch(clearTrailer());
      };
    }, [dispatch]),
  );

  const handleEnd = () => {
    navigation.goBack();
  };

  const extractYouTubeVideoId = url => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|watch\?list=|=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    console.log('Extracted Video ID:', match ? match[2] : 'No match'); // Debugging the extracted video ID
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = extractYouTubeVideoId(trailerUrl);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : videoId ? (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={300}
            width={400}
            play={true}
            videoId={videoId}
            onChangeState={event => {
              if (event === 'ended') {
                handleEnd();
              }
            }}
            onError={error => console.log('YouTube Player Error:', error)} // Adding error logging
          />
        </View>
      ) : (
        <Text style={styles.errorText}>No trailer available.</Text>
      )}
      <TouchableOpacity style={styles.doneButton} onPress={handleEnd}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#007BFF', // Professional blue
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600', // Medium weight for readability
    textAlign: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});

export default VideoPlayer;
