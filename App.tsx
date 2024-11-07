import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ScannerScreen from './src/screens/InitialScreen';
import ListScreen from './src/screens/ListScreen';
import { createTable } from './src/database/db';
import SplashScreen from './src/screens/SplashScreen';
import ScanQRPage from './src/screens/InitialScreen';
import Scanner from './src/screens/Scanner';
import ScannerData from './src/screens/Scanner';

const Stack = createNativeStackNavigator();
const App = () => {

    // useEffect(() => {
    //   createTable();
    // }, []);
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator >
          <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Initial" component={ScanQRPage} options={{headerShown:false}}/>       
           <Stack.Screen name="Scanner" component={ScannerData} options={{headerShown:false}} />           
            <Stack.Screen name="List" component={ListScreen} options={{headerShown:false}}/>           
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
}
export default App