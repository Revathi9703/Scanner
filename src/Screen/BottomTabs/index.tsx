import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Home from 'react-native-vector-icons/AntDesign';
import Category from 'react-native-vector-icons/MaterialIcons';
import Cart from 'react-native-vector-icons/AntDesign';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import Search from 'react-native-vector-icons/Octicons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator  screenOptions={{
      tabBarStyle: { backgroundColor: '#05A845',borderRadius:20,height:55 },
    }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen}
       listeners={{
        tabPress:(e) =>{
          console.log("PRessed")
        },
       }}
      options={{
        tabBarLabel:({})=>{
          return null
        },
        tabBarIcon:({})=>{
          return(
           <Home name='home' size={25} color={'white'}/> 
          )
        },      
        headerShown:false}}/>
      <Tab.Screen name="Settings" component={HomeScreen} 
           listeners={{
            tabPress:(e) =>{
              console.log("PRessed")
            },
           }}
          options={{
            tabBarLabel:({})=>{
              return null
            },
            tabBarIcon:({})=>{
              return(
               <Category name='category' size={25} color={'white'}/> 
              )
            },
      headerShown:false}}/>
      <Tab.Screen name="cart" component={HomeScreen} 

      listeners={{
        tabPress:(e) =>{
          console.log("PRessed")
        },
       }}
      options={{

        tabBarLabel:({})=>{
          return null
        },
        tabBarIcon:({})=>{
          return(
            <View style={{
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: 'white',
              borderRadius: 30,
              height:50,
              alignSelf:'center',
              width:50}}>
           <Cart name='shoppingcart' size={25} color={'#05A845'}     /> 
           </View>
          )
        },headerShown:false}}/>
      <Tab.Screen name="like" component={HomeScreen}
           listeners={{
            tabPress:(e) =>{
              console.log("PRessed")
            },
           }}
          options={{
            tabBarLabel:({})=>{
              return null
            },
            tabBarIcon:({})=>{
              return(
               <LikeIcon name='hearto' size={25} color={'white'}/> 
              )
            },
      headerShown:false}}/>
      <Tab.Screen name="shop" component={HomeScreen}  
          listeners={{            
        tabPress:(e) =>{
          console.log("PRessed")
        },
       }}
      options={{
        tabBarLabel:({})=>{
          return null
        },
        tabBarIcon:({})=>{
          return(
            <Search name="search" size={25} color={'white'}/> 
          )
        }, headerShown:false}}/>
    </Tab.Navigator>
  );
}
export default MyTabs