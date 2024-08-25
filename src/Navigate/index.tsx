import { NavigationContainer } from "@react-navigation/native"
 import React from "react"; 
 import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
 import LoginScreen from "../Screen/Login";
import MyTabs from "../Screen/BottomTabs";
import Trending from "../Screen/TrendingPage";
import MyCart from "../Screen/MyCart";
import { CartProvider } from "../Screen/CartContext";
import SuccessPage from "../Screen/SuccessPage";
  
  const Stack = createNativeStackNavigator();
   const Navigation = () => { 
    return( 
   <CartProvider>
    <NavigationContainer> 
    <Stack.Navigator> 
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/> 
    <Stack.Screen name="HomeScreen" component={MyTabs} options={{headerShown:false}}/> 
    <Stack.Screen name="Trending" component={Trending} options={{headerShown:false}}/> 
    <Stack.Screen name="MyCart" component={MyCart} options={{headerShown:false}}/> 
    <Stack.Screen name="SuccessPage" component={SuccessPage} options={{headerShown:false}}/> 
</Stack.Navigator> 
</NavigationContainer> 
</CartProvider>
) } 

export default Navigation