import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Navigation from "../../Navigate"
import Notification from 'react-native-vector-icons/MaterialCommunityIcons';
import Location from 'react-native-vector-icons/EvilIcons'
import React, { useEffect, useState } from "react";
import styles from "../../theme/UniveresalStyle";
import Search from 'react-native-vector-icons/Octicons';
import Carousel from "../../Components/CarouselSlider";
import RightArrow from 'react-native-vector-icons/AntDesign';
import Start from 'react-native-vector-icons/AntDesign';
import jsonData from '../../json/category.json'; 
import trendData from '../../json/trending.json';
import Cart from 'react-native-vector-icons/AntDesign';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import { useCart } from "../CartContext";
import Heart from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation}:any) => {

  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searchText,setSearch] = useState('');
  const [like,setLike] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      return setCategories(jsonData?.categories);
    }, 1000);
    setTimeout(() => {
      return setTrending(trendData?.trendingItems);
    }, 1000);
  }, []);

  const filteredData = searchText
  ? trending.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
  : trending;

  const filterCategory = searchText
  ? categories.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
  : categories;

  const { addToCart } = useCart();

 
  
 
  const data = [
    { id: '1', image: 'https://cdn.pixabay.com/photo/2020/05/18/15/54/onion-5187140_1280.jpg', text: 'Onions' },
    { id: '2', image: 'https://cdn.pixabay.com/photo/2017/05/13/17/18/spinach-2310134_1280.jpg', text: 'Spinach' },
    { id: '3', image: 'https://cdn.pixabay.com/photo/2018/10/01/19/46/oats-3717095_1280.jpg', text: 'Grains' },
  ];


    return(
      <ScrollView style={{flex:1,backgroundColor:'white',paddingHorizontal:15,paddingVertical:20,}}>
         <Text style={styles.headerText}>Hi, User</Text> 
         <View style={styles.rowSpaceCenter}>
         <View style={styles.rowCenter}>
         <Location name="location" color={"#FBBC05"} size={23}/>
         <Text style={styles.lightText}>Cuddalore</Text> 
         </View>
         <View style={[styles.rowCenter,{columnGap:20}]}>
          <Notification name="bell-badge-outline" color={'#05A845'} size={26}/>    
          <Image source={require("../../assets/images/Mask_group.png")}></Image>   
          </View>
          </View>  


        <View style={[styles.SearchContainer,{width:'100%'}]}>
         <TextInput style={styles.searchText}
          placeholder="Search Products" placeholderTextColor={'grey'} 
         value={searchText}
         onChangeText={(text:string)=>{setSearch(text)}}></TextInput>
         <View style={styles.greenSearch}>
         <Search name="search" size={24} color={'white'}/>
         </View>
         </View>



    <SafeAreaView>
      <Carousel data={data} navigation={()=>{navigation.navigate("Trending")}}/>
    </SafeAreaView>

    <TouchableOpacity style={styles.rowSpaceCenter} onPress={()=>{navigation.navigate("Trending")}}>
     <Text style={styles.boldText}>Explore my Category</Text> 
      <RightArrow name="arrowright" size={20} color={"#05A845"}/>
    </TouchableOpacity>

    {categories.length == 0 && 
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    }

    <FlatList
    horizontal
      data={filterCategory}
      renderItem={({item,index})=>{
        return(
          <TouchableOpacity style={styles.category} onPress={()=>{navigation.navigate("Trending")}}  >
          <Image source={{ uri: item?.image }} style={styles.image} />
          <Text style={styles.categoryName}>{item?.name}</Text>
        </TouchableOpacity >
        )
      }}
      ListEmptyComponent={
        <Text style={[styles.boldText,{padding:15,paddingLeft:100}]}>No Data Found</Text>
      }
      keyExtractor={item => item?.id}
    />


    <TouchableOpacity style={styles.rowSpaceCenter} onPress={()=>{navigation.navigate("Trending")}}>
     <Text style={styles.boldText}>Trending Items</Text> 
      <RightArrow name="arrowright" size={20} color={"#05A845"}/>
    </TouchableOpacity>

   {trending.length == 0 && 
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    }

    <FlatList
    style={{marginVertical:20}}
    numColumns={2}
      data={filteredData}
      renderItem={({item,index})=>{
        return(
         <View style={{width:'45%',backgroundColor:'white',elevation:1,padding:10,borderRadius:10, marginHorizontal:10,marginVertical:15}}>
           
         <View style={styles.cartGreen}>
         <Image source={{uri:item.image}} style={{height: 120,
    width: '70%',borderRadius:15,
    resizeMode: 'cover',}}></Image>

     {item.like == "true"  ? 
    <Heart  name="heart" size={20} color={"#05A845"} style={{ position: 'absolute',
    top: 5,
    right: 6,}}/> :
    <LikeIcon name="hearto" size={20} color={"#05A845"} onPress={()=>setLike(!like)} style={{ position: 'absolute',
      top: 5,
      right: 6,}}/>  }

        </View>

         <View style={styles.rowSpaceCenter}>
          <Text style={styles.lightText}>{item.name}</Text>
          <Text style={styles.greenText}>Rs. {item.price}</Text>
         </View>      
         <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.lightText}>{item.unit}</Text>
            <Start name="star" size={10} color={'yellow'} style={{marginLeft: 5}}/>
            <Text style={styles.lightText}>{item.star}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={styles.lightText}>Quantity</Text>
            <Image source={require("../../assets/Icons/arrows.png")} style={{marginHorizontal: 5}}/>
            <Text style={styles.lightText}>1</Text>
          </View>
        </View>
        
        <TouchableOpacity  onPress={() => {
                  addToCart(item);
                  navigation.navigate("MyCart");
                }} style={{height: 30, backgroundColor: "#05A845", borderRadius: 14, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, marginTop: 5}}>
          <Cart name="shoppingcart" size={20} color={'white'}/>
        </TouchableOpacity>
         </View>      
         </View>
        )
      }}
      ListEmptyComponent={
        <Text style={styles.boldText}>No Data Found</Text>
      }
      keyExtractor={item => item?.id}
    />
      </ScrollView>
    )
}
export default HomeScreen
