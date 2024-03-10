import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import RepositoryScreen from './screens/RepositoryScreen';

const App = () => {
  const AppNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'main'} component={MainScreen} />
        <AppNavigator.Screen name={'repo'} component={RepositoryScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
