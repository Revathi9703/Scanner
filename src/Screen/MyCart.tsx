import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import styles from "../theme/UniveresalStyle";
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import AddIcon from 'react-native-vector-icons/Octicons';
import SubIcon from 'react-native-vector-icons/AntDesign';
import { useCart } from './CartContext'; 

const MyCart = ({ navigation }:any) => {
  const [showCart,setShowCart] = useState(false);

  const { cart, removeFromCart, clearCart } = useCart(); // Use the context

  const [quantities, setQuantities] = useState(cart.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {}));

  const handleQuantityChange = (id, change) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(1, (prevQuantities[id] || 1) + change);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((total, item) => total + parseFloat(item.price) * (quantities[item.id] || 1), 0);
    const shippingCost = 50; // Fixed shipping cost for example
    const tax = subtotal * 0.1; // 10% tax for example
    const total = subtotal + shippingCost +tax;
    return { subtotal, shippingCost, tax,total };
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear all items from the cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            clearCart();
            navigation.navigate("Trending"); // Navigate to another screen or handle empty cart state
          }
        }
      ]
    );
  };

  const { subtotal, shippingCost, tax,total } = calculateTotals();

  return (
    <View style={{ flex: 1, backgroundColor: 'white',paddingHorizontal:15,paddingVertical:15 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
        <LeftArrow name="arrowleft" size={20} color={"#05A845"} onPress={()=>{navigation.goBack();}}/>
        <Text style={styles.boldText}>Trending Deals</Text>
        <Delete name="delete" color={'#05A845'} size={26} onPress={handleClearCart}/>
      </View>

      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.boldText}>Your cart is empty</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Trending")} style={[styles.container, { backgroundColor: "#05A845", marginTop: 20 }]}>
            <Text style={{ color: 'white' }}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', columnGap:12,marginVertical:15 }}>
                <Image source={{ uri: item.image }} style={{ height: 80, width: 80, borderRadius: 10 }} />
                <View>
                  <Text style={[styles.boldText,{alignSelf:'flex-start'}]}>{item.name}</Text>
                  <Text style={styles.boldText}>View Product Details</Text>
                  <View style={[styles.rowCenter,{columnGap:10}]}>
                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                      <AddIcon name="diff-added" size={15} color={"#05A845"} />
                    </TouchableOpacity>
                    {showCart ?
                      <Text style={styles.boldText}>X</Text> :
                    <Text style={styles.boldText}>{quantities[item.id]}</Text> 
                    }
                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                      <SubIcon name="minussquareo" size={15} color={"#05A845"} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.boldText,{color:'green'}]}>Rs. {item.price * (quantities[item.id] || 1)}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ marginLeft: 10 }}>
                  <Text style={styles.redText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item?.id}
          />
         {showCart == false  ?    
         <>
          <TouchableOpacity onPress={() => navigation.navigate("Trending")} style={[styles.container, { backgroundColor: "#05A845" }]}>
            <Text style={{ color: 'white' }}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowCart(!showCart)} style={styles.container}>
            <Text style={{ color: 'black' }}>Checkout</Text>
          </TouchableOpacity> 
          </>
          :null}

          {showCart ?
          <View style={{                  borderColor:'#05A845',
            borderWidth:1,
            borderRadius:15,
            marginHorizontal:10,
            paddingTop:20,
           }}>
          <View style={{
            flexDirection:'row',
            paddingHorizontal:15,
          }}>
            <View style={{ width: '45%',rowGap:10 }}>
              <Text style={{ color: 'black' }}>Sub Total</Text>
              <Text style={{ color: 'black' }}>Shipping Cost</Text>
              <Text style={{ color: 'black' }}>Estimating Tax</Text>
              <Text style={{ color: 'black' }}>Total</Text>
            </View>
            <View style={{ width: '10%',rowGap:10,alignItems:'center' }}>
            <Text style={{ color: 'black' }}>:</Text>
            <Text style={{ color: 'black' }}>:</Text>
              <Text style={{ color: 'black' }}>:</Text>
              <Text style={{ color: 'black' }}>:</Text>
              </View>
            <View style={{ width: '45%',rowGap:10,alignItems:'flex-end'}}>
              <Text style={{ color: 'black' }}>Rs. {subtotal.toFixed(2)}</Text>
              <Text style={{ color: 'black' }}>Rs. {shippingCost.toFixed(2)}</Text>            
              <Text style={{ color: 'black' }}>Rs. {tax.toFixed(2)}</Text>
              <Text style={{ color: 'black' }}>Rs. {total}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("SuccessPage")} style={{
                borderColor:'#05A845',
                paddingVertical:13,
                alignItems:'center',
                borderWidth:1,
                borderRadius:15,
                justifyContent:'center',
                marginTop:12,
             backgroundColor: "#05A845" }}>
              <Text style={{ color: 'white' }}>Proceed</Text>
            </TouchableOpacity>
          </View>
          :null}
        </>
      )}
    </View>
  );
};

export default MyCart;
