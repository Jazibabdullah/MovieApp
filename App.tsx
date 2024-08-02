import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './App/Navigation/MainStack';
import {Provider} from 'react-redux';
import store from './App/Redux/Store';
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}
