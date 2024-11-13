import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, removeProduct, updateProductQuantity } from '../redux/productSlice';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteProductFromDb, fetchProductsFromDb } from '../database/db';
import AppBar from '../components/Appbar';

const ListScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.items);
  const [loading, setLoading] = useState(false);

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
          dispatch(removeProduct(id));
          deleteProductFromDb(id)
            .then(() => fetchProductsFromDb().then(fetchedProducts => dispatch(setProducts(fetchedProducts))))
            .catch(error => console.log('Error deleting product from database:', error));
        },
      },
    ]);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (id) => {
    const product = products.find(item => item.id === id);
    if (product) {
      dispatch(updateProductQuantity({ id, quantity: product.quantity + 1 })); // Updated to use quantity
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (id) => {
    const product = products.find(item => item.id === id);
    if (product && product.quantity > 1) { // prevent going below 1
      dispatch(updateProductQuantity({ id, quantity: product.quantity - 1 })); // Updated to use quantity
    }
  };

  // Calculate total amount
  const totalAmount = products.reduce((sum, item) => sum + item.mrp * item.quantity, 0); // Updated to use quantity

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <AppBar title={"List Screen"} />
      {products.length === 0 ? (
        <Text style={styles.noDataText}>No data found</Text>
      ) : (
        <FlatList
          style={{ marginHorizontal: 10, marginVertical: 10 }}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetail}>MRP: ₹ {item.mrp.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>
                    <Ionicons name="remove-circle-outline" size={20} color="red" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text> 
                  <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>
                    <Ionicons name="add-circle-outline" size={20} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {/* Total Amount Section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹ {totalAmount.toFixed(2)}</Text>
      </View>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    color:"black"
  },
  quantityButton: {
    paddingHorizontal: 5,
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
  totalContainer: {
    padding: 15,
    backgroundColor: '#ffb6c1',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ListScreen;
