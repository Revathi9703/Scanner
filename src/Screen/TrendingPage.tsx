import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import LeftArrow from 'react-native-vector-icons/AntDesign';
import styles from "../theme/UniveresalStyle";
import Notification from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Octicons';
import Category from 'react-native-vector-icons/MaterialIcons';
import trendData from '../json/trending.json';
import Cart from 'react-native-vector-icons/AntDesign';
import Start from 'react-native-vector-icons/AntDesign';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import fonts from "../theme/fonts";
import Heart from 'react-native-vector-icons/AntDesign';
import { useCart } from './CartContext'; // Adjust the import path as needed

const Trending = ({ navigation }) => {
  const [trending, setTrending] = useState([]);
  const [searchText,setSearch] = useState('');
  const { addToCart } = useCart(); // Use the context

  useEffect(() => {
    setTimeout(() => {
      setTrending(trendData?.trendingItems);
    }, 1000);
  }, []);

  const filteredData = searchText
  ? trending.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
  : trending;

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
        <LeftArrow name="arrowleft" size={20} color={"#05A845"} onPress={()=>{navigation.goBack();}}/>
        <Text style={styles.boldText}>Trending Deals</Text>
        <Notification name="bell-badge-outline" color={'#05A845'} size={26} />
      </View>

      <View style={[styles.rowCenter, { marginHorizontal: 15, marginVertical: 8, columnGap: 10 }]}>
        <View style={{ width: '90%', height: 36, borderRadius: 8, borderWidth: 1, borderColor: "#05A845", flexDirection: 'row' }}>
          <TextInput style={{ fontFamily: fonts.type.montserratBold, paddingLeft: 10, fontSize: fonts.size.font13, color:"black", width: '85%' }} 
          value={searchText} onChangeText={(text)=>{setSearch(text)}}
          placeholder="Search Products" placeholderTextColor={'grey'} />
          <View style={[styles.greenSearch, { height: 36 }]}>
            <Search name="search" size={20} color={'white'} />
          </View>
        </View>
        <Category name="category" size={25} color={"#05A845"} style={{ width: '20%' }} />
      </View>

      {trending.length == 0 && 
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    }

      <FlatList
        style={{ marginBottom: 20 }}
        numColumns={2}
        data={filteredData}
        renderItem={({ item }) => (
          <View style={{ width: '45%', backgroundColor: 'white', elevation: 1, padding: 10, borderRadius: 10, marginHorizontal: 10, marginVertical: 15 }}>
            <View style={styles.cartGreen}>
              <Image source={{ uri: item.image }} style={{ height: 120, width: '70%', borderRadius: 15, resizeMode: 'cover' }} />
              {item.like == "true"  ? 
    <Heart  name="heart" size={20} color={"#05A845"} style={{ position: 'absolute',
    top: 5,
    right: 6,}}/> :
    <LikeIcon name="hearto" size={20} color={"#05A845"} style={{ position: 'absolute',
      top: 5,
      right: 6,}}/>  }
            </View>

            <View style={styles.rowSpaceCenter}>
              <Text style={styles.lightText}>{item.name}</Text>
              <Text style={styles.greenText}>Rs. {item.price}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.lightText}>{item.unit}</Text>
                  <Start name="star" size={10} color={'yellow'} style={{ marginLeft: 5 }} />
                  <Text style={styles.lightText}>{item.star}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={styles.lightText}>Quantity</Text>
                  <Image source={require("../assets/Icons/arrows.png")} style={{ marginHorizontal: 5 }} />
                  <Text style={styles.lightText}>1</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  addToCart(item);
                  navigation.navigate("MyCart");
                }}
                style={{ height: 30, backgroundColor: "#05A845", borderRadius: 14, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, marginTop: 5 }}>
                <Cart name="shoppingcart" size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};

export default Trending;
