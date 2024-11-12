import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';


const SplashScreen = ({  }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true, 
    }).start();

   
    setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/splashscreen.png")}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
