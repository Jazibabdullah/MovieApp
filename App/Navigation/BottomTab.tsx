// App/Navigation/BottomTab.tsx

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {WatchScreen, MovieSearchScreen} from '../Screens';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Watch"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Watch') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'MovieSearch') {
            iconName = focused ? 'search' : 'search-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#2B233D',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Watch" component={WatchScreen} />
      <Tab.Screen name="MovieSearch" component={MovieSearchScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
