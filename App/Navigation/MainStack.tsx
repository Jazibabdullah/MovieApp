// App/Navigation/SharedMovieStack.tsx

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetailScreen from '../Screens/MovieDetailScreen';
import VideoPlayer from '../Components/VideoPlayer';
import TicketSelectionScreen from '../Screens/TicketSelectionScreen';
import SeatSelectionScreen from '../Screens/SeatSelectionScreen';
import BottomTab from './BottomTab';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TicketSelection"
        component={TicketSelectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeatSelection"
        component={SeatSelectionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
