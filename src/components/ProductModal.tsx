// src/components/ProductModal.tsx

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import { insertProduct } from '../database/db';

interface ProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ isVisible, onClose, productName }) => {
  const [mrp, setMrp] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const product = { id: Date.now(), name: productName, mrp: parseFloat(mrp), amount: parseFloat(amount) };
    dispatch(addProduct(product));
    await insertProduct(product.name, product.mrp, product.amount);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalView}>
        <Text>Product: {productName}</Text>
        <TextInput placeholder="MRP" keyboardType="numeric" value={mrp} onChangeText={setMrp} />
        <TextInput placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
});

export default ProductModal;
