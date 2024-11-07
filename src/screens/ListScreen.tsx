import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, removeProduct, deleteProduct } from '../redux/productSlice';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteProductFromDb, fetchProductsFromDb } from '../database/db'; // Custom fetch function
import { useNavigation } from '@react-navigation/native'; // Import navigation if needed
import AppBar from '../components/Appbar';

const ListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use navigation hook
  const products = useSelector(state => state.product.items);
  const [loading, setLoading] = useState(false); // Loading state to handle fetching

  // Fetch products from DB when the component mounts
  useEffect(() => {
    setLoading(true);
    fetchProductsFromDb()
      .then(fetchedProducts => {
        dispatch(setProducts(fetchedProducts));
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching products:', error);
        setLoading(false);
      });
  }, [dispatch]);

  // Handle product deletion
  const handleDelete = (id) => {
    Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          // Remove product from Redux state
          dispatch(removeProduct(id));
          deleteProduct(id)
          
          // Optionally, re-fetch the products if necessary
          fetchProductsFromDb()
            .then(fetchedProducts => {
              dispatch(setProducts(fetchedProducts)); // Re-fetch products after deletion
            })
            .catch(error => console.log('Error fetching products after deletion:', error));
        },
      },
    ]);
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <AppBar title={"List Screen"}/>
      {products.length === 0 ? (
        <Text style={styles.noDataText}>No data found</Text>
      ) : (
        <FlatList
        style={{marginHorizontal:10,marginVertical:10}}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item,index}) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetail}>MRP: ${item.mrp.toFixed(2)}</Text>
                <Text style={styles.productDetail}>Quantity: {item.amount}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)} // Handle delete
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    paddingRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
});

export default ListScreen;
