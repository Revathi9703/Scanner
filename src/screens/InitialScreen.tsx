import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import QRScanner from "../components/QrScanner";
import { setQrCode } from '../redux/qrSlice';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createTable } from "../database/db";
import AppBar from "../components/Appbar";

const dWidth = Dimensions.get("window").width;
const clr1 = "mediumseagreen";

const ScanQRPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const qrCode = useSelector((state) => state.qr.qrCode); // Retrieve QR code from Redux state
  const [showQR, setShowQR] = useState(false);

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = (qrtext) => {
    dispatch(setQrCode(qrtext));  // Save scanned QR data to Redux
    setShowQR(false);
    navigation.navigate("Scanner")
  };

  useEffect(()=>{
    createTable()
  },[]);

  return (
    <View style={styles.page}>
      {qrCode ? (
        <Text style={{ fontSize: 16, color: "black" }}>
          {"QR Value \n" + qrCode}
        </Text>
      ) : null}
      <Ionicons
        name={"scan-circle-outline"}
        size={qrCode ? dWidth * 0.4 : dWidth * 0.75}
        color={clr1}
      />
      <TouchableOpacity onPress={openQRscanner} style={styles.btn}>
        <Text style={{ color: clr1 }}>Scan QR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("List")} style={styles.btn}>
        <Text style={{ color: clr1 }}>View List</Text>
      </TouchableOpacity>

      {/* Modal for QR Scanner */}
      <Modal
        visible={showQR}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowQR(false)}
      >
        <QRScanner onRead={onQrRead} />
      </Modal>
    </View>
  );
};

export default ScanQRPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  btn: {
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: "3%",
    width: "50%",
    borderWidth: 2,
    borderColor: clr1,
  },
  btnText: {
    color: clr1,
  },
});