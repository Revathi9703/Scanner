import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { insertProductToDb } from "../database/db";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import AppBar from "../components/Appbar";

const ScannerData = () => {
  const navigation = useNavigation(); // Initialize navigation
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [mrp, setMRP] = useState('');

  const handleInsertProduct = async () => {
    try {
      // Insert product to database
      await insertProductToDb(name, parseFloat(mrp), parseFloat(amount));
      // Show success alert and navigate back to the previous screen
      Alert.alert("Product inserted successfully", "", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MainTabs"), // Navigate back when user presses "OK"
        },
      ]);
    } catch (error) {
      Alert.alert("Error inserting product", error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <ImageBackground
        source={require("../assets/backgroundtop.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Product Details</Text>

        <TextInput
          style={styles.inputText}
          value={name}
          onChangeText={setName}
          placeholder="Enter Product Name"
          placeholderTextColor="#8d8d8d"
        />

        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          value={mrp}
          onChangeText={setMRP}
          placeholder="Enter MRP"
          placeholderTextColor="#8d8d8d"
        />

        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter Quantity"
          placeholderTextColor="#8d8d8d"
        />

        <TouchableOpacity style={styles.button} onPress={handleInsertProduct}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScannerData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    transform: [{ rotate: "180deg" }],
    opacity: 0.1,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  inputText: {
    width: "100%",
    fontSize: 16,
    color: "#333",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
