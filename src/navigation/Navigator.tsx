import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import RepoDetails from '../screens/RepoDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RepoDetails" component={RepoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
