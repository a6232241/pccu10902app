import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import routeConfig from './src/screens/routeConfig';

const Stack = createStackNavigator();
const defaultOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' backgroundColor='white' />
      <Stack.Navigator screenOptions={defaultOptions}>
        {routeConfig.map((route, index) => {
          return <Stack.Screen {...route} key={index} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
