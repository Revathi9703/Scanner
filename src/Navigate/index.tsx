// import { NavigationContainer } from "@react-navigation/native"
//  import React from "react"; 
//  import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
//  import LoginScreen from "../Screen/Login";
// import MyTabs from "../Screen/BottomTabs";
// import Trending from "../Screen/TrendingPage";
// import MyCart from "../Screen/MyCart";
// import { CartProvider } from "../Screen/CartContext";
// import SuccessPage from "../Screen/SuccessPage";
  
//   const Stack = createNativeStackNavigator();
//    const Navigation = () => { 
//     return( 
//    <CartProvider>
//     <NavigationContainer> 
//     <Stack.Navigator> 
//         <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/> 
//     <Stack.Screen name="HomeScreen" component={MyTabs} options={{headerShown:false}}/> 
//     <Stack.Screen name="Trending" component={Trending} options={{headerShown:false}}/> 
//     <Stack.Screen name="MyCart" component={MyCart} options={{headerShown:false}}/> 
//     <Stack.Screen name="SuccessPage" component={SuccessPage} options={{headerShown:false}}/> 
// </Stack.Navigator> 
// </NavigationContainer> 
// </CartProvider>
// ) } 

// export default Navigation


// // src/App.tsx

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider } from 'react-redux';
// import { store } from './src/redux/store';
// import ScannerScreen from './src/screens/ScannerScreen';
// import ListScreen from './src/screens/ListScreen';
// import { createTable } from './src/database/db';

// const Stack = createStackNavigator();

// const App = () => {
//   useEffect(() => {
//     createTable();
//   }, []);

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Scanner" component={ScannerScreen} />
//           <Stack.Screen name="List" component={ListScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;


// src/App.tsx

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ScannerScreen from '../screens/InitialScreen';
import ListScreen from '../screens/ListScreen';
import { createTable } from '../database/db';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="List" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;

