import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";

const QRScanner = ({ onRead }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false); // New state to track if QR has been scanned
  const device = useCameraDevice("back");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (!scanned) {
        console.log("Scanned QR code value:", codes[0].value);
        setScanned(true); // Prevent further scans
        onRead(codes[0].value); // Perform the action with the scanned code
      }
    },
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "granted");
    };

    requestCameraPermission();
  }, []);

  const handleClose = () => {
    setScanned(false); // Reset scanned state if closed
    onRead(null); // Optionally perform any additional actions on close
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.page}>
        <Text style={styles.permissionText}>
          Camera not available or not permitted
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    backgroundColor: "white",
    padding: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#00000090",
    alignItems: "center",
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  closeText: {
    color: "white",
    fontSize: 14,
  },
});

export default QRScanner;
