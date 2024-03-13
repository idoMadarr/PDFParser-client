import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import ConvertorScreen from './screens/ConvertorScreen';
import RepositoryScreen from './screens/RepositoryScreen';
import ViewerScreen from './screens/ViewerScreen';

const App = () => {
  const AppNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'convertor'} component={ConvertorScreen} />
        <AppNavigator.Screen name={'repo'} component={RepositoryScreen} />
        <AppNavigator.Screen name={'viewer'} component={ViewerScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
