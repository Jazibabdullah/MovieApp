import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomHeaderProps {
  title: string;
  onSearchSubmit: (query: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({title, onSearchSubmit}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    setSearchQuery(''); // Clear search query on close
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    onSearchSubmit(searchQuery);
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        {isSearching ? (
          <View style={styles.searchContainer}>
            <Icon
              name="search-outline"
              size={20}
              color="#4D4D4D"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="TV shows, movies and more"
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={handleSearchChange}
              onSubmitEditing={handleSearchSubmit}
              autoFocus={true}
            />
            <TouchableOpacity onPress={handleSearchToggle}>
              <Icon name="close-outline" size={20} color="#4D4D4D" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={handleSearchToggle}>
              <Icon name="search-outline" size={24} color="#4D4D4D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold', // Ensure Poppins font is loaded
    fontSize: 22,
    color: '#333333',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333333',
    paddingVertical: 0,
  },
});

export default CustomHeader;
