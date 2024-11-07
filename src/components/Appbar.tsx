import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb6c1', // Change background color to light grey (or any color you want)
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 4, // Shadow for AppBar
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: 'black', // Set title color to black for better contrast against the light background
    fontSize: 18,
    fontWeight: '600',
  },
});
