// App.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import SplashScreen from './src/screens/SplashScreen';
import ScanQRPage from './src/screens/InitialScreen';
import ListScreen from './src/screens/ListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScannerData from './src/screens/Scanner';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Camera') {
          iconName = focused ? 'camera' : 'camera-outline';
        } else if (route.name === 'List') {
          iconName = focused ? 'list' : 'list-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'mediumseagreen',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen
      name="Camera"
      component={ScanQRPage}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="List"
      component={ListScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const App = () => {
  useEffect(() => {
    // createTable();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Scanner"
            component={ScannerData}
            options={{ headerShown: false }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
